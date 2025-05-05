import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "@rneui/themed";
import { NavigationRoutesProp } from "../../../../types/navigation/navigate";
import * as S from "./styles";

export const SuggestCityTab = () => {
  const navigate = useNavigation<NavigationRoutesProp>();

  return (
    <S.SuggestCityContainer>
      <Text h4>
        Passe uma descrição para a IA recomendar cidades com pontos turisticos
        para você!
      </Text>
      <Button
        onPress={() => {
          navigate.navigate("SuggestCity");
        }}
      >
        Abrir opções
      </Button>
    </S.SuggestCityContainer>
  );
};
