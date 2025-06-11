import React from "react";
import { StatusBar, Touchable, TouchableOpacity } from "react-native";
import { authStore } from "../../shared/stores/auth/authStore";
import { Icon } from "@rneui/themed";
import { InformCityTab } from "../../shared/components/Pages/Home/InformCityTab";
import { useQuery } from "@tanstack/react-query";
import { getPlans } from "../../services/city/get-plans";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutesProp } from "../../shared/types/navigation/navigate";
import { SuggestCityTab } from "../../shared/components/Pages/Home/SuggestCityTab";
import * as S from "./styles";
import { formatDate } from "../../shared/utils/formatDate";

export const Home = () => {
  const user = authStore((store) => store.user);

  const [selectedOption, setSelectedOption] = React.useState<
    "inform" | "suggest"
  >("inform");
  const navigate = useNavigation<NavigationRoutesProp>();

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["get-cities"],
    queryFn: async () => getPlans(),
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
          {selectedOption === "inform" ? <InformCityTab /> : <SuggestCityTab />}
        </S.TabView>

        {isLoading ? (
          <S.Loading>Carregando cidades...</S.Loading>
        ) : (
          <S.CardsContainer>
            {plans.length === 0 && (
              <S.EmptyText>Nenhum planejamento salvo.</S.EmptyText>
            )}
            {plans.map((plan) => (
              <TouchableOpacity
                key={plan.externalId}
                onPress={() =>
                  navigate.navigate("CityDetails", {
                    externalId: plan.externalId,
                  })
                }
              >
                <S.PlanCard>
                  <S.PlanTitle>
                    {plan.destination} - {plan.country}
                  </S.PlanTitle>
                  <S.PlanDescription>{plan.description}</S.PlanDescription>
                  <S.PlanInfo>
                    <S.PlanInfoText>
                      Período: {formatDate(plan.startDate)} até{" "}
                      {formatDate(plan.endDate)}
                    </S.PlanInfoText>
                    <S.PlanInfoText>Hospedagem: {plan.hosting}</S.PlanInfoText>
                    <S.PlanInfoText>
                      Nível de gasto: {plan.spendingLevel}
                    </S.PlanInfoText>
                  </S.PlanInfo>
                </S.PlanCard>
              </TouchableOpacity>
            ))}
          </S.CardsContainer>
        )}
      </S.ScrollContent>
    </S.Screen>
  );
};
