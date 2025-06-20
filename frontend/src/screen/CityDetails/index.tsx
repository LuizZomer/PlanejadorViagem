import { useQuery } from "@tanstack/react-query";
import { ScrollView, View, Text } from "react-native";
import { planDetails } from "../../services/plan/plan-details";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TRootStackParamList } from "../../routes/AppStack";
import * as S from "./styles";
import { Marker } from "react-native-maps";
import { formatDate } from "../../shared/utils/formatDate";

export const CityDetails = () => {
  const route = useRoute<RouteProp<TRootStackParamList, "CityDetails">>();

  const { data: plan, isLoading } = useQuery({
    queryKey: ["city-details", route.params.externalId],
    queryFn: async () => planDetails(route.params.externalId),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <S.Loading>Carregando detalhes...</S.Loading>;
  }
  if (!plan) {
    return <S.Loading>Plano não encontrado.</S.Loading>;
  }

  return (
    <S.Container>
      <ScrollView>
        <S.Title>
          {plan.destination} - {plan.country}
        </S.Title>
        <S.Subtitle>
          Período: {formatDate(plan.startDate)} até {formatDate(plan.endDate)}
        </S.Subtitle>
        <S.Subtitle>Hospedagem: {plan.hosting}</S.Subtitle>
        <S.Subtitle>Nível de gasto: {plan.spendingLevel}</S.Subtitle>
        <S.DescriptionBox>
          <S.DescriptionText>{plan.description}</S.DescriptionText>
        </S.DescriptionBox>

        {plan.tripDay.map((day, idx) => (
          <S.DayCard key={day.externalId}>
            <S.DayTitle>
              Dia {idx + 1} - {formatDate(day.date)}
            </S.DayTitle>
            <S.DayInfo>
              Clima: {day.weather} | Temperatura média: {day.averageTemp}°C |
              Gasto: R$ {day.expense}
            </S.DayInfo>
            {day.activities.map((activity) => (
              <S.ActivityCard key={activity.externalId}>
                <S.ActivityImage source={{ uri: activity.photoPath }} />
                <View style={{ flex: 1 }}>
                  <S.ActivityName>{activity.name}</S.ActivityName>
                  <S.ActivityDescription>
                    {activity.description}
                  </S.ActivityDescription>
                  <S.ActivityCoords>
                    Lat: {activity.latitude} | Long: {activity.longitude}
                  </S.ActivityCoords>
                </View>
              </S.ActivityCard>
            ))}
            <S.MapContainer>
              <S.StyledMap
                initialRegion={{
                  latitude: Number(
                    day.activities[0]?.latitude || plan.latitude
                  ),
                  longitude: Number(
                    day.activities[0]?.longitude || plan.longitude
                  ),
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
              >
                {day.activities.map((activity) => (
                  <Marker
                    key={activity.externalId}
                    coordinate={{
                      latitude: Number(activity.latitude),
                      longitude: Number(activity.longitude),
                    }}
                    title={activity.name}
                    description={activity.description}
                  />
                ))}
              </S.StyledMap>
            </S.MapContainer>
          </S.DayCard>
        ))}
      </ScrollView>
    </S.Container>
  );
};
