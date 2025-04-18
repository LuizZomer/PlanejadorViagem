import {
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React, { useState } from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import { LinearGradient } from 'expo-linear-gradient';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import { useNavigation } from '@react-navigation/native';
  import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
  
  type RootStackParamList = {
    SignupScreen: undefined;
    // Adicione outras telas aqui se necessário
  };
  
  const SignupScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfPassword] = useState('');
  
    const handleRegister = () => {
      navigation.navigate('SignupScreen'); // Navega para a mesma tela, talvez você queira 'LoginScreen' ou 'HomeScreen'
    };
  
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.topImageContainer}>
          <Image source={require('../assets/topVector.png')} style={styles.topImage} />
        </View>
  
        <Text style={styles.createAccount}>Registre-se</Text>
  
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={24} color="#9A9A9A" />
          <TextInput
            style={styles.TextInput}
            value={userName}
            onFocus={() => setUserName('')}
            onChangeText={setUserName}
            placeholder="Nome de usuário"
            placeholderTextColor="#9A9A9A"
          />
        </View>
  
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={24} color="#9A9A9A" />
          <TextInput
            style={styles.TextInput}
            value={email}
            onFocus={() => setEmail('')}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#9A9A9A"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
  
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={24} color="#9A9A9A" />
          <TextInput
            style={styles.TextInput}
            value={password}
            onFocus={() => setPassword('')}
            onChangeText={setPassword}
            placeholder="Senha"
            placeholderTextColor="#9A9A9A"
            secureTextEntry
          />
        </View>
  
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={24} color="#9A9A9A" />
          <TextInput
            style={styles.TextInput}
            value={confirmpassword}
            onFocus={() => setConfPassword('')}
            onChangeText={setConfPassword}
            placeholder="Confirme sua senha"
            placeholderTextColor="#9A9A9A"
            secureTextEntry
          />
        </View>
  
        <View style={styles.leftVectorContainer}>
          <ImageBackground source={require('../assets/leftVector.png')} style={styles.leftVectorImage} />
        </View>
  
        <TouchableOpacity onPress={handleRegister}>
          <View style={styles.registerButton}>
            <LinearGradient colors={['#FAF0E6', '#00BFFF']} style={styles.linearGradient}>
              <View style={styles.buttonContent}>
                <Text style={styles.signInText}>Registrar</Text>
                <AntDesign name="arrowright" size={30} color="white" style={{ marginLeft: -20 }} />
              </View>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  };
  
  export default SignupScreen;
  
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
    inputContainer: {
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#9A9A9A',
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 65,
      marginVertical: 10,
    },
    TextInput: {
      marginLeft: 10,
      color: '#9A9A9A',
      fontSize: 16,
      flex: 1,
    },
    registerButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 65,
      marginTop: 30,
    },
    linearGradient: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 60,
      paddingVertical: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 5,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    signInText: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
      paddingHorizontal: 40,
      paddingVertical: 5,
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
  