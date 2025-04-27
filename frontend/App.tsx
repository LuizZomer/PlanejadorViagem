import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "@rneui/themed";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Home } from "./src/screen/Home";
import { Login } from "./src/screen/Login";
import SignupScreen from "./src/screen/SignupScreen";
import { AuthRequiredProvider } from "./src/shared/providers/AuthRequiredProvider";
import { authStore } from "./src/shared/stores/auth/authStore";
import { theme } from "./src/styles/theme";
import { AppStack } from "./src/routes/AppStack";
import { AuthStack } from "./src/routes/AuthStack";

const App = () => {
  const isAuthenticated = authStore((store) => store.isAuthenticated);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <AuthRequiredProvider>
          <NavigationContainer>
            {isAuthenticated ? <AppStack /> : <AuthStack />}
          </NavigationContainer>
        </AuthRequiredProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
