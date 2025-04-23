// src/navigation/navigationRef.ts
import { createNavigationContainerRef } from '@react-navigation/native';
import { TRootStackParamList } from '../../App';

export const navigationRef = createNavigationContainerRef<TRootStackParamList>();

export function navigate(name: keyof TRootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
