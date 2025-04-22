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
import { Button, Input } from "@rneui/themed";
import { FormContainer, MainContainer } from "../../styles/GlobalStyles";

const signupSchema = z.object({
  username: z.string().min(1, 'Nome de usuário é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string().min(6, 'Confirmação obrigatória'),
}).superRefine((val, ctx) => {
  if (val.password !== val.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'As senhas não coincidem',
      path: ['confirmPassword']
    })
  }
});

type TSignup = z.infer<typeof signupSchema>;

export const SignupScreen = () => {
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignup>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleRegister = (data: TSignup) => {
    console.log('Registrando:', data);
    //Chamar a nav depois
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.topImageContainer}>
        <Image source={require('../../assets/topVector.png')} style={styles.topImage} />
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
              leftIcon={<FontAwesome name="envelope" size={24} color="#9A9A9A" />}
              errorMessage={errors.email?.message}
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
          source={require('../../assets/leftVector.png')}
          style={styles.leftVectorImage}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    position: 'relative',
  },
  topImageContainer: {},
  topImage: {
    width: '100%',
    height: 140,
  },
  createAccount: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#262626',
    marginHorizontal: 50,
    marginVertical: 10,
  },
  leftVectorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  leftVectorImage: {
    width: 150,
    height: 250,
  },
});
