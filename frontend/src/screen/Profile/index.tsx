import React from "react";
import { View } from "react-native";
import { authStore } from "../../shared/stores/auth/authStore";
import { Button, Text } from "@rneui/themed";

export const Profile = () => {
  const user = authStore((store) => store.user);
  const logout = authStore((store) => store.logout);

  return (
    <View>
      <Text>{user?.username}</Text>
      <View>
        <Text>Amigos: 0</Text>
        <Text>Cidades salvas: 0</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Button onPress={logout}>Logout</Button>
      </View>
    </View>
  );
};
