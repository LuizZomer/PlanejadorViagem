import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screen/Login";
import { Home } from "../screen/Home";
import { ChooseCity } from "../screen/ChooseCity";
import { PlacesList } from "../screen/Place";
import { SignupScreen } from "../screen/SingUp";

export type TRootStackParamList = {
  Home: undefined;
  Register: undefined;
  InformCity: undefined;
  PlaceList: IFindPlaceByCityOutput;
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
      <Stack.Screen name="PlaceList" component={PlacesList} />
    </Stack.Navigator>
  );
};
