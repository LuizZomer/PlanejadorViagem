import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from "./src/screen/SignupScreen";
import { Login } from "./src/screen/Login";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "./src/styles/theme";
import { AuthRequiredProvider } from "./src/shared/providers/AuthRequiredProvider";
import { navigationRef } from "./src/navigation/navigationRef";
import { Home } from "./src/screen/Home";

export type TRootStackParamList = {
  Login: undefined
  Home: undefined
  Register: undefined
}

const Stack = createNativeStackNavigator();

const App = () => {
  const [isNavigationIsReady, setIsNavigationIsReady] = useState(false);
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer ref={navigationRef} onReady={() => setIsNavigationIsReady(true)} >
          <AuthRequiredProvider isReady={isNavigationIsReady}>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="Login"
            >
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={SignupScreen} />
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          </AuthRequiredProvider>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
