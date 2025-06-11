import styled from "styled-components/native";
import { FlatList } from "react-native";

interface ITheme {
  colors: {
    background: string;
    border: string;
    text: string;
    textSecondary: string;
    primary: string;
    success: string;
    error: string;
    warning: string;
    white: string;
  };
}

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }: { theme: ITheme }) =>
    theme.colors.background};
`;

export const SearchInput = styled.TextInput`
  height: 40px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: ITheme }) => theme.colors.border};
  border-radius: 8px;
  padding-horizontal: 12px;
  margin-bottom: 16px;
  color: ${({ theme }: { theme: ITheme }) => theme.colors.text};
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: ${({ theme }: { theme: ITheme }) => theme.colors.text};
`;

export const UserItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: ITheme }) => theme.colors.border};
`;

export const RequestItem = styled.View`
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: ITheme }) => theme.colors.border};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.View`
  flex: 1;
`;

export const UserName = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }: { theme: ITheme }) => theme.colors.text};
  text-transform: capitalize;
`;

export const UserEmail = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: ITheme }) => theme.colors.textSecondary};
`;

export const AddButton = styled.TouchableOpacity`
  background-color: ${({ theme }: { theme: ITheme }) => theme.colors.primary};
  padding-horizontal: 16px;
  padding-vertical: 8px;
  border-radius: 6px;
`;

export const ActionButton = styled.TouchableOpacity`
  padding-horizontal: 16px;
  padding-vertical: 8px;
  border-radius: 6px;
  margin-left: 8px;
`;

export const AcceptButton = styled(ActionButton)`
  background-color: ${({ theme }: { theme: ITheme }) => theme.colors.success};
`;

export const RejectButton = styled(ActionButton)`
  background-color: ${({ theme }: { theme: ITheme }) => theme.colors.error};
`;

export const ButtonText = styled.Text`
  color: ${({ theme }: { theme: ITheme }) => theme.colors.white};
  font-weight: 500;
`;

export const PendingText = styled.Text`
  color: ${({ theme }: { theme: ITheme }) => theme.colors.warning};
  font-weight: 500;
  min-height: 70px;
`;

export const RequestButtons = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RequestsList = styled(FlatList)`
  max-height: 200px;
  margin-bottom: 24px;
`;

export const UsersList = styled(FlatList)`
  flex: 1;
`;
