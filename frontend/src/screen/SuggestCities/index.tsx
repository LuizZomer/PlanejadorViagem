import { zodResolver } from "@hookform/resolvers/zod";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Icon, Input, Text } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { TRootStackParamList } from "../../routes/AppStack";
import { suggestCitiesByDescription } from "../../services/plan/suggest-cities-by-description";
import { OptionContainer } from "../../shared/components/OptionsButton";
import { FormContainer } from "../../styles/GlobalStyles";
import * as S from "./styles";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const schema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Campo obrigatório")
    .max(200, "Maximo de 200 caracteres"),
  spendingLevel: z.string().min(1, "Campo obrigatório"),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  hosting: z.boolean(),
});

export type SuggestCityFormData = z.infer<typeof schema>;

const formatDate = (date: Date) => date.toISOString().split("T")[0];

export const SuggestCities = () => {
  const { navigate } = useNavigation<NavigationProp<TRootStackParamList>>();
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SuggestCityFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      spendingLevel: "medio",
      endDate: "",
      startDate: "",
      hosting: false,
    },
  });

  const handleSend = async (data: SuggestCityFormData) => {
    const { description, spendingLevel } = data;
    const cities = await suggestCitiesByDescription({
      description,
      spendingLevel,
    });
    navigate("CityList", { cityList: cities, formData: data });
  };

  return (
    <S.ChooseCityContainer>
      <S.Header>
        <Text h4 style={{ color: "#00BFFF", marginBottom: 20 }}>
          Passe a descrição do seu planejamento
        </Text>
      </S.Header>
      <FormContainer>
        <S.FormWrapper>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                value={field.value}
                label="Nome da cidade"
                onChangeText={field.onChange}
                placeholder="Ex: Gostaria de uma cidade com o clima frio no sul do brasil"
                placeholderTextColor="#9A9A9A"
                multiline
                numberOfLines={5}
                renderErrorMessage
                errorMessage={errors.description?.message}
              />
            )}
          />

          <OptionContainer
            title="Faixa de Orçamento"
            defaultValue="medio"
            options={[
              { id: "pouco", label: "Pouco" },
              { id: "medio", label: "Mediano" },
              { id: "alto", label: "Alto" },
            ]}
            onChange={(selected) => setValue("spendingLevel", selected)}
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

          <S.StyledButton
            onPress={handleSubmit(handleSend)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </S.StyledButton>
        </S.FormWrapper>
      </FormContainer>
    </S.ChooseCityContainer>
  );
};

const styles = StyleSheet.create({
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
});
