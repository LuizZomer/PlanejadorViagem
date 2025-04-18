import { 
  ImageBackground, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableOpacity 
} from 'react-native';
import React, { useState } from 'react';
import { Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRegister = () => {
    navigation.navigate('SignupScreen');
  };

  const handleLogin = () => {
    if (!userName.trim() || !password.trim()) {
      setError('Preencha todos os campos.');
    } else {
      setError('');
      // Aqui pode ir a lógica de login/autenticação
      console.log('Login realizado');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.topImageContainer}>
        <Image source={require('../assets/topVector.png')} style={styles.topImage} />
      </View>
      <View style={styles.appNameContainer}>
        <Text style={styles.appName}>ExploreLens</Text>
      </View>
      <View>
        <Text style={styles.SignIn}>Faça login na sua conta</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name={"user"} size={24} color="#9A9A9A" />
        <TextInput
          style={styles.TextInput}
          value={userName}
          onChangeText={setUserName}
          placeholder="Nome de usuário"
          placeholderTextColor="#9A9A9A"
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name={"lock"} size={24} color="#9A9A9A" />
        <TextInput
          style={styles.TextInput}
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          placeholderTextColor="#9A9A9A"
          secureTextEntry
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
      <TouchableOpacity style={styles.signInButtonContainer} onPress={handleLogin}>
        <LinearGradient colors={['#FAF0E6', '#00BFFF']} style={styles.linearGradient}>
          <View style={styles.buttonContent}>
            <Text style={styles.signInText}>Entrar</Text>
            <AntDesign name={"arrowright"} size={30} color={"white"} style={{ marginLeft: -20 }} />
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.footerText}>
          Não possui uma conta? <Text style={{ textDecorationLine: 'underline', color: '#00BFFF' }}>Cadastrar-se</Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.leftVectorContainer}>
        <ImageBackground source={require('../assets/leftVector.png')} style={styles.leftVectorImage} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    position: "relative"
  },
  topImageContainer: {},
  topImage: {
    width: "100%",
    height: 140,
  },
  appNameContainer: {},
  appName: {
    textAlign: 'center',
    fontSize: 60,
    fontWeight: "500",
    color: "#262626",
    marginHorizontal: 40,
    marginVertical: 5,
  },
  SignIn: {
    textAlign: 'center',
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
    marginHorizontal: 65,
    marginVertical: 10,
  },
  TextInput: {
    marginLeft: 10,
    color: "#9A9A9A",
    fontSize: 16,
    flex: 1
  },
  forgotPassword: {
    textAlign: 'right',
    fontSize: 15,
    color: "#bebebe",
    marginHorizontal: 65,
    marginTop: -5,
    paddingBottom: 0
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
    elevation: 5
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0
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
    textAlign: 'center',
    fontSize: 15,
    width: "100%",
    color: "#262626",
    marginTop: 100
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
    textAlign: 'center',
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  }
});