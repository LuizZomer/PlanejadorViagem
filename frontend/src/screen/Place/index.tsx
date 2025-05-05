import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import { TRootStackParamList } from "../../routes/AppStack";
import { createCity } from "../../services/city/save-city";
import { NavigationRoutesProp } from "../../shared/types/navigation/navigate";
import { Marker } from "react-native-maps";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as S from "./styles";

export const PlacesList = () => {
  const route = useRoute<RouteProp<TRootStackParamList, "PlaceList">>();
  const { navigate } = useNavigation<NavigationRoutesProp>();
  const queryClient = useQueryClient();

  const {
    city,
    country,
    description,
    spendingLevel,
    latitude,
    longitude,
    places,
  } = route.params;

  const mutation = useMutation({
    mutationFn: async (cityData: IFindPlaceByCityOutput) =>
      createCity(cityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-cities"] });
      navigate("Home");
    },
  });

  const handleSaveCity = async () => {
    await mutation.mutateAsync({
      city,
      country,
      description,
      latitude,
      longitude,
      places,
      spendingLevel,
    });
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title style={{ color: "#00BFFF" }}>Pontos turísticos {city}</S.Title>
        <S.Subtitle>País: {country}</S.Subtitle>

        <S.DescriptionBox>
          <S.DescriptionText>
            {description}. {spendingLevel.toUpperCase()}
          </S.DescriptionText>
        </S.DescriptionBox>
      </S.Header>

      {places.map(({ name, description }) => (
        <S.PlaceCard key={name}>
          <S.PlaceTitle style={{ color: "#00BFFF" }}>{name}</S.PlaceTitle>
          <S.PlaceDescription>{description}</S.PlaceDescription>
        </S.PlaceCard>
      ))}

      <S.MapContainer>
        <S.StyledMap
          initialRegion={{
            latitude: Number(latitude),
            longitude: Number(longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {places.map(({ description, latitude, longitude, name }) => (
            <Marker
              key={name}
              coordinate={{
                latitude: Number(latitude),
                longitude: Number(longitude),
              }}
              title={name}
              description={description}
            />
          ))}
        </S.StyledMap>
      </S.MapContainer>

      <S.ButtonGroup>
        <S.CancelButton type="clear" onPress={() => navigate("Home")}>
          Cancelar
        </S.CancelButton>
        <S.SaveButton onPress={handleSaveCity}>
          {mutation.isPending ? "Salvando..." : "Salvar"}
        </S.SaveButton>
      </S.ButtonGroup>
    </S.Container>
  );
};
