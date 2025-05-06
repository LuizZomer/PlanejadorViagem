import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Text, Button, Input, Icon } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { OptionContainer } from "../../shared/components/OptionsButton";
import { findPlaceByCity } from "../../services/city/find-place-by-city";
import { TRootStackParamList } from "../../routes/AppStack";
import { FormContainer } from "../../styles/GlobalStyles";
import * as S from "./styles";

const schema = z.object({
  city: z.string().min(1, "Campo obrigatório"),
  country: z.string().min(1, "Campo obrigatório"),
  spendingLevel: z.string().min(1, "Campo obrigatório"),
});

type TFormData = z.infer<typeof schema>;

export const ChooseCity = () => {
  const { navigate } = useNavigation<NavigationProp<TRootStackParamList>>();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      city: "",
      country: "",
      spendingLevel: "",
    },
  });

  const handleSend = async (data: TFormData) => {
    const { city, country, spendingLevel } = data;
    const cities = await findPlaceByCity({ city, country, spendingLevel });
    navigate("PlaceList", cities);
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>
        Crie seu planejamento
      </Text>

      <FormContainer style={styles.form}>
        {/* Campo: Cidade */}
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Input
              label="Nome da cidade"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="ex: Rio de Janeiro"
              placeholderTextColor="#9A9A9A"
              leftIcon={<Icon name="location-city" type="material" color="#00BFFF" />}
              errorMessage={errors.city?.message}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              containerStyle={styles.inputWrapper}
            />
          )}
        />

        {/* Campo: País */}
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Input
              label="Nome do país"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="ex: Brasil"
              placeholderTextColor="#9A9A9A"
              leftIcon={<Icon name="public" type="material" color="#00BFFF" />}
              errorMessage={errors.country?.message}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              containerStyle={styles.inputWrapper}
            />
          )}
        />

        {/* Campo: Orçamento */}
        <OptionContainer
          title="Faixa de Orçamento"
          options={[
            { id: "pouco", label: "Pouco" },
            { id: "medio", label: "Mediano" },
            { id: "alto", label: "Alto" },
          ]}
          onChange={(selected) => setValue("spendingLevel", selected)}
          error={errors.spendingLevel?.message}
        />

        <Button
          onPress={handleSubmit(handleSend)}
          disabled={isSubmitting}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        >
          {isSubmitting ? "Enviando..." : "ENVIAR"}
        </Button>
      </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FF",
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "bold",
    color: "#00BFFF"
  },
  form: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
  },
  inputWrapper: {
    paddingHorizontal: 0,
    marginBottom: 10,
  },
  inputText: {
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: "#F0F4F8",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  button: {
    backgroundColor: "#00BFFF",
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
