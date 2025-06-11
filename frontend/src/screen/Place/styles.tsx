import styled from "styled-components/native";
import MapView from "react-native-maps";
import { Button } from "@rneui/themed";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
`;

export const Header = styled.View`
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  color: #333;
  margin-top: 4px;
  font-weight: 500;
`;

export const DescriptionBox = styled.View`
  background-color: #eaf2ff;
  padding: 14px;
  border-radius: 12px;
  margin-top: 12px;
  margin-bottom: 20px;
`;

export const DescriptionText = styled.Text`
  font-size: 15px;
  line-height: 22px;
  color: #333;
`;

export const Difficulty = styled.Text`
  font-weight: bold;
  margin-top: 10px;
  font-size: 14px;
  color: #444;
`;

export const PlaceCard = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
`;

export const PlaceTitle = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
  color: #222;
`;

export const PlaceDescription = styled.Text`
  font-size: 14px;
  color: #555;
`;

export const StyledMap = styled(MapView)`
  width: 100%;
  height: 300px;
  border-radius: 10px;
`;

export const MapContainer = styled.View`
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
`;

export const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const CancelButton = styled(Button).attrs({
  buttonStyle: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00BFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  titleStyle: {
    color: "#00BFFF",
    fontWeight: "bold",
  },
})``;

export const SaveButton = styled(Button).attrs({
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: "#00BFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  titleStyle: {
    color: "#fff",
    fontWeight: "bold",
  },
})``;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #005fa3;
  margin-top: 18px;
  margin-bottom: 8px;
`;

export const ActivityContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const ActivityImage = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  margin-right: 12px;
  background-color: #eaeaea;
`;

export const ActivityTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #222;
  margin-bottom: 2px;
`;

export const ActivityDescription = styled.Text`
  font-size: 14px;
  color: #555;
`;

export const ActivityTime = styled.Text`
  font-size: 13px;
  color: #888;
  margin-left: 2px;
`;
