import styled from "styled-components/native";

interface ITheme {
  colors: {
    background: string;
    border: string;
    text: string;
    primary: string;
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

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: ${({ theme }: { theme: ITheme }) => theme.colors.text};
`;

export const NameInput = styled.TextInput`
  height: 40px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: ITheme }) => theme.colors.border};
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 0 10px;
  color: ${({ theme }: { theme: ITheme }) => theme.colors.text};
`;

export const CreateButton = styled.TouchableOpacity`
  background-color: ${({ theme }: { theme: ITheme }) => theme.colors.primary};
  padding: 10px 16px;
  border-radius: 6px;
  align-items: center;
  margin-bottom: 24px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }: { theme: ITheme }) => theme.colors.white};
  font-weight: 500;
`;

export const OrgItem = styled.View`
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 12px;
  background-color: ${({ theme }: { theme: ITheme }) => theme.colors.card || "#fff"};
  elevation: 2;
`;

export const OrgName = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }: { theme: ITheme }) => theme.colors.text};
  text-transform: capitalize;
`;

export const MemberItem = styled.TouchableOpacity<{ selected: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 8px;
  background-color: ${({ selected, theme }: { selected: boolean; theme: ITheme }) =>
    selected ? theme.colors.primary + "33" : theme.colors.card || "#fff"};
`;

export const MemberName = styled.Text`
  font-size: 16px;
  color: ${({ theme }: { theme: ITheme }) => theme.colors.text};
`;
