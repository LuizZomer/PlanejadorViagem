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

export const MemberItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 8px;
  background-color: ${({ theme }: { theme: ITheme }) =>
    theme.colors.card || "#fff"};
`;

export const MemberName = styled.Text`
  font-size: 16px;
  color: ${({ theme }: { theme: ITheme }) => theme.colors.text};
`;

export const OwnerName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  color: ${({ theme }: { theme: ITheme }) => theme.colors.text};
`;

export const EmptyMessage = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: ITheme }) => theme.colors.text};
  margin-bottom: 8px;
`;

export const PlanningItem = styled.View`
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 8px;
  background-color: ${({ theme }: { theme: ITheme }) =>
    theme.colors.card || "#fff"};
`;

export const PlanningDestination = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }: { theme: ITheme }) => theme.colors.text};
  text-transform: capitalize;
`;

export const PlanningPeriod = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: ITheme }) => theme.colors.text};
`;
