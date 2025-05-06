import { zodResolver } from "@hookform/resolvers/zod";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Input, Text } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";
import { TRootStackParamList } from "../../routes/AppStack";
import { suggestCitiesByDescription } from "../../services/city/suggest-cities-by-description";
import { OptionContainer } from "../../shared/components/OptionsButton";
import { FormContainer } from "../../styles/GlobalStyles";
import * as S from "./styles";

const schema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Campo obrigatório")
    .max(200, "Maximo de 200 caracteres"),
  spendingLevel: z.string().min(1, "Campo obrigatório"),
});

export type SuggestCityFormData = z.infer<typeof schema>;

export const SuggestCities = () => {
  const { navigate } = useNavigation<NavigationProp<TRootStackParamList>>();

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
    },
  });

  const handleSend = async (data: SuggestCityFormData) => {
    const { description, spendingLevel } = data;
    const cities = await suggestCitiesByDescription({
      description,
      spendingLevel,
    });
    navigate("CityList", cities);
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

          <S.StyledButton onPress={handleSubmit(handleSend)} disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar"}
          </S.StyledButton>
        </S.FormWrapper>
      </FormContainer>
    </S.ChooseCityContainer>
  );
};
