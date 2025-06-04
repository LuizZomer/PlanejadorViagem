import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { authStore } from "../../shared/stores/auth/authStore";
import { Button, Text } from "@rneui/themed";
import { IconButton, Portal, Dialog, Paragraph, Checkbox } from "react-native-paper";

const mockFriends = [
  { id: 1, name: "João" },
  { id: 2, name: "Maria" },
  { id: 3, name: "Carlos" },
];

export const Profile = () => {
  const user = authStore((store) => store.user);
  const logout = authStore((store) => store.logout);

  const [visible, setVisible] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);

  const toggleFriend = (id: number) => {
    setSelectedFriends((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    console.log("Amigos adicionados:", selectedFriends);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Botão de adicionar amigos no canto superior direito */}
      <View style={styles.header}>
        <IconButton
          icon="account-plus"
          size={24}
          onPress={() => setVisible(true)}
        />
      </View>

      <Text h4 style={styles.username}>
        {user?.username}
      </Text>

      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Amigos: {selectedFriends.length}</Text>
        <Text style={styles.statText}>Cidades salvas: 0</Text>
      </View>

      <View style={styles.logoutButton}>
        <Button onPress={logout}>Logout</Button>
      </View>

      {/* Modal para selecionar amigos */}
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Adicionar amigos</Dialog.Title>
          <Dialog.ScrollArea>
            <View style={{ paddingHorizontal: 24 }}>
              {mockFriends.map((friend) => (
                <View key={friend.id} style={{ flexDirection: "row", alignItems: "center" }}>
                  <Checkbox
                    status={selectedFriends.includes(friend.id) ? "checked" : "unchecked"}
                    onPress={() => toggleFriend(friend.id)}
                  />
                  <Paragraph>{friend.name}</Paragraph>
                </View>
              ))}
            </View>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button title="Cancelar" type="clear" onPress={() => setVisible(false)} />
            <Button title="Adicionar" onPress={handleConfirm} />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "flex-end",
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
