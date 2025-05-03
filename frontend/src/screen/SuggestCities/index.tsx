import { zodResolver } from "@hookform/resolvers/zod";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, Input, Text } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";
import { TRootStackParamList } from "../../routes/AppStack";
import { findPlaceByCity } from "../../services/city/find-place-by-city";
import { OptionContainer } from "../../shared/components/OptionsButton";
import { FormContainer } from "../../styles/GlobalStyles";
import * as S from "./styles";
import { suggestCitiesByDescription } from "../../services/city/suggest-cities-by-description";

const schema = z.object({
  description: z.string().min(1, "Campo obrigatório"),
  spendingLevel: z.string().min(1, "Campo obrigatório"),
});

export type SuggestCityFormData = z.infer<typeof schema>;

export const SuggestCitites = () => {
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
      spendingLevel: "",
    },
  });

  const handleSend = async (data: SuggestCityFormData) => {
    const { description, spendingLevel } = data;

    const cities = await suggestCitiesByDescription({
      description,
      spendingLevel,
    });

    navigate("PlaceList", cities);
  };

  return (
    <S.ChooseCityContainer>
      <Text h4 style={{ marginBottom: 20 }}>
        Crie seu planejamento
      </Text>
      <FormContainer>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <View>
              <Input
                value={field.value}
                label="Nome da cidade"
                onChangeText={field.onChange}
                placeholder="ex: Rio de janeiro"
                placeholderTextColor="#9A9A9A"
                renderErrorMessage
                errorMessage={errors.description?.message}
              />
            </View>
          )}
        />

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

        <Button onPress={handleSubmit(handleSend)} disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar"}
        </Button>
      </FormContainer>
    </S.ChooseCityContainer>
  );
};
