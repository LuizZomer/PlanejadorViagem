import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screen/Login";
import { Home } from "../screen/Home";
import { ChooseCity } from "../screen/ChooseCity";
import { PlacesList } from "../screen/Place";
import { Profile } from "../screen/Profile";

export type TRootStackParamList = {
  Home: undefined;
  InformCity: undefined;
  PlaceList: IFindPlaceByCityOutput;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<TRootStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator
      // screenOptions={{  }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="InformCity" component={ChooseCity} />
      <Stack.Screen name="PlaceList" component={PlacesList} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
