import { Button, Input, Text } from "@rneui/themed";
import * as S from "./styles";
import { z } from "zod";
import { FormContainer } from "../../styles/GlobalStyles";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { View } from "react-native";
import { OptionContainer } from "../../shared/components/OptionsButton";
import { findPlaceByCity } from "../../services/city/find-place-by-city";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TRootStackParamList } from "../../routes/AppStack";

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
    getValues,
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
    <S.ChooseCityContainer>
      <Text h4 style={{ marginBottom: 20 }}>
        Crie seu planejamento
      </Text>
      <FormContainer>
        <Controller
          name="city"
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
                errorMessage={errors.city?.message}
              />
            </View>
          )}
        />

        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <View>
              <Input
                value={field.value}
                label="Nome do pais"
                onChangeText={field.onChange}
                placeholder="ex: Brasil"
                placeholderTextColor="#9A9A9A"
                renderErrorMessage
                errorMessage={errors.country?.message}
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
