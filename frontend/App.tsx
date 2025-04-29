import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "@rneui/themed";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Home } from "./src/screen/Home";
import { Login } from "./src/screen/Login";
import { AuthRequiredProvider } from "./src/shared/providers/AuthRequiredProvider";
import { authStore } from "./src/shared/stores/auth/authStore";
import { theme } from "./src/styles/theme";
import { AppStack } from "./src/routes/AppStack";
import { AuthStack } from "./src/routes/AuthStack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  const isAuthenticated = authStore((store) => store.isAuthenticated);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthRequiredProvider>
            <NavigationContainer>
              {isAuthenticated ? <AppStack /> : <AuthStack />}
            </NavigationContainer>
          </AuthRequiredProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
