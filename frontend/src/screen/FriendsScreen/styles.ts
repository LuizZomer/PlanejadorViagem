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
    card?: string;
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
  margin-bottom: 16px;
  color: ${({ theme }: { theme: ITheme }) => theme.colors.text};
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: ${({ theme }: { theme: ITheme }) => theme.colors.text};
`;

const Card = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 12px;
  background-color: ${({ theme }: { theme: ITheme }) =>
    theme.colors.card || "#fff"};
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 3px;
`;

export const UserItem = styled(Card)``;

export const RequestItem = styled(Card)``;

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
  padding: 8px 16px;
  border-radius: 6px;
`;

export const ActionButton = styled.TouchableOpacity`
  padding: 8px 16px;
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

export const FriendsList = styled(FlatList)`
  max-height: 220px;
  margin-bottom: 24px;
`;

export const UsersList = styled(FlatList)`
  flex: 1;
`;
