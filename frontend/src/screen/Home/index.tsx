import React from "react";
import { ScrollView, View } from "react-native";
import { authStore } from "../../shared/stores/auth/authStore";
import { Text } from "@rneui/base";
import { Card, Icon, Tab, TabView } from "@rneui/themed";
import * as Styled from "./styles";
import { InformCityTab } from "../../shared/components/Pages/Home/InformCityTab";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "../../services/city/get-cities";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutesProp } from "../../shared/types/navigation/navigate";
import { SuggestCity } from "../../shared/components/Pages/Home/SuggestCityTab";

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
    <ScrollView>
      <Styled.Header>
        <Text h3>Bem vindo {user?.username}</Text>
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
          containerStyle={{ height: 150 }}
        >
          <TabView.Item style={{ width: "100%", height: "100%" }}>
            <InformCityTab />
          </TabView.Item>
          <TabView.Item style={{ width: "100%" }}>
            <SuggestCity />
          </TabView.Item>
        </TabView>
      </Styled.TabContainer>
      {isLoading && <Text>Loading...</Text>}
      {!isLoading && (
        <View>
          {data.map(({ country, description, externalId, name }) => (
            <Card key={externalId}>
              <Card.Title>{name}</Card.Title>
              <View>
                <Text>{country}</Text>
                <Text>{description}</Text>
              </View>
            </Card>
          ))}
        </View>
      )}
    </ScrollView>
  );
};
