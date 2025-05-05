import React from "react";
import { StatusBar } from "react-native";
import { authStore } from "../../shared/stores/auth/authStore";
import { Text } from "@rneui/base";
import { Card, Icon } from "@rneui/themed";
import { InformCityTab } from "../../shared/components/Pages/Home/InformCityTab";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "../../services/city/get-cities";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutesProp } from "../../shared/types/navigation/navigate";
import { SuggestCities } from "../SuggestCities";
import { SuggestCityTab } from "../../shared/components/Pages/Home/SuggestCityTab";
import * as S from "./styles";

export const Home = () => {
  const user = authStore((store) => store.user);
  const [selectedOption, setSelectedOption] = React.useState<
    "inform" | "suggest"
  >("inform");
  const navigate = useNavigation<NavigationRoutesProp>();

  const { data = [], isLoading } = useQuery({
    queryKey: ["get-cities"],
    queryFn: async () => getCities(),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <S.Screen>
      <StatusBar barStyle="light-content" backgroundColor="#00BFFF" />

      <S.TopBar>
        <Icon name="home" type="material" color="#fff" size={28} />
        <S.TopBarTitle>Bem-vindo, {user?.username}</S.TopBarTitle>
        <Icon
          name="person"
          type="material"
          color="#fff"
          size={28}
          onPress={() => navigate.navigate("Profile")}
        />
      </S.TopBar>

      <S.ScrollContent>
        <S.OptionButtons>
          <S.OptionButton
            active={selectedOption === "inform"}
            onPress={() => setSelectedOption("inform")}
          >
            <S.OptionText active={selectedOption === "inform"}>
              Informar Cidade
            </S.OptionText>
          </S.OptionButton>

          <S.OptionButton
            active={selectedOption === "suggest"}
            onPress={() => setSelectedOption("suggest")}
          >
            <S.OptionText active={selectedOption === "suggest"}>
              Pedir Sugestão
            </S.OptionText>
          </S.OptionButton>
        </S.OptionButtons>

        <S.TabView>
          {selectedOption === "inform" ? <InformCityTab /> : <SuggestCities />}
        </S.TabView>

        {isLoading ? (
          <S.Loading>Carregando cidades...</S.Loading>
        ) : (
          <S.CardsContainer>
            {data.map(({ country, description, externalId, name }) => (
              <S.Card key={externalId}>
                <S.CardTitle>{name}</S.CardTitle>
                <S.CardCountry>{country}</S.CardCountry>
                <S.CardDescription>{description}</S.CardDescription>
              </S.Card>
            ))}
          </S.CardsContainer>
        )}
      </S.ScrollContent>
    </S.Screen>
  );
};
