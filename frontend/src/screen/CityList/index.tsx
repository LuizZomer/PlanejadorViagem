import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NavigationRoutesProp } from "../../shared/types/navigation/navigate";
import { TRootStackParamList } from "../../routes/AppStack";
import { createPlan } from "../../services/plan/save-city";
import { useState } from "react";
import { Marker } from "react-native-maps";
import * as S from "./styles";
import {
  findPlaceByCity,
  IFindPlaceById,
} from "../../services/plan/find-place-by-city";
import Toast from "react-native-toast-message";
import { PlanLoading } from "../../shared/components/Loading/PlanLoading";

export const CityList = () => {
  const route = useRoute<RouteProp<TRootStackParamList, "CityList">>();
  const { navigate } = useNavigation<NavigationRoutesProp>();
  const queryClient = useQueryClient();
  const { cityList, formData } = route.params;

  const [suggestedCities, setSuggestedCities] = useState(cityList.cities);

  const mutation = useMutation({
    mutationFn: async (cityData: IFindPlaceById) => findPlaceByCity(cityData),
    onSuccess: (data) => {
      navigate("PlaceList", data);
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar cidades",
      });
    },
  });

  const handleSaveCity = async ({
    destination,
    country,
    spendingLevel,
    startDate,
    endDate,
    hosting,
  }: IFindPlaceById) => {
    await mutation.mutateAsync({
      destination,
      country,
      spendingLevel,
      startDate,
      endDate,
      hosting,
    });
  };

  return (
    <>
      {mutation.isPending && <PlanLoading />}
      {!mutation.isPending && (
        <S.Container>
          <S.Title>{cityList.description}</S.Title>
          <S.Subtitle>Nível de gastos {cityList.spendingLevel}</S.Subtitle>

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
                  onPress={() =>
                    handleSaveCity({
                      destination: name,
                      country,
                      spendingLevel: formData.spendingLevel,
                      startDate: formData.startDate,
                      endDate: formData.endDate,
                      hosting: formData.hosting,
                    })
                  }
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Gerando..." : "Gerar planejamento"}
                </S.SaveButton>
              </S.Card>
            )
          )}
        </S.Container>
      )}
    </>
  );
};
