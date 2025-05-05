import React from "react";
import { ScrollView, View, StyleSheet, StatusBar, TouchableOpacity, TextInput } from "react-native";
import { authStore } from "../../shared/stores/auth/authStore";
import { Text } from "@rneui/base";
import { Card, Icon } from "@rneui/themed";
import { InformCityTab } from "../../shared/components/Pages/Home/InformCityTab";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "../../services/city/get-cities";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutesProp } from "../../shared/types/navigation/navigate";
import { SuggestCity } from "../../shared/components/Pages/Home/SuggestCity";

export const Home = () => {
  const user = authStore((store) => store.user);
  const [selectedOption, setSelectedOption] = React.useState<"inform" | "suggest">("inform");
  const navigate = useNavigation<NavigationRoutesProp>();

  const { data = [], isLoading } = useQuery({
    queryKey: ["get-cities"],
    queryFn: async () => getCities(),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />

      {/* Top Navigation */}
      <View style={styles.topBar}>
        <Icon name="home" type="material" color="#fff" size={28} />
        <Text style={styles.topBarTitle}>Bem-vindo, {user?.username}</Text>
        <Icon
          name="person"
          type="material"
          color="#fff"
          size={28}
          onPress={() => navigate.navigate("Profile")}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Botões centrais */}
        <View style={styles.optionButtons}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === "inform" && styles.optionButtonActive,
            ]}
            onPress={() => setSelectedOption("inform")}
          >
            <Text style={selectedOption === "inform" ? styles.optionTextActive : styles.optionText}>
              Informar Cidade
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === "suggest" && styles.optionButtonActive,
            ]}
            onPress={() => setSelectedOption("suggest")}
          >
            <Text style={selectedOption === "suggest" ? styles.optionTextActive : styles.optionText}>
              Pedir Sugestão
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabView}>
          {selectedOption === "inform" ? <InformCityTab /> : <SuggestCity />}
        </View>

        {isLoading ? (
          <Text style={styles.loading}>Carregando cidades...</Text>
        ) : (
          <View style={styles.cardsContainer}>
            {data.map(({ country, description, externalId, name }) => (
              <Card key={externalId} containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>{name}</Card.Title>
                <View>
                  <Text style={styles.cardCountry}>{country}</Text>
                  <Text style={styles.cardDescription}>{description}</Text>
                </View>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    elevation: 4,
  },
  topBarTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  optionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 24,
  },
  optionButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
  optionButtonActive: {
    backgroundColor: "#007BFF",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  optionTextActive: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  tabView: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  loading: {
    textAlign: "center",
    marginVertical: 20,
    color: "#555",
  },
  cardsContainer: {
    gap: 12,
  },
  card: {
    borderRadius: 10,
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
  },
  cardCountry: {
    fontWeight: "600",
    marginTop: 5,
    color: "#444",
  },
  cardDescription: {
    color: "#666",
    marginTop: 4,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
});
