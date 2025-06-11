import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Text, Button, Input, Icon } from "@rneui/themed";
import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { OptionContainer } from "../../shared/components/OptionsButton";
import { findPlaceByCity } from "../../services/city/find-place-by-city";
import { TRootStackParamList } from "../../routes/AppStack";
import { FormContainer } from "../../styles/GlobalStyles";
import * as S from "./styles";

const schema = z.object({
  country: z.string().min(1, "Campo obrigatório"),
  destination: z.string().min(1, "Campo obrigatório"),
  spendingLevel: z.enum(["Muito", "Medio", "pouco"], {
    required_error: "Campo obrigatório",
  }),
  startDate: z.string().min(1, "Campo obrigatório"),
  endDate: z.string().min(1, "Campo obrigatório"),
  hosting: z.boolean(),
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
      country: "",
      destination: "",
      spendingLevel: "Medio",
      startDate: "",
      endDate: "",
      hosting: false,
    },
  });

  const handleSend = async (data: TFormData) => {
    const { country, destination, spendingLevel, startDate, endDate, hosting } =
      data;
    const cities = await findPlaceByCity({
      destination,
      country,
      spendingLevel,
      startDate,
      endDate,
      hosting,
    });
    navigate("PlaceList", cities);
  };

  return (
    <ScrollView style={styles.container}>
      <Text h4 style={styles.title}>
        Crie seu planejamento
      </Text>

      <FormContainer style={styles.form}>
        {/* Campo: Destino */}
        <Controller
          name="destination"
          control={control}
          render={({ field }) => (
            <Input
              label="Destino"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="ex: Rio de Janeiro"
              placeholderTextColor="#9A9A9A"
              leftIcon={
                <Icon name="location-city" type="material" color="#00BFFF" />
              }
              errorMessage={errors.destination?.message}
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

        {/* Campo: Nível de Gasto */}
        <OptionContainer
          title="Nível de Gasto"
          options={[
            { id: "pouco", label: "Pouco" },
            { id: "Medio", label: "Médio" },
            { id: "Muito", label: "Muito" },
          ]}
          defaultValue="Medio"
          onChange={(selected) =>
            setValue("spendingLevel", selected as "Muito" | "Medio" | "pouco")
          }
          error={errors.spendingLevel?.message}
        />

        {/* Campo: Data de Início */}
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <Input
              label="Data de Início"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="ex: 2025-05-12"
              placeholderTextColor="#9A9A9A"
              leftIcon={
                <Icon name="calendar-today" type="material" color="#00BFFF" />
              }
              errorMessage={errors.startDate?.message}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              containerStyle={styles.inputWrapper}
            />
          )}
        />

        {/* Campo: Data de Fim */}
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <Input
              label="Data de Fim"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="ex: 2025-05-15"
              placeholderTextColor="#9A9A9A"
              leftIcon={<Icon name="event" type="material" color="#00BFFF" />}
              errorMessage={errors.endDate?.message}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              containerStyle={styles.inputWrapper}
            />
          )}
        />

        {/* Campo: Hospedagem */}
        <Controller
          name="hosting"
          control={control}
          render={({ field }) => (
            <OptionContainer
              title="Precisa de Hospedagem?"
              options={[
                { id: "true", label: "Sim" },
                { id: "false", label: "Não" },
              ]}
              defaultValue="false"
              onChange={(selected) => setValue("hosting", selected === "true")}
              error={errors.hosting?.message}
            />
          )}
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
    </ScrollView>
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
    color: "#00BFFF",
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
