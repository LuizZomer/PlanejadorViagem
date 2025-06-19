import React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { TRootStackParamList } from "../../routes/AppStack";
import { listOrganizationMembers } from "../../services/organization/list-members";
import { listOrganizationPlannings } from "../../services/organization/list-plannings";
import * as S from "./styles";
import { formatDate } from "../../shared/utils/formatDate";

export const OrganizationDetailsScreen = () => {
  const route = useRoute<RouteProp<TRootStackParamList, "OrganizationDetails">>();
  const organizationId = route.params.organizationId;

  const { data: members = [], isLoading: loadingMembers } = useQuery({
    queryKey: ["org-members", organizationId],
    queryFn: () => listOrganizationMembers(organizationId),
  });

  const { data: plannings = [], isLoading: loadingPlans } = useQuery({
    queryKey: ["org-plannings", organizationId],
    queryFn: () => listOrganizationPlannings(organizationId),
  });

  const renderMember = ({ item }: any) => (
    <S.MemberItem>
      <S.MemberName>{item.username}</S.MemberName>
    </S.MemberItem>
  );

  const renderPlanning = ({ item }: any) => (
    <S.PlanningItem>
      <S.PlanningDestination>{item.destination}</S.PlanningDestination>
      <S.PlanningPeriod>
        {formatDate(item.startDate)} - {formatDate(item.endDate)}
      </S.PlanningPeriod>
    </S.PlanningItem>
  );

  return (
    <S.Container>
      <S.SectionTitle>Membros</S.SectionTitle>
      {loadingMembers ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={members}
          keyExtractor={(item) => item.externalId}
          renderItem={renderMember}
        />
      )}

      <S.SectionTitle>Planejamentos</S.SectionTitle>
      {loadingPlans ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={plannings}
          keyExtractor={(item) => item.externalId}
          renderItem={renderPlanning}
        />
      )}
    </S.Container>
  );
};

export default OrganizationDetailsScreen;
