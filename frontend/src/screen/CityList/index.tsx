import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button, Card, ListItem, Text } from "@rneui/themed";
import { ScrollView, View } from "react-native";
import { TRootStackParamList } from "../../routes/AppStack";
import { NavigationRoutesProp } from "../../shared/types/navigation/navigate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCity } from "../../services/city/save-city";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";

export const CityList = () => {
  const route = useRoute<RouteProp<TRootStackParamList, "CityList">>();
  const { navigate } = useNavigation<NavigationRoutesProp>();
  const queryClient = useQueryClient();
  const { cities, description, spendingLevel } = route.params;

  const [suggestedCities, setSuggestedCities] = useState(cities);

  const mutation = useMutation({
    mutationFn: async (cityData: IFindPlaceByCityOutput) =>
      createCity(cityData),
    onSuccess: (_, variables) => {
      setSuggestedCities((prev) => {
        return prev.filter((city) => city.name !== variables.city);
      });
    },
  });

  const handleSaveCity = async ({
    city,
    country,
    description,
    latitude,
    longitude,
    places,
  }: Omit<IFindPlaceByCityOutput, "spendingLevel">) => {
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

  const handleHomeReturn = () => {
    queryClient.invalidateQueries({ queryKey: ["get-cities"] });
    navigate("Home");
  };

  return (
    <ScrollView>
      <Text h4>{description}</Text>
      <Text h4>Nivel de gastos {spendingLevel}</Text>
      <View>
        {suggestedCities.map(
          ({ country, description, name, places, latitude, longitude }) => (
            <Card key={name}>
              <Card.Title>{name}</Card.Title>
              <View>
                <Text>{country}</Text>
                <Text>{description}</Text>
              </View>
              {places.map(({ description, name }) => (
                <ListItem key={name}>
                  <ListItem.Content>
                    <ListItem.Title>{name}</ListItem.Title>
                    <ListItem.Subtitle>{description}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))}

              <MapView
                style={{ width: "100%", height: 400 }}
                initialRegion={{
                  latitude: Number(latitude),
                  longitude: Number(longitude),
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
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
              </MapView>

              <Button
                onPress={() =>
                  handleSaveCity({
                    city: name,
                    country,
                    description,
                    latitude,
                    longitude,
                    places,
                  })
                }
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Aguardade..." : "Salvar"}
              </Button>
            </Card>
          )
        )}
      </View>
      <Button onPress={handleHomeReturn}>Voltar para a home</Button>
    </ScrollView>
  );
};
