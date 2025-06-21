import React from "react";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { TRootStackParamList } from "../../routes/AppStack";
import {
  getOrganizationDetails,
  IOrganizationDetails,
} from "../../services/organization/list-plannings";
import * as S from "./styles";
import { formatDate } from "../../shared/utils/formatDate";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutesProp } from "../../shared/types/navigation/navigate";
import { Button } from "@rneui/themed";
import { AddOrganizationMembers } from "../../shared/components/Dialog/AddOrganizationMembers";

export const OrganizationDetailsScreen = () => {
  const navigate = useNavigation<NavigationRoutesProp>();
  const route =
    useRoute<RouteProp<TRootStackParamList, "OrganizationDetails">>();
  const organizationId = route.params.organizationId;

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDialog = () => setIsOpen((prev) => !prev);

  const { data: organization, isLoading } = useQuery<IOrganizationDetails>({
    queryKey: ["organization-details", organizationId],
    queryFn: () => getOrganizationDetails(organizationId),
  });

  const members = organization?.organizationUsers ?? [];
  const plannings = organization?.plan ?? [];
  const owner = organization?.owner;

  const renderMember = ({ item }: any) => (
    <S.MemberItem>
      <S.MemberName>{item.user.username}</S.MemberName>
    </S.MemberItem>
  );

  const renderPlanning = ({ item }: any) => (
    <TouchableOpacity
      onPress={() =>
        navigate.navigate("CityDetails", { externalId: item.externalId })
      }
    >
      <S.PlanningItem>
        <S.PlanningDestination>{item.destination}</S.PlanningDestination>
        <S.PlanningPeriod>
          {formatDate(item.startDate)} - {formatDate(item.endDate)}
        </S.PlanningPeriod>
      </S.PlanningItem>
    </TouchableOpacity>
  );

  return (
    <S.Container>
      <S.SectionTitle>Dono</S.SectionTitle>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <S.OwnerName>{owner?.username}</S.OwnerName>
      )}

      <S.SectionTitle>Membros</S.SectionTitle>
      <Button onPress={toggleDialog}>Adicionar Membro</Button>

      {isLoading ? (
        <ActivityIndicator />
      ) : members.length === 0 ? (
        <S.EmptyMessage>Nenhum membro encontrado</S.EmptyMessage>
      ) : (
        <FlatList
          data={members}
          keyExtractor={(item) => String(item.user.externalId)}
          renderItem={renderMember}
        />
      )}

      <S.SectionTitle>Planejamentos</S.SectionTitle>
      {isLoading ? (
        <ActivityIndicator />
      ) : plannings.length === 0 ? (
        <S.EmptyMessage>Sem planejamentos</S.EmptyMessage>
      ) : (
        <FlatList
          data={plannings}
          keyExtractor={(item) => item.externalId}
          renderItem={renderPlanning}
        />
      )}

      <AddOrganizationMembers
        isOpen={isOpen}
        toggleDialog={toggleDialog}
        organizationExternalId={organization?.externalId ?? ""}
        alreadyMembers={members.map((member) => ({
          externalId: member.user.externalId,
          username: member.user.username,
        }))}
      />
    </S.Container>
  );
};

export default OrganizationDetailsScreen;
