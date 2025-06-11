import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NavigationRoutesProp } from "../../shared/types/navigation/navigate";
import { TRootStackParamList } from "../../routes/AppStack";
import { createPlan } from "../../services/city/save-city";
import { useState } from "react";
import { Marker } from "react-native-maps";
import * as S from "./styles";

export const CityList = () => {
  const route = useRoute<RouteProp<TRootStackParamList, "CityList">>();
  const { navigate } = useNavigation<NavigationRoutesProp>();
  const queryClient = useQueryClient();
  const { cities, description, spendingLevel } = route.params;

  const [suggestedCities, setSuggestedCities] = useState(cities);

  // const mutation = useMutation({
  //   mutationFn: async (cityData: IFindPlaceByCityOutput) =>
  //     createCity(cityData),
  //   onSuccess: (_, variables) => {
  //     setSuggestedCities((prev) => {
  //       return prev.filter((city) => city.name !== variables.city);
  //     });
  //   },
  // });

  // const handleSaveCity = async ({
  //   city,
  //   country,
  //   description,
  //   latitude,
  //   longitude,
  //   places,
  // }: Omit<IFindPlaceByCityOutput, "spendingLevel">) => {
  //   await mutation.mutateAsync({
  //     city,
  //     country,
  //     description,
  //     latitude,
  //     longitude,
  //     places,
  //     spendingLevel,
  //   });
  // };

  // const handleHomeReturn = () => {
  //   queryClient.invalidateQueries({ queryKey: ["get-cities"] });
  //   navigate("Home");
  // };

  return (
    <S.Container>
      <S.Title>{description}</S.Title>
      <S.Subtitle>Nível de gastos {spendingLevel}</S.Subtitle>

      {suggestedCities.map(
        ({ country, description, name, places, latitude, longitude }) => (
          <S.Card key={name}>
            <S.CityName>{name}</S.CityName>
            <S.CountryText>{country}</S.CountryText>
            <S.DescriptionText>{description}</S.DescriptionText>

            {places.map(({ name, description }) => (
              <S.PlaceCard key={name}>
                <S.PlaceTitle>{name}</S.PlaceTitle>
                <S.PlaceDescription>{description}</S.PlaceDescription>
              </S.PlaceCard>
            ))}

            <S.StyledMap
              initialRegion={{
                latitude: Number(latitude),
                longitude: Number(longitude),
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
            >
              {places.map(({ name, latitude, longitude, description }) => (
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

            <S.Spacer />

            <S.SaveButton
            // onPress={() =>
            // handleSaveCity({
            //   city: name,
            //   country,
            //   description,
            //   latitude,
            //   longitude,
            //   places,
            // })
            // }
            // disabled={mutation.isPending}
            >
              {/* {mutation.isPending ? "Aguardando..." : "Salvar"} */}
            </S.SaveButton>
          </S.Card>
        )
      )}

      {/* <S.CancelButton onPress={handleHomeReturn}>Voltar para a home</S.CancelButton> */}
    </S.Container>
  );
};
