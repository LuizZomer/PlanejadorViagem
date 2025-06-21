import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider as RNEThemeProvider } from "@rneui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import { AppStack } from "./src/routes/AppStack";
import { AuthStack } from "./src/routes/AuthStack";
import { AuthRequiredProvider } from "./src/shared/providers/AuthRequiredProvider";
import { authStore } from "./src/shared/stores/auth/authStore";
import { theme as rneTheme } from "./src/styles/theme";
import { theme as styledTheme } from "./src/shared/theme/styled";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

const App = () => {
  const isAuthenticated = authStore((store) => store.isAuthenticated);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <RNEThemeProvider theme={rneTheme}>
          <ThemeProvider theme={styledTheme}>
            <AuthRequiredProvider>
              <NavigationContainer>
                {isAuthenticated ? <AppStack /> : <AuthStack />}
              </NavigationContainer>
              <Toast />
            </AuthRequiredProvider>
          </ThemeProvider>
        </RNEThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
