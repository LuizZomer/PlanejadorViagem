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
} from "./styles";
import { sendFriendRequest } from "../../services/friendship/send-friend-request";
import { findAll } from "../../services/user/find-all";
import { listFriendshipRequest } from "../../services/friendship/list-friendship-request";

interface IUserList {
  externalId: string;
  username: string;
}

interface IFriendRequest {
  createdAt: string;
  externalId: string;
  requester: {
    externalId: string;
    username: string;
  };
  status: "pending" | "accepted" | "rejected";
}

const FriendsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  // Buscar usuários
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users", searchQuery],
    queryFn: async () => findAll(),
  });

  // Buscar pedidos de amizade pendentes
  const { data: friendRequests, isLoading: isLoadingRequests } = useQuery({
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
  const acceptFriendRequest = useMutation({
    mutationFn: async (requestId: string) => {
      await axios.post(`/api/friends/accept/${requestId}`);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });

  // Recusar pedido de amizade
  const rejectFriendRequest = useMutation({
    mutationFn: async (requestId: string) => {
      await axios.post(`/api/friends/reject/${requestId}`);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });

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
        <UserName>{item.requester.username}</UserName>
      </UserInfo>
      <RequestButtons>
        <ActionButton
          as={AcceptButton}
          onPress={() => acceptFriendRequest.mutate(item.externalId)}
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

    return (
      <UsersList
        data={users}
        renderItem={UserListItem}
        keyExtractor={(item: IUserList) => item.externalId}
      />
    );
  };

  return (
    <Container>
      <SearchInput
        placeholder="Buscar usuários..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <SectionTitle>Pedidos de Amizade</SectionTitle>
      <FriendRequestsList />

      <SectionTitle>Resultados da Busca</SectionTitle>
      <UsersSearchList />
    </Container>
  );
};

export default FriendsScreen;
