import React, { useState } from "react";
import { View, StyleSheet, Modal, ScrollView, TouchableOpacity } from "react-native";
import { authStore } from "../../shared/stores/auth/authStore";
import { Button, Text, CheckBox, Icon, Avatar } from "@rneui/themed";

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
      {}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Icon name="person-add" type="material" size={24} />
        </TouchableOpacity>
      </View>

      {}
      <View style={styles.profileSection}>
        <Avatar
          size={96}
          rounded
          icon={{ name: "person", type: "material", color: "#fff" }}
          containerStyle={{ backgroundColor: "#888" }}
        />
        <Text h4 style={styles.username}>
          {user?.username}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Amigos: {selectedFriends.length}</Text>
        <Text style={styles.statText}>Cidades salvas: 0</Text>
      </View>

      <View style={styles.logoutButton}>
        <Button onPress={logout}>Logout</Button>
      </View>

      {/*seleção amigos moked */}
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text h4 style={{ marginBottom: 16 }}>Adicionar amigos</Text>
            <ScrollView>
              {mockFriends.map((friend) => (
                <CheckBox
                  key={friend.id}
                  title={friend.name}
                  checked={selectedFriends.includes(friend.id)}
                  onPress={() => toggleFriend(friend.id)}
                  containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                />
              ))}
            </ScrollView>
            <View style={styles.modalActions}>
              <Button
                title="Cancelar"
                type="outline"
                onPress={() => setVisible(false)}
                containerStyle={{ marginRight: 8 }}
              />
              <Button title="Adicionar" onPress={handleConfirm} />
            </View>
          </View>
        </View>
      </Modal>
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
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  username: {
    marginTop: 8,
    textAlign: "center",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
});
