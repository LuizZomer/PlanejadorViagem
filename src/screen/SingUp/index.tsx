import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Input } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { z } from "zod";
import { TCombinedStackParamList } from "../../shared/types/navigation/navigate";
import { FormContainer, MainContainer } from "../../styles/GlobalStyles";
import { createUser } from "../../services/user/create-user";
import { Login } from "../Login";

const signupSchema = z
  .object({
    username: z.string().min(1, "Nome de usuário é obrigatório"),
    email: z.string().min(1, "Campo obrigatório").email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignup>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async (data: TSignup) => {
    console.log("Registrando:", data);
    const { confirmPassword, ...rest } = data;

    await createUser(rest).then(() => {
      navigation.replace("Login");
    });
  };

  const inputCommonProps = {
    inputStyle: { paddingHorizontal: 10, paddingVertical: 8 },
    inputContainerStyle: { paddingHorizontal: 4 },
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.topImageContainer}>
        <Image
          source={require("../../shared/assets/topVector.png")}
          style={styles.topImage}
        />
      </View>

      <Text style={styles.createAccount}>Registre-se</Text>

      <FormContainer>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              label="Nome de usuário"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Digite seu nome de usuário"
              leftIcon={<FontAwesome name="user" size={24} color="#9A9A9A" />}
              errorMessage={errors.username?.message}
              {...inputCommonProps}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              label="Email"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Digite seu email:"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={
                <FontAwesome name="envelope" size={24} color="#9A9A9A" />
              }
              errorMessage={errors.email?.message}
              {...inputCommonProps}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              label="Senha"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Digite sua senha:"
              secureTextEntry
              leftIcon={<FontAwesome name="lock" size={24} color="#9A9A9A" />}
              errorMessage={errors.password?.message}
              {...inputCommonProps}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input
              label="Confirme a senha"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Confirme sua senha:"
              secureTextEntry
              leftIcon={<FontAwesome name="lock" size={24} color="#9A9A9A" />}
              errorMessage={errors.confirmPassword?.message}
              {...inputCommonProps}
            />
          )}
        />
      </FormContainer>

      <MainContainer>
        <Button
          size="lg"
          iconRight
          icon={<AntDesign name="arrowright" size={20} color="white" />}
          onPress={handleSubmit(handleRegister)}
        >
          Registrar
        </Button>
      </MainContainer>

      <View style={styles.leftVectorContainer}>
        <ImageBackground
          source={require("../../shared/assets/leftVector.png")}
          style={styles.leftVectorImage}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    position: "relative",
  },
  topImageContainer: {},
  topImage: {
    width: "100%",
    height: 140,
  },
  createAccount: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#262626",
    marginHorizontal: 50,
    marginVertical: 10,
  },
  leftVectorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  leftVectorImage: {
    width: 150,
    height: 250,
  },
});
