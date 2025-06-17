import React, { useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrganization } from "../../services/organization/create-organization";
import { listAvaliableUser } from "../../services/user/find-all";
import {
  Container,
  NameInput,
  CreateButton,
  ButtonText,
  SectionTitle,
  MemberItem,
  MemberName,
} from "../Organization/styles";
import { listFriendshipRequest } from "../../services/friendship/list-friendship-request";
import { IFriendRequest } from "../FriendsScreen";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutesProp } from "../../shared/types/navigation/navigate";

interface IUser {
  externalId: string;
  username: string;
}

const OrganizationCreateScreen = () => {
  const [name, setName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const navigate = useNavigation<NavigationRoutesProp>();

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const { data: users = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ["available-users"],
    queryFn: async () => listFriendshipRequest("accept"),
  });

  const { mutateAsync: createOrganizationMut, isPending } = useMutation({
    mutationKey: ["create-organization"],
    mutationFn: (data: { name: string; usersExternalId: string[] }) =>
      createOrganization({ name, usersExternalId: selectedMembers }),
    onSuccess: () => {
      setName("");
      setSelectedMembers([]);
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      navigate.navigate("Organizations");
    },
  });

  const UserItemSelect = ({ item }: { item: IFriendRequest }) => (
    <MemberItem
      selected={selectedMembers.includes(item.friend.externalId)}
      onPress={() => toggleMember(item.friend.externalId)}
      accessibilityRole="checkbox"
      accessibilityState={{
        checked: selectedMembers.includes(item.friend.externalId),
      }}
      accessibilityLabel={`Selecionar ${item.friend.username}`}
    >
      <MemberName>{item.friend.username}</MemberName>
    </MemberItem>
  );

  const handleCreate = () => {
    if (!name.trim()) return;
    const externalIds = selectedMembers.map((externalId) => externalId);

    console.log(externalIds);

    createOrganizationMut({ name, usersExternalId: externalIds });
  };

  return (
    <Container>
      <SectionTitle>Nova Organização</SectionTitle>
      <NameInput
        placeholder="Nome da organização"
        value={name}
        onChangeText={setName}
      />
      <SectionTitle>Membros</SectionTitle>

      {isLoadingUsers ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item: IFriendRequest) => item.externalId}
          renderItem={UserItemSelect}
          style={{ maxHeight: 220, marginBottom: 16 }}
        />
      )}
      <CreateButton
        onPress={handleCreate}
        disabled={isPending}
        accessibilityLabel="Criar organização"
      >
        <ButtonText>Criar</ButtonText>
      </CreateButton>
    </Container>
  );
};

export default OrganizationCreateScreen;
