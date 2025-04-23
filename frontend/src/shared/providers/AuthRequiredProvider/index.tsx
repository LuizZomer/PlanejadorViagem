import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { TRootStackParamList } from "../../../../App"
import { verifyToken } from "../../../services/auth/verify-token"
import { decodedUser } from "../../utils/decodedUser"
import { authStore } from "../../stores/auth/authStore"
import { View } from "react-native"
import { Text } from "@rneui/base"
import { navigate } from "../../../navigation/navigationRef"



export const AuthRequiredProvider = ({children, isReady}:{children: React.ReactNode, isReady: boolean}) => {
    const setUser = authStore((store) => store.setUser)
    const [isLoading, setIsLoading] = useState(true)

      useEffect(() => {
        console.log(isReady);
        
        const verifyAuth = async () => {
            const token = await AsyncStorage.getItem("token");
        
            if (!token) {
              setIsLoading(false);
              return;
            }
        
            await verifyToken(token)
              .then(() => {
                const user = decodedUser(token);
                setUser(user);
              })
              .catch(() => {
                navigate("Login");
              })
              .finally(() => {
                setIsLoading(false);
              });
          };
        

      if(isReady)  verifyAuth();
       
      }, [isReady]);
      

    if (isLoading) {
        return (
          <View>
            <Text>Carregando...</Text>
          </View>
        );
      }
    
      return <View style={{ flex: 1 }}>{children}</View>;
}
