import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Text, Button, Input, Icon } from "@rneui/themed";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TRootStackParamList } from "../../routes/AppStack";
import { OptionContainer } from "../../shared/components/OptionsButton";
import { findPlaceByCity } from "../../services/plan/find-place-by-city";
import { FormContainer } from "../../styles/GlobalStyles";
import { PlanLoading } from "../../shared/components/Loading/PlanLoading";

const schema = z.object({
  country: z.string().min(1),
  destination: z.string().min(1),
  spendingLevel: z.enum(["Muito", "Medio", "pouco"]),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  hosting: z.boolean(),
});

type TFormData = z.infer<typeof schema>;

export const ChooseCity = () => {
  const { navigate } = useNavigation<NavigationProp<TRootStackParamList>>();
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

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
    const cities = await findPlaceByCity(data);
    navigate("PlaceList", cities);
  };

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  return (
    <>
      {isSubmitting && <PlanLoading />}
      {!isSubmitting && (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <Text h4 style={styles.title}>
              Crie seu planejamento
            </Text>
            <FormContainer style={styles.form}>
              <Controller
                name="destination"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Destino"
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="ex: Rio de Janeiro"
                    leftIcon={
                      <Icon
                        name="location-city"
                        type="material"
                        color="#00BFFF"
                      />
                    }
                    errorMessage={errors.destination?.message}
                    inputStyle={styles.inputText}
                    inputContainerStyle={styles.inputContainer}
                    containerStyle={styles.inputWrapper}
                  />
                )}
              />
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Nome do país"
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="ex: Brasil"
                    leftIcon={
                      <Icon name="public" type="material" color="#00BFFF" />
                    }
                    errorMessage={errors.country?.message}
                    inputStyle={styles.inputText}
                    inputContainerStyle={styles.inputContainer}
                    containerStyle={styles.inputWrapper}
                  />
                )}
              />
              <OptionContainer
                title="Nível de Gasto"
                options={[
                  { id: "pouco", label: "Pouco" },
                  { id: "Medio", label: "Médio" },
                  { id: "Muito", label: "Muito" },
                ]}
                defaultValue="Medio"
                onChange={(selected) =>
                  setValue(
                    "spendingLevel",
                    selected as "Muito" | "Medio" | "pouco"
                  )
                }
                error={errors.spendingLevel?.message}
              />
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      label="Data de Início"
                      value={field.value}
                      onChangeText={field.onChange}
                      placeholder="ex: 2025-06-17"
                      onFocus={() => setStartDatePickerVisible(true)}
                      errorMessage={errors.startDate?.message}
                      inputStyle={styles.inputText}
                      inputContainerStyle={styles.inputContainer}
                      containerStyle={styles.inputWrapper}
                      leftIcon={
                        <TouchableOpacity
                          onPress={() => setStartDatePickerVisible(true)}
                        >
                          <Icon
                            name="calendar-today"
                            type="material"
                            color="#00BFFF"
                          />
                        </TouchableOpacity>
                      }
                    />
                    <DateTimePickerModal
                      isVisible={isStartDatePickerVisible}
                      mode="date"
                      onConfirm={(date) => {
                        setValue("startDate", formatDate(date), {
                          shouldValidate: true,
                        });
                        setStartDatePickerVisible(false);
                      }}
                      onCancel={() => setStartDatePickerVisible(false)}
                    />
                  </>
                )}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      label="Data de Fim"
                      value={field.value}
                      onChangeText={field.onChange}
                      placeholder="ex: 2025-06-20"
                      onFocus={() => setEndDatePickerVisible(true)}
                      errorMessage={errors.endDate?.message}
                      inputStyle={styles.inputText}
                      inputContainerStyle={styles.inputContainer}
                      containerStyle={styles.inputWrapper}
                      leftIcon={
                        <TouchableOpacity
                          onPress={() => setEndDatePickerVisible(true)}
                        >
                          <Icon name="event" type="material" color="#00BFFF" />
                        </TouchableOpacity>
                      }
                    />
                    <DateTimePickerModal
                      isVisible={isEndDatePickerVisible}
                      mode="date"
                      onConfirm={(date) => {
                        setValue("endDate", formatDate(date), {
                          shouldValidate: true,
                        });
                        setEndDatePickerVisible(false);
                      }}
                      onCancel={() => setEndDatePickerVisible(false)}
                    />
                  </>
                )}
              />
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
                    onChange={(selected) =>
                      setValue("hosting", selected === "true")
                    }
                    error={errors.hosting?.message}
                  />
                )}
              />
            </FormContainer>
          </ScrollView>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={handleSubmit(handleSend)}
              disabled={isSubmitting}
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
            >
              {isSubmitting ? "Enviando..." : "ENVIAR"}
            </Button>
          </View>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
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
  buttonWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#F5F9FF",
  },
  button: {
    backgroundColor: "#00BFFF",
    borderRadius: 10,
    paddingVertical: 14,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
