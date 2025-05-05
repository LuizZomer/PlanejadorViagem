import React from "react";
import { View, StyleSheet } from "react-native";
import { authStore } from "../../shared/stores/auth/authStore";
import { Button, Text } from "@rneui/themed";

export const Profile = () => {
  const user = authStore((store) => store.user);
  const logout = authStore((store) => store.logout);

  return (
    <View style={styles.container}>
      <Text h4 style={styles.username}>
        {user?.username}
      </Text>

      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Amigos: 0</Text>
        <Text style={styles.statText}>Cidades salvas: 0</Text>
      </View>

      <View style={styles.logoutButton}>
        <Button onPress={logout}>Logout</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  username: {
    textAlign: "center",
    marginBottom: 20,
  },
  statsContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  statText: {
    fontSize: 16,
    color: "#555",
    marginVertical: 4,
  },
  logoutButton: {
    marginTop: 20,
    alignSelf: "center",
    width: "50%",
  },
});
