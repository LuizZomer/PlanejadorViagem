// styles.tsx
import styled from "styled-components/native";
import MapView from "react-native-maps";
import { Button } from "@rneui/themed";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #00BFFF;
  margin-bottom: 6px;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin-bottom: 16px;
`;

export const Card = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
`;

export const CityName = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
  color: #00BFFF;
`;

export const CountryText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-bottom: 8px;
`;

export const DescriptionText = styled.Text`
  font-size: 15px;
  color: #444;
  margin-bottom: 12px;
`;

export const PlaceCard = styled.View`
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
`;

export const PlaceTitle = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
  color: #00BFFF;
`;

export const PlaceDescription = styled.Text`
  font-size: 14px;
  color: #555;
`;

export const StyledMap = styled(MapView)`
  width: 100%;
  height: 300px;
  margin-top: 10px;
  border-radius: 10px;
`;

export const SaveButton = styled(Button).attrs({
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: "#00BFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  titleStyle: {
    color: "#fff",
    fontWeight: "bold",
  },
})``;

export const CancelButton = styled(Button).attrs({
  buttonStyle: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00BFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  titleStyle: {
    color: "#00BFFF",
    fontWeight: "bold",
  },
})``;

export const Spacer = styled.View`
  height: 16px;
`;
