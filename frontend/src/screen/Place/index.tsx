import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { TRootStackParamList } from "../../routes/AppStack";
import { Button, ButtonGroup, ListItem, Text } from "@rneui/themed";
import { createCity } from "../../services/city/save-city";
import { NavigationRoutesProp } from "../../shared/types/navigation/navigate";
import { useState } from "react";

export const PlacesList = () => {
  const route = useRoute<RouteProp<TRootStackParamList, "PlaceList">>();
  const { navigate } = useNavigation<NavigationRoutesProp>();
  const [loading, setLoading] = useState(false);

  const { city, country, description, spendingLevel, places } = route.params;

  const handleSaveCity = async () => {
    setLoading(true);
    await createCity({
      city,
      country,
      description,
      places,
      spendingLevel,
    }).then(() => {
      //   navigate("Home");
    });

    setLoading(false);
  };

  return (
    <ScrollView>
      <Text h3>Pontos turisticos {city}</Text>
      <Text h4>{country}</Text>
      <Text h4>{description}</Text>
      <Text h4>{spendingLevel.toUpperCase()}</Text>
      <View>
        {places.map(({ name, description }) => (
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>{name}</ListItem.Title>
              <ListItem.Subtitle>{description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      <View
        style={{
          width: "100%",
          height: 300,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20, color: "#fff" }}>Map is hier</Text>
      </View>
      <View style={{ gap: 10, marginTop: 10 }}>
        <Button type="clear" onPress={() => navigate("Home")}>
          Cancelar
        </Button>
        <Button onPress={handleSaveCity}>
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </View>
    </ScrollView>
  );
};
