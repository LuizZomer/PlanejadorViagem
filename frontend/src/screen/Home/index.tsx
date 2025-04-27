import React from "react";
import { View } from "react-native";
import { authStore } from "../../shared/stores/auth/authStore";
import { Text } from "@rneui/base";
import { Tab, TabView } from "@rneui/themed";
import * as Styled from "./styles";
import { InformCityTab } from "../../shared/components/Pages/Home/InformCityTab";

export const Home = () => {
  const user = authStore((store) => store.user);
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <View>
      <Styled.Header>
        <Text h3>Bem vindo {user?.username}</Text>
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
        <TabView value={tabIndex} onChange={setTabIndex} animationType="spring">
          <TabView.Item style={{ width: "100%", height: "100%" }}>
            <InformCityTab />
          </TabView.Item>
          {/* <TabView.Item style={{ width: "100%" }}>
            <Styled.RequestCityTab />
          </TabView.Item> */}
        </TabView>
      </Styled.TabContainer>
    </View>
  );
};
