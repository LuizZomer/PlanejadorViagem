import React from "react";
import { ActivityIndicator, FlatList, TouchableOpacity, Text, View } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteOrganization } from "../../services/organization/delete-organization";

import {
  listOrganizations,
  IOrganization,
} from "../../services/organization/list-organizations";
import {
  Container,
  CreateButton,
  ButtonText,
  OrgItem,
  OrgName,
  SectionTitle,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutesProp } from "../../shared/types/navigation/navigate";

const OrganizationScreen = () => {
  const navigate = useNavigation<NavigationRoutesProp>();

  const {
    data: organizations = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["organizations"],
    queryFn: listOrganizations,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: deleteOrgMut } = useMutation({
    mutationFn: (id: string) => deleteOrganization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });

  const OrgListItem = ({ item }: { item: IOrganization }) => (
    <OrgItem
      accessibilityRole="button"
      accessibilityLabel={`Organização ${item.name}`}
      style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
    >
      <View>
        <OrgName>{item.name}</OrgName>
        <OrgName>{new Date(item.createdAt).toLocaleDateString()}</OrgName>
      </View>
      <TouchableOpacity
        onPress={() => deleteOrgMut(item.externalId)}
        accessibilityLabel={`Excluir organização ${item.name}`}
        accessibilityRole="button"
      >
        <Text style={{ fontSize: 18 }}>🗑️</Text>
      </TouchableOpacity>
    </OrgItem>
  );


  return (
    <Container>
      <CreateButton onPress={() => navigate.navigate("OrganizationCreate")}>
        <ButtonText>Nova Organização</ButtonText>
      </CreateButton>
      <SectionTitle>Minhas Organizações</SectionTitle>
      {isLoading || isFetching ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={organizations}
          keyExtractor={(item) => item.externalId}
          renderItem={OrgListItem}
        />
      )}
    </Container>
  );
};

export default OrganizationScreen;
