import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screen/Login";
import SignupScreen from "../screen/SignupScreen";
import { Home } from "../screen/Home";
import { ChooseCity } from "../screen/ChooseCity";

export type TRootStackParamList = {
  Home: undefined;
  Register: undefined;
  InformCity: undefined;
};

const Stack = createNativeStackNavigator<TRootStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Register" component={SignupScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="InformCity" component={ChooseCity} />
    </Stack.Navigator>
  );
};
