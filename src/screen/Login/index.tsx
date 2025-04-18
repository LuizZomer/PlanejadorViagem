import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormContainer,
  MainContainer,
  TextError,
} from "../../styles/GlobalStyles";
import { Button, Input } from "@rneui/themed";

const loginSchema = z.object({
  username: z.string().min(1, "Nome de usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type TLogin = z.infer<typeof loginSchema>;

export const Login = () => {
  const navigation = useNavigation<any>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const handleRegister = () => {
    navigation.navigate("SignupScreen");
  };

  const handleLogin = (data: TLogin) => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.topImageContainer}>
        <Image
          source={require("../../assets/topVector.png")}
          style={styles.topImage}
        />
      </View>
      <View style={styles.appNameContainer}>
        <Text style={styles.appName}>ExploreLens</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.SignIn}>Faça login na sua conta</Text>
      </View>
      <FormContainer>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <View
              style={{
                paddingHorizontal: 65,
              }}
            >
              <Input
                leftIcon={
                  <FontAwesome name={"user"} size={24} color="#9A9A9A" />
                }
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
            <View
              style={{
                paddingHorizontal: 65,
              }}
            >
              <Input
                leftIcon={
                  <FontAwesome name={"lock"} size={24} color="#9A9A9A" />
                }
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

      <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
      <MainContainer>
        <Button
          size="lg"
          iconRight
          icon={<AntDesign name="arrowright" size={20} color="white" />}
          onPress={handleSubmit(handleLogin)}
        >
          Entrar
        </Button>
      </MainContainer>

      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.footerText}>
          Não possui uma conta?{" "}
          <Text style={{ textDecorationLine: "underline", color: "#00BFFF" }}>
            Cadastrar-se
          </Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.leftVectorContainer}>
        <ImageBackground
          source={require("../../assets/leftVector.png")}
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
  appNameContainer: {},
  appName: {
    textAlign: "center",
    fontSize: 60,
    fontWeight: "500",
    color: "#262626",
    marginHorizontal: 40,
    marginVertical: 5,
  },
  SignIn: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: "#262626",
    marginHorizontal: 50,
    marginVertical: 10,
  },
  inputContainer: {
    backgroundColor: "ffffff",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#9A9A9A",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  TextInput: {
    marginLeft: 10,
    color: "#9A9A9A",
    fontSize: 16,
    flex: 1,
  },
  forgotPassword: {
    textAlign: "right",
    fontSize: 15,
    color: "#bebebe",
    marginHorizontal: 65,
    paddingBottom: 0,
    marginBottom: 10,
    marginTop: 10,
  },
  signInButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 65,
    marginTop: 30,
  },
  linearGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
  },
  signInText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    borderColor: "#262626",
    paddingHorizontal: 40,
    paddingVertical: 5,
  },
  footerText: {
    textAlign: "center",
    fontSize: 15,
    width: "100%",
    color: "#262626",
    marginTop: 100,
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
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});
