import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { TRootStackParamList } from "../../routes/AppStack";
import { Button, ButtonGroup, ListItem, Text } from "@rneui/themed";
import { createCity } from "../../services/city/save-city";
import { NavigationRoutesProp } from "../../shared/types/navigation/navigate";
import { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    <ScrollView>
      <Text h3>Pontos turisticos {city}</Text>
      <Text h4>{country}</Text>
      <Text h4>{description}</Text>
      <Text h4>{spendingLevel.toUpperCase()}</Text>
      <View>
        {places.map(({ name, description }) => (
          <ListItem key={name}>
            <ListItem.Content>
              <ListItem.Title>{name}</ListItem.Title>
              <ListItem.Subtitle>{description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      <MapView
        style={{ width: "100%", height: 400 }}
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
      </MapView>
      <View style={{ gap: 10, marginTop: 10 }}>
        <Button type="clear" onPress={() => navigate("Home")}>
          Cancelar
        </Button>
        <Button onPress={handleSaveCity}>
          {mutation.isPending ? "Salvando..." : "Salvar"}
        </Button>
      </View>
    </ScrollView>
  );
};
