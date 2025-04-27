import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screen/Login";

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
