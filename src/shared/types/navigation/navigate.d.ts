import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TRootStackParamList } from "../../../routes/AppStack";
import { TAuthStackParamList } from "../../../routes/AuthStack";

export type NavigationRoutesProp =
  NativeStackNavigationProp<TRootStackParamList>;

export type TCombinedStackParamList = TRootStackParamList & TAuthStackParamList;
