import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import { TRootStackParamList } from "../../routes/AppStack";
import { createPlan } from "../../services/plan/save-city";
import { NavigationRoutesProp } from "../../shared/types/navigation/navigate";
import { Marker } from "react-native-maps";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as S from "./styles";
import { ScrollView, View } from "react-native";
import { formatDate } from "../../shared/utils/formatDate";
import { MaterialIcons } from "@expo/vector-icons";
import { PlanLoading } from "../../shared/components/Loading/PlanLoading";

interface IActivity {
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  estimatedTime: string;
  photoPath: string;
}

interface IDay {
  date: string;
  expense: string;
  activities: IActivity[];
  weather: string;
  averageTemp: number;
}

interface IPlaceListData {
  destination: string;
  country: string;
  days: IDay[];
  description: string;
  endDate: string;
  host: string;
  latitude: number;
  longitude: number;
  spendingLevel: string;
  startDate: string;
}

export const PlacesList = () => {
  const route = useRoute<RouteProp<TRootStackParamList, "PlaceList">>();
  const { navigate } = useNavigation<NavigationRoutesProp>();
  const queryClient = useQueryClient();

  // Ajuste para receber todos os dados do retorno
  const {
    destination,
    country,
    days = [],
    description,
    endDate,
    host,
    latitude,
    longitude,
    spendingLevel,
    startDate,
  } = route.params as unknown as IPlaceListData;

  const mutation = useMutation({
    mutationFn: async (cityData: IPlaceListData) => createPlan(cityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-cities"] });
      navigate("Home");
    },
  });

  const handleSaveCity = async () => {
    await mutation.mutateAsync({
      destination,
      country,
      days,
      description,
      endDate,
      host,
      latitude,
      longitude,
      spendingLevel,
      startDate,
    });
  };

  return (
    <S.Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <S.Header>
          <S.Title accessibilityRole="header" style={{ color: "#00BFFF" }}>
            {destination}
          </S.Title>
          <S.Subtitle>País: {country}</S.Subtitle>
          <S.Subtitle>
            Período: {formatDate(startDate)} até {formatDate(endDate)}
          </S.Subtitle>
          <S.Subtitle>Nível de gasto: {spendingLevel}</S.Subtitle>
          <S.Subtitle>Hospedagem: {host}</S.Subtitle>
        </S.Header>

        <S.DescriptionBox>
          <S.DescriptionText accessibilityLabel="Descrição do destino">
            {description}
          </S.DescriptionText>
        </S.DescriptionBox>

        <S.SectionTitle accessibilityRole="header">Roteiro</S.SectionTitle>
        {days.length === 0 && (
          <S.PlaceDescription>Nenhum dia planejado.</S.PlaceDescription>
        )}
        {days.map((day, idx) => (
          <S.PlaceCard
            key={day.date + idx}
            accessibilityLabel={`Dia ${idx + 1}`}
          >
            <S.PlaceTitle style={{ color: "#00BFFF", marginBottom: 8 }}>
              Dia {idx + 1} - {formatDate(day.date)}
            </S.PlaceTitle>
            {day.averageTemp && (
              <S.PlaceDescription style={{ marginBottom: 12 }}>
                Média de temperatura: {day.averageTemp}°C
              </S.PlaceDescription>
            )}
            {day.weather && (
              <S.PlaceDescription style={{ marginBottom: 12 }}>
                Clima: {day.weather}
              </S.PlaceDescription>
            )}
            <S.PlaceDescription style={{ marginBottom: 12 }}>
              Gasto estimado: R$ {day.expense}
            </S.PlaceDescription>
            <S.SectionTitle style={{ marginBottom: 8 }}>
              Atividades do dia
            </S.SectionTitle>
            {day.activities && day.activities.length > 0 ? (
              <View style={{ gap: 12 }}>
                {day.activities.map((activity, aIdx) => (
                  <S.ActivityContainer key={activity.name + aIdx}>
                    <S.ActivityImage
                      source={{ uri: activity.photoPath }}
                      accessibilityLabel={`Foto de ${activity.name}`}
                    />
                    <View style={{ flex: 1 }}>
                      <S.ActivityTitle>{activity.name}</S.ActivityTitle>
                      <S.ActivityDescription>
                        {activity.description}
                      </S.ActivityDescription>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 4,
                        }}
                      >
                        <MaterialIcons
                          name="schedule"
                          size={16}
                          color="#888"
                          style={{ marginRight: 4 }}
                        />
                        <S.ActivityTime>
                          {activity.estimatedTime} min
                        </S.ActivityTime>
                      </View>
                    </View>
                  </S.ActivityContainer>
                ))}
              </View>
            ) : (
              <S.PlaceDescription>
                Nenhuma atividade planejada.
              </S.PlaceDescription>
            )}
            <S.SectionTitle style={{ marginTop: 18, marginBottom: 8 }}>
              Mapa dos pontos do dia
            </S.SectionTitle>
            <S.MapContainer>
              <S.StyledMap
                initialRegion={{
                  latitude: day.activities[0]?.latitude || latitude,
                  longitude: day.activities[0]?.longitude || longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
                accessibilityLabel={`Mapa do dia ${idx + 1}`}
              >
                {day.activities.map((activity, aIdx) => (
                  <Marker
                    key={activity.name + aIdx}
                    coordinate={{
                      latitude: activity.latitude,
                      longitude: activity.longitude,
                    }}
                    title={activity.name}
                    description={activity.description}
                    accessibilityLabel={`Ponto turístico: ${activity.name}`}
                  />
                ))}
              </S.StyledMap>
            </S.MapContainer>
          </S.PlaceCard>
        ))}

        <S.SectionTitle accessibilityRole="header">Localização</S.SectionTitle>
        <S.MapContainer>
          <S.StyledMap
            initialRegion={{
              latitude: Number(latitude),
              longitude: Number(longitude),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            accessibilityLabel={`Mapa de ${destination}`}
          >
            <Marker
              coordinate={{
                latitude: Number(latitude),
                longitude: Number(longitude),
              }}
              title={destination}
              description={description}
              accessibilityLabel={`Marcador de ${destination}`}
            />
          </S.StyledMap>
        </S.MapContainer>

        <S.ButtonGroup>
          <S.CancelButton
            type="clear"
            onPress={() => navigate("Home")}
            accessibilityLabel="Cancelar e voltar para a tela inicial"
          >
            Cancelar
          </S.CancelButton>
          <S.SaveButton
            onPress={handleSaveCity}
            accessibilityLabel="Salvar planejamento"
          >
            {mutation.isPending ? "Salvando..." : "Salvar"}
          </S.SaveButton>
        </S.ButtonGroup>
      </ScrollView>
    </S.Container>
  );
};
