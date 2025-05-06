import styled from "styled-components/native";
import { Button } from "@rneui/themed";

export const ChooseCityContainer = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
`;

export const Header = styled.View`
  margin-bottom: 20px;
`;

export const DescriptionText = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
`;

export const FormWrapper = styled.View`
  gap: 12px;
`;

export const StyledButton = styled(Button).attrs({
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: "#00BFFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  titleStyle: {
    color: "#fff",
    fontWeight: "bold",
  },
})``;
