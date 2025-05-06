import styled from "styled-components/native";

export const Screen = styled.View`
  flex: 1;
  background-color: #f0f4f8;
`;

export const TopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #00bfff;
  padding-vertical: 14px;
  padding-horizontal: 20px;
  elevation: 4;
`;

export const TopBarTitle = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

export const ScrollContent = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    padding: 20,
    paddingBottom: 40,
  },
}))``;

export const OptionButtons = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
  background-color: #fff;
`;

interface ActiveProp {
  active?: boolean;
}

export const OptionButton = styled.TouchableOpacity<ActiveProp>`
  padding-vertical: 14px;
  padding-horizontal: 24px;
  border-radius: 12px;
  background-color: ${(props) => (props.active ? "#00BFFF" : "#e0e0e0")};
`;

export const OptionText = styled.Text<ActiveProp>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.active ? "#fff" : "#333")};
`;

export const TabView = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 30px;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 6px;
  elevation: 2;
`;

export const Loading = styled.Text`
  text-align: center;
  margin-vertical: 20px;
  color: #555;
`;

export const CardsContainer = styled.View`
  flex-direction: column;
  gap: 12px;
`;

export const Card = styled.View`
  width: 100%;
  min-height: 140px;
  border-radius: 10px;
  padding: 16px;
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
  elevation: 3;
`;

export const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #00bfff;
`;

export const CardCountry = styled.Text`
  font-weight: 600;
  margin-top: 5px;
  color: #444;
`;

export const CardDescription = styled.Text`
  color: #666;
  margin-top: 4px;
`;

export const Input = styled.TextInput`
  background-color: #fff;
  border-radius: 10px;
  padding-horizontal: 16px;
  padding-vertical: 12px;
  font-size: 16px;
  border-width: 1px;
  border-color: #ccc;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-opacity: 0.04;
  shadow-offset: 0px 1px;
  shadow-radius: 3px;
  elevation: 2;
`;

export const Header = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const TabContainer = styled.View`
  padding: 10px;
`;
