import { TextInput, View } from "react-native";
import * as S from "./styles";
import { Button, Text } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutesProp } from "../../../../types/navigation/navigate";

export const SuggestCity = () => {
  const navigate = useNavigation<NavigationRoutesProp>();

  return (
    <S.SuggestCityContainer>
      <Text h4>
        Passe uma descrição para a IA recomendar cidades com pontos turisticos
        para você!
      </Text>
      <Button
        onPress={() => {
          navigate.navigate("InformCity");
        }}
      >
        Abrir opções
      </Button>
    </S.SuggestCityContainer>
  );
};
