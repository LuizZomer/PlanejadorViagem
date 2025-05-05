import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, View, StyleSheet } from "react-native";
import { TRootStackParamList } from "../../routes/AppStack";
import { Button, ListItem, Text, Icon } from "@rneui/themed";
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text h3 style={styles.title}>
          Pontos turísticos de {city}
        </Text>
        <View style={styles.infoGroup}>
          <Icon name="flag" type="font-awesome-5" size={16} />
          <Text h4 style={styles.infoText}>{country}</Text>
        </View>
        <View style={styles.infoGroup}>
          <Icon name="info-circle" type="font-awesome-5" size={16} />
          <Text h4 style={styles.infoText}>{description}</Text>
        </View>
        <View style={styles.infoGroup}>
          <Icon name="wallet" type="font-awesome-5" size={16} />
          <Text h4 style={styles.infoText}>{spendingLevel.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.placesList}>
        {places.map(({ name, description }) => (
          <ListItem key={name} bottomDivider>
            <Icon name="map-marker-alt" type="font-awesome-5" color="#3b82f6" />
            <ListItem.Content>
              <ListItem.Title>{name}</ListItem.Title>
              <ListItem.Subtitle>{description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>

      <MapView
        style={styles.map}
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

      <View style={styles.buttons}>
        <Button
          type="clear"
          onPress={() => navigate("Home")}
          icon={<Icon name="times" type="font-awesome-5" color="#555" />}
        >
          Cancelar
        </Button>
        <Button
          onPress={handleSaveCity}
          loading={mutation.isPending}
          icon={<Icon name="save" type="font-awesome-5" color="white" />}
        >
          {mutation.isPending ? "Salvando..." : "Salvar"}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 8,
  },
  infoGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    gap: 6,
  },
  infoText: {
    marginLeft: 8,
  },
  placesList: {
    marginBottom: 16,
  },
  map: {
    width: "100%",
    height: 400,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttons: {
    gap: 10,
    marginTop: 10,
  },
});
