import styled from "styled-components/native";

interface IActiveProps {
  active: boolean;
}

export const Screen = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const TopBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #00bfff;
  padding: 16px;
`;

export const TopBarTitle = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const TopBarIcons = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ScrollContent = styled.ScrollView`
  flex: 1;
  padding: 16px;
`;

export const OptionButtons = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

export const OptionButton = styled.TouchableOpacity<IActiveProps>`
  flex: 1;
  padding: 12px;
  background-color: ${({ active }: IActiveProps) =>
    active ? "#00BFFF" : "#fff"};
  border-radius: 8px;
  margin-right: 8px;
`;

export const OptionText = styled.Text<IActiveProps>`
  color: ${({ active }: IActiveProps) => (active ? "#fff" : "#00BFFF")};
  text-align: center;
  font-weight: bold;
`;

export const TabView = styled.View`
  margin-bottom: 16px;
`;

export const CardsContainer = styled.View`
  gap: 16px;
`;

export const PlanCard = styled.View`
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  elevation: 2;
`;

export const PlanTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

export const PlanDescription = styled.Text`
  color: #666;
  margin-bottom: 12px;
`;

export const PlanInfo = styled.View`
  gap: 4px;
`;

export const PlanInfoText = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const Loading = styled.Text`
  text-align: center;
  color: #666;
  margin-top: 16px;
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: #666;
  margin-top: 16px;
`;
