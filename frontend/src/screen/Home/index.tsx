import React from "react";
import { ScrollView, View, Image, StyleSheet } from "react-native";
import { authStore } from "../../shared/stores/auth/authStore";
import { Text } from "@rneui/base";
import { Card, Icon, Tab, TabView } from "@rneui/themed";
import * as Styled from "./styles";
import { InformCityTab } from "../../shared/components/Pages/Home/InformCityTab";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "../../services/city/get-cities";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutesProp } from "../../shared/types/navigation/navigate";
import { SuggestCity } from "../../shared/components/Pages/Home/SuggestCity";

export const Home = () => {
  const user = authStore((store) => store.user);
  const [tabIndex, setTabIndex] = React.useState(0);
  const navigate = useNavigation<NavigationRoutesProp>();

  const { data = [], isLoading } = useQuery({
    queryKey: ["get-cities"],
    queryFn: async () => getCities(),
    staleTime: 1000 * 60 * 5, // 5 min
  });

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../../../assets/banner.jpg")} // Substitua pelo caminho correto do banner
        style={styles.banner}
        resizeMode="cover"
      />
      <Styled.Header>
        <Text h3 style={styles.welcome}>
          Bem vindo, {user?.username}
        </Text>
        <Icon
          name="account"
          type="material-community"
          color="#517fa4"
          size={30}
          onPress={() => navigate.navigate("Profile")}
        />
      </Styled.Header>

      <Styled.TabContainer>
        <Tab
          value={tabIndex}
          onChange={setTabIndex}
          style={{ borderRadius: 10 }}
          containerStyle={{ borderRadius: 10 }}
          variant="primary"
          indicatorStyle={{ backgroundColor: "white" }}
        >
          <Tab.Item
            title="Informar cidade"
            icon={{ name: "timer", type: "ionicon", color: "white" }}
          />
          <Tab.Item
            title="Pedir sugestão de cidade"
            icon={{ name: "timer", type: "ionicon", color: "white" }}
          />
        </Tab>
        <TabView
          value={tabIndex}
          onChange={setTabIndex}
          animationType="spring"
          containerStyle={{ height: 180 }}
        >
          <TabView.Item style={{ width: "100%", height: "100%" }}>
            <InformCityTab />
          </TabView.Item>
          <TabView.Item style={{ width: "100%" }}>
            <SuggestCity />
          </TabView.Item>
        </TabView>
      </Styled.TabContainer>

      {isLoading && <Text style={styles.loading}>Carregando cidades...</Text>}

      {!isLoading && (
        <View style={styles.cardsContainer}>
          {data.map(({ country, description, externalId, name }) => (
            <Card key={externalId} containerStyle={styles.card}>
              <Card.Title>{name}</Card.Title>
              <View>
                <Text style={styles.cardCountry}>{country}</Text>
                <Text>{description}</Text>
              </View>
            </Card>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },
  banner: {
    width: "100%",
    height: 180,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  welcome: {
    marginVertical: 10,
    fontWeight: "bold",
  },
  loading: {
    textAlign: "center",
    marginVertical: 20,
  },
  cardsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  card: {
    borderRadius: 10,
    elevation: 2,
  },
  cardCountry: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
