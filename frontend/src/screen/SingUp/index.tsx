import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Badge, Button, Input } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { z } from "zod";
import { getAllPreferences } from "../../services/preference/get-all-preferences";
import { createUser } from "../../services/user/create-user";
import { TCombinedStackParamList } from "../../shared/types/navigation/navigate";
import { FormContainer, MainContainer } from "../../styles/GlobalStyles";
import {
  Container,
  LeftVectorContainer,
  LeftVectorImage,
  PreferencesContainer,
  PreferencesFormContainer,
  SignInText,
  TopImage,
  TopImageContainer,
} from "./styles";

const signupSchema = z
  .object({
    username: z.string().min(1, "Nome de usuário é obrigatório"),
    email: z.string().min(1, "Campo obrigatório").email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
    preferences: z.array(z.string()),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
      });
    }
  });

export type TSignup = z.infer<typeof signupSchema>;

export const Signup = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<TCombinedStackParamList>>();

  const [preferencesOption, setPreferencesOption] = useState<Preference[]>([]);

  const { data: preferencesList } = useQuery({
    queryKey: ["get-preferences"],
    queryFn: async () => {
      const preferences = await getAllPreferences();

      setPreferencesOption(preferences);

      return preferences;
    },
    staleTime: 1000 * 60 * 5,
  });

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<TSignup>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      preferences: [],
    },
  });

  const handleRegister = async (data: TSignup) => {
    const { confirmPassword, preferences, ...rest } = data;

    const preferencesIdNumber = preferences.map(Number);

    await createUser({ ...rest, preferences: preferencesIdNumber }).then(() => {
      navigation.navigate("Login");
    });
  };

  const handlePreferencesRemove = (id: number) => {
    const preferences = getValues("preferences");

    const newPreferenceList = preferences.filter(
      (preferenceId) => Number(preferenceId) !== id
    );

    setValue("preferences", newPreferenceList);
  };

  const watchedPreferences = watch("preferences") ?? [];

  const selectedPreferences = useMemo(() => {
    if (!preferencesList || !watchedPreferences) return [];

    const selectedSet = new Set(watchedPreferences.map(Number));

    return preferencesList.filter(({ id }) => selectedSet.has(id));
  }, [watchedPreferences, preferencesList]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Container>
        <TopImageContainer>
          <TopImage source={require("../../shared/assets/topVector.png")} />
        </TopImageContainer>

        <View style={{ marginBottom: 20 }}>
          <SignInText>Registre-se</SignInText>
        </View>

        <FormContainer>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <View style={{ paddingHorizontal: 65 }}>
                <Input
                  label="Nome de usuário"
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Digite seu nome de usuário"
                  leftIcon={
                    <FontAwesome name="user" size={24} color="#9A9A9A" />
                  }
                  errorMessage={errors.username?.message}
                />
              </View>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <View style={{ paddingHorizontal: 65 }}>
                <Input
                  label="Email"
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Digite seu email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  leftIcon={
                    <FontAwesome name="envelope" size={24} color="#9A9A9A" />
                  }
                  errorMessage={errors.email?.message}
                />
              </View>
            )}
          />

          <PreferencesFormContainer>
            <Text>Suas preferencias</Text>
            <Controller
              name="preferences"
              control={control}
              render={({ field: { onChange, value } }) => (
                <MultiSelect
                  data={preferencesOption.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  }))}
                  labelField="label"
                  valueField="value"
                  placeholder="Selecione uma opção"
                  value={value}
                  onChange={(item) => onChange(item.map((val) => String(val)))}
                />
              )}
            />

            <PreferencesContainer>
              {selectedPreferences.map((pre) => (
                <Badge
                  key={pre.id}
                  value={`${pre.name} X`}
                  onPress={() => handlePreferencesRemove(pre.id)}
                />
              ))}
            </PreferencesContainer>
          </PreferencesFormContainer>

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <View style={{ paddingHorizontal: 65 }}>
                <Input
                  label="Senha"
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Digite sua senha"
                  secureTextEntry
                  leftIcon={
                    <FontAwesome name="lock" size={24} color="#9A9A9A" />
                  }
                  errorMessage={errors.password?.message}
                />
              </View>
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <View style={{ paddingHorizontal: 65 }}>
                <Input
                  label="Confirme a senha"
                  value={field.value ?? ""}
                  onChangeText={field.onChange}
                  placeholder="Confirme sua senha"
                  secureTextEntry
                  leftIcon={
                    <FontAwesome name="lock" size={24} color="#9A9A9A" />
                  }
                  errorMessage={errors.confirmPassword?.message}
                />
              </View>
            )}
          />
        </FormContainer>

        <MainContainer>
          <Button
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ["#FAF0E6", "#00BFFF"],
              start: { x: 0, y: 0 },
              end: { x: 1, y: 1 },
            }}
            size="lg"
            iconRight
            icon={<AntDesign name="arrowright" size={30} color="white" />}
            onPress={handleSubmit(handleRegister)}
            buttonStyle={{
              borderRadius: 25,
              paddingHorizontal: 25,
              paddingVertical: 12,
            }}
            titleStyle={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Registrar
          </Button>
        </MainContainer>

        <LeftVectorContainer>
          <LeftVectorImage
            source={require("../../shared/assets/leftVector.png")}
          />
        </LeftVectorContainer>
      </Container>
    </KeyboardAvoidingView>
  );
};
