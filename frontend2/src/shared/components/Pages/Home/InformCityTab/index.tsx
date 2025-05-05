import { Button, Input, Text } from "@rneui/themed";
import * as S from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutesProp } from "../../../../types/navigation/navigate";

export const InformCityTab = () => {
  const navigate = useNavigation<NavigationRoutesProp>();
  return (
    <S.InformCityContainer>
      <Text h4>Informe a cidade para recomendar os pontos turisticos!</Text>
      <Button
        onPress={() => {
          navigate.navigate("InformCity");
        }}
      >
        Abrir opções
      </Button>
    </S.InformCityContainer>
  );
};
