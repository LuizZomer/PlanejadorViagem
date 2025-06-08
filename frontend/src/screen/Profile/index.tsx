import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { authStore } from "../../shared/stores/auth/authStore";
import { Button, Text, CheckBox, Icon, Avatar, Input } from "@rneui/themed";

const mockFriends = [
  { id: 1, name: "João" },
  { id: 2, name: "Maria" },
  { id: 3, name: "Carlos" },
];

const mockInvites = [
  { id: 4, name: "Ana" },
  { id: 5, name: "Pedro" },
];

const mockCities = [
  { id: 1, name: "São Paulo" },
  { id: 2, name: "Rio de Janeiro" },
];

export const Profile = () => {
  const user = authStore((store) => store.user);
  const logout = authStore((store) => store.logout);

  const [visibleInbox, setVisibleInbox] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEditFriends, setVisibleEditFriends] = useState(false);
  const [visibleEditCities, setVisibleEditCities] = useState(false);

  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
  const [friends, setFriends] = useState(mockFriends);
  const [cities, setCities] = useState(mockCities);

  const toggleFriend = (id: number) => {
    setSelectedFriends((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleSendInvites = () => {
    console.log("Convites enviados para:", selectedFriends);
    setVisibleAdd(false);
  };

  const handleAccept = (name: string) => {
    console.log(`Aceitou ${name}`);
  };

  const handleDecline = (name: string) => {
    console.log(`Recusou ${name}`);
  };

  const removeFriend = (id: number) => {
    setFriends((prev) => prev.filter((f) => f.id !== id));
  };

  const removeCity = (id: number) => {
    setCities((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setVisibleInbox(true)} style={styles.iconLeft}>
          <Icon name="mail-outline" type="ionicon" size={28} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVisibleAdd(true)} style={styles.iconRight}>
          <Icon name="person-add" type="material" size={28} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileSection}>
        <Avatar
          size={96}
          rounded
          icon={{ name: "person", type: "material", color: "#fff" }}
          containerStyle={{ backgroundColor: "#888" }}
        />
        <Text h4 style={styles.username}>{user?.username}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <Text style={styles.statText}>Amigos: {friends.length}</Text>
          <TouchableOpacity onPress={() => setVisibleEditFriends(true)}>
            <Icon name="edit" type="feather" size={20} color="#555" />
          </TouchableOpacity>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statText}>Cidades salvas: {cities.length}</Text>
          <TouchableOpacity onPress={() => setVisibleEditCities(true)}>
            <Icon name="edit" type="feather" size={20} color="#555" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.logoutButton}>
        <Button onPress={logout}>Logout</Button>
      </View>

      <Modal visible={visibleInbox} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text h4 style={{ marginBottom: 16 }}>Convites recebidos</Text>
            <ScrollView>
              {mockInvites.map((invite) => (
                <View
                  key={invite.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <Text>{invite.name}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Button title="Aceitar" type="clear" onPress={() => handleAccept(invite.name)} />
                    <Button title="Recusar" type="clear" onPress={() => handleDecline(invite.name)} />
                  </View>
                </View>
              ))}
            </ScrollView>
            <View style={styles.modalActions}>
              <Button title="Fechar" onPress={() => setVisibleInbox(false)} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={visibleAdd} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text h4 style={{ marginBottom: 16 }}>Enviar convite</Text>
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
              <Button title="Cancelar" type="outline" onPress={() => setVisibleAdd(false)} />
              <Button title="Enviar" onPress={handleSendInvites} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={visibleEditFriends} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text h4 style={{ marginBottom: 16 }}>Editar amigos</Text>
            <ScrollView>
              {friends.map((friend) => (
                <View
                  key={friend.id}
                  style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}
                >
                  <Text>{friend.name}</Text>
                  <Button title="Remover" type="clear" onPress={() => removeFriend(friend.id)} />
                </View>
              ))}
            </ScrollView>
            <View style={styles.modalActions}>
              <Button title="Fechar" onPress={() => setVisibleEditFriends(false)} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={visibleEditCities} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text h4 style={{ marginBottom: 16 }}>Editar cidades</Text>
            <ScrollView>
              {cities.map((city) => (
                <View
                  key={city.id}
                  style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}
                >
                  <Text>{city.name}</Text>
                  <Button title="Remover" type="clear" onPress={() => removeCity(city.id)} />
                </View>
              ))}
            </ScrollView>
            <View style={styles.modalActions}>
              <Button title="Fechar" onPress={() => setVisibleEditCities(false)} />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  iconLeft: {
    padding: 4,
  },
  iconRight: {
    padding: 4,
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
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 4,
  },
  statText: {
    fontSize: 16,
    color: "#555",
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
