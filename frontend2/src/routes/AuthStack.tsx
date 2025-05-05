import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screen/Login";
import { Signup } from "../screen/SingUp";

export type TAuthStackParamList = {
  Register: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<TAuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Signup} />
    </Stack.Navigator>
  );
};
