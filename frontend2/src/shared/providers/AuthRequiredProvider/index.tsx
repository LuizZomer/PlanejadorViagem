import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { authStore } from "../../stores/auth/authStore";
import { View } from "react-native";
import { Text } from "@rneui/base";

export const AuthRequiredProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initializeAuth = authStore((store) => store.initializeAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const boot = async () => {
      await initializeAuth().finally(() => setIsLoading(false));
    };

    boot();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return <View style={{ flex: 1 }}>{children}</View>;
};
