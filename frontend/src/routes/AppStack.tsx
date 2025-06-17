import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screen/Login";
import { Home } from "../screen/Home";
import { ChooseCity } from "../screen/ChooseCity";
import { PlacesList } from "../screen/Place";
import { Profile } from "../screen/Profile";
import { SuggestCities } from "../screen/SuggestCities";
import { CityList } from "../screen/CityList";
import { CityDetails } from "../screen/CityDetails";
import FriendsScreen from "../screen/FriendsScreen";
import OrganizationScreen from "../screen/Organization";
import OrganizationCreateScreen from "../screen/OrganizationCreate";

export type TRootStackParamList = {
  Home: undefined;
  InformCity: undefined;
  SuggestCity: undefined;
  PlaceList: IFindPlaceByCityOutput;
  Profile: undefined;
  CityList: IGetCityByDescription;
  CityDetails: { externalId: string };
  Friends: undefined;
  Organizations: undefined;
  OrganizationCreate: undefined;
};

const Stack = createNativeStackNavigator<TRootStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InformCity"
        component={ChooseCity}
        options={{ title: "Informar Cidade" }}
      />
      <Stack.Screen
        name="SuggestCity"
        component={SuggestCities}
        options={{ title: "Pedir Sugestão" }}
      />
      <Stack.Screen
        name="PlaceList"
        component={PlacesList}
        options={{ title: "Roteiro Gerado" }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Perfil" }}
      />
      <Stack.Screen
        name="CityList"
        component={CityList}
        options={{ title: "Sugestões de Cidades" }}
      />
      <Stack.Screen
        name="CityDetails"
        component={CityDetails}
        options={{ title: "Detalhes do Planejamento" }}
      />
      <Stack.Screen
        name="Friends"
        component={FriendsScreen}
        options={{ title: "Amigos" }}
      />
      <Stack.Screen
        name="Organizations"
        component={OrganizationScreen}
        options={{ title: "Organizações" }}
      />
      <Stack.Screen
        name="OrganizationCreate"
        component={OrganizationCreateScreen}
        options={{ title: "Nova Organização" }}
      />
    </Stack.Navigator>
  );
};
