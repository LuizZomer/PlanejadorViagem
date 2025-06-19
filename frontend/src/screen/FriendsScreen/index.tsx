import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Container,
  SearchInput,
  SectionTitle,
  UserItem,
  UserInfo,
  UserName,
  UserEmail,
  AddButton,
  ActionButton,
  AcceptButton,
  RejectButton,
  ButtonText,
  PendingText,
  RequestButtons,
  RequestsList,
  UsersList,
  RequestItem,
  FriendsList as FriendsListStyled,
} from "./styles";
import { sendFriendRequest } from "../../services/friendship/send-friend-request";
import { listFriendshipRequest } from "../../services/friendship/list-friendship-request";
import { listAvaliableUser } from "../../services/user/find-all";
import { acceptFriendshipRequest } from "../../services/friendship/accept-friendship-request";
import { recuseFriendshipRequest } from "../../services/friendship/recuse-friendship-request";

interface IUserList {
  externalId: string;
  username: string;
}

export interface IFriendRequest {
  createdAt: string;
  externalId: string;
  friend: {
    externalId: string;
    username: string;
  };
  status: "pending" | "accepted" | "recused";
}

const FriendsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  // Buscar amigos
  const { data: friends = [], isLoading: isLoadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => listFriendshipRequest("accept"),
  });

  // Buscar usuários
  const { data: users = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users", searchQuery],
    queryFn: async () => listAvaliableUser(),
  });

  // Buscar pedidos de amizade pendentes
  const { data: friendRequests = [], isLoading: isLoadingRequests } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: async () => listFriendshipRequest("pending"),
  });

  // Enviar pedido de amizade
  const { mutateAsync: sendFriendRequestMutation } = useMutation({
    mutationKey: ["send-friendship-request"],
    mutationFn: async (userId: string) => sendFriendRequest(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // // Aceitar pedido de amizade
  const { mutateAsync: acceptFriendRequestMut } = useMutation({
    mutationFn: async (requestId: string) => acceptFriendshipRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  // Recusar pedido de amizade
  const rejectFriendRequest = useMutation({
    mutationFn: async (requestId: string) => recuseFriendshipRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });

  const FriendListItem = ({ item }: { item: IFriendRequest }) => (
    <UserItem>
      <UserInfo>
        <UserName>{item.friend.username}</UserName>
      </UserInfo>
    </UserItem>
  );

  const FriendsList = () => {
    if (isLoadingFriends) {
      return <ActivityIndicator />;
    }

    if (!friends?.length) {
      return <PendingText>Você ainda não tem amigos.</PendingText>;
    }

    return (
      <FriendsListStyled
        data={friends}
        renderItem={FriendListItem}
        keyExtractor={(item: IFriendRequest) => item.externalId}
      />
    );
  };

  const UserListItem = ({ item }: { item: IUserList }) => (
    <UserItem>
      <UserInfo>
        <UserName>{item.username}</UserName>
      </UserInfo>
      <AddButton onPress={() => sendFriendRequestMutation(item.externalId)}>
        <ButtonText>Adicionar</ButtonText>
      </AddButton>
    </UserItem>
  );

  const FriendRequestItem = ({ item }: { item: IFriendRequest }) => (
    <RequestItem>
      <UserInfo>
        <UserName>{item.friend.username}</UserName>
      </UserInfo>
      <RequestButtons>
        <ActionButton
          as={AcceptButton}
          onPress={() => acceptFriendRequestMut(item.externalId)}
        >
          <ButtonText>Aceitar</ButtonText>
        </ActionButton>
        <ActionButton
          as={RejectButton}
          onPress={() => rejectFriendRequest.mutate(item.externalId)}
        >
          <ButtonText>Recusar</ButtonText>
        </ActionButton>
      </RequestButtons>
    </RequestItem>
  );

  const FriendRequestsList = () => {
    if (isLoadingRequests) {
      return <ActivityIndicator />;
    }

    if (!friendRequests?.length) {
      return <PendingText>Nenhuma solicitação de amizade pendente</PendingText>;
    }

    return (
      <RequestsList
        data={friendRequests}
        renderItem={FriendRequestItem}
        keyExtractor={(item: IFriendRequest) => item.externalId}
      />
    );
  };

  const UsersSearchList = () => {
    if (isLoadingUsers) {
      return <ActivityIndicator />;
    }

    const filteredUsers = users.filter((u: IUserList) =>
      u.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!filteredUsers.length) {
      return <PendingText>Nenhum usuário encontrado.</PendingText>;
    }

    return (
      <UsersList
        data={filteredUsers}
        renderItem={UserListItem}
        keyExtractor={(item: IUserList) => item.externalId}
      />
    );
  };

  return (
    <Container>
      <SectionTitle>Pedidos de Amizade</SectionTitle>
      <FriendRequestsList />

      <SectionTitle>Amigos</SectionTitle>
      <FriendsList />

      <SearchInput
        placeholder="Buscar usuários..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <SectionTitle>Resultados da Busca</SectionTitle>
      <UsersSearchList />
    </Container>
  );
};

export default FriendsScreen;
