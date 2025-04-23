import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Button, Input } from "@rneui/themed";
import {
  FormContainer,
  MainContainer,
} from "../../styles/GlobalStyles";
import {
  Container,
  TopImageContainer,
  TopImage,
  AppName,
  AppNameContainer,
  SignInText,
/*   ForgotPassword, */
  FooterText,
  LeftVectorContainer,
  LeftVectorImage,
} from "./styles";
import axios from "axios";
import { Alert } from "react-native";
import { login } from "../../services/auth/login";
import { useStore } from "zustand";
import { authStore } from "../../shared/stores/auth/authStore";
import { TRootStackParamList } from "../../../App";

const loginSchema = z.object({
  username: z.string().min(3, "Nome de usuário é obrigatório"),
  password: z.string().min(6, "Senha é obrigatória"),
});

export type TLogin = z.infer<typeof loginSchema>;

export const Login = () => {
  const navigation = useNavigation<NavigationProp<TRootStackParamList>>();
  const storeLogin = authStore((store) => store.login)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleLogin = async(data: TLogin) => {
    
    await login(data).then((token) => {      
      storeLogin(token)
      navigation.navigate("Home");
    })
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Container>
        <TopImageContainer>
          <TopImage source={require("../../shared/assets/topVector.png")} />
        </TopImageContainer>

        <AppNameContainer>
          <AppName>ExploreLens</AppName>
        </AppNameContainer>

        <View style={{ marginBottom: 20 }}>
          <SignInText>Faça login na sua conta</SignInText>
        </View>

        <FormContainer>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <View style={{ paddingHorizontal: 65 }}>
                <Input
                  leftIcon={<FontAwesome name="user" size={24} color="#9A9A9A" />}
                  value={field.value}
                  label="Nome de usuário"
                  onChangeText={field.onChange}
                  placeholder="Insira o nome do usuário"
                  placeholderTextColor="#9A9A9A"
                  secureTextEntry
                  renderErrorMessage
                  errorMessage={errors.username?.message}
                />
              </View>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <View style={{ paddingHorizontal: 65 }}>
                <Input
                  leftIcon={<FontAwesome name="lock" size={24} color="#9A9A9A" />}
                  value={field.value}
                  label="Senha"
                  onChangeText={field.onChange}
                  placeholder="Senha"
                  placeholderTextColor="#9A9A9A"
                  secureTextEntry
                  renderErrorMessage
                  errorMessage={errors.password?.message}
                />
              </View>
            )}
          />
        </FormContainer>

       {/*  <ForgotPassword>Esqueceu sua senha?</ForgotPassword> */}

        <MainContainer>
          <Button
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#FAF0E6', '#00BFFF'],
              start: { x: 0, y: 0 },
              end: { x: 1, y: 1 },
            }}
            size="lg"
            iconRight
            icon={<AntDesign name="arrowright" size={30} color="white" />}
            onPress={handleSubmit(handleLogin)}
            buttonStyle={{
              borderRadius: 25,
              paddingHorizontal: 25,
              paddingVertical: 12,
            }}
            titleStyle={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Entrar
          </Button>
        </MainContainer>

        <View style={{ marginTop: 100, alignItems: "center" }}>
          <Text style={{ fontSize: 15, color: "#262626" }}>
            Não possui uma conta?{" "}
            <Text
              style={{ textDecorationLine: "underline", color: "#00BFFF" }}
              onPress={handleRegister}
            >
              Cadastrar-se
            </Text>
          </Text>
        </View>


        <LeftVectorContainer>
          <LeftVectorImage source={require("../../shared/assets/leftVector.png")} />
        </LeftVectorContainer>
      </Container>
    </KeyboardAvoidingView>
  );
};
