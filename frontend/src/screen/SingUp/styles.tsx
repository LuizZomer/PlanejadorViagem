import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
  position: relative;
`;

export const TopImageContainer = styled.View``;

export const TopImage = styled.Image`
  width: 100%;
  height: 140px;
`;

export const AppNameContainer = styled.View``;

export const AppName = styled.Text`
  text-align: center;
  font-size: 60px;
  font-weight: 500;
  color: #262626;
  margin: 5px 40px;
`;

export const SignInText = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #262626;
  margin: 10px 50px;
`;

/*   export const ForgotPassword = styled.Text`
    text-align: right;
    font-size: 15px;
    color: #bebebe;
    margin: 10px 60px 10px 65px;
  `; */

export const PreferencesFormContainer = styled.View`
  display: flex;
  gap: 10px;
  padding: 0 70px;
`;

export const PreferencesContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 3px;
  flex-wrap: wrap;
  width: 100%;
`;

export const FooterText = styled.Text`
  text-align: center;
  font-size: 15px;
  width: 100%;
  color: #262626;
  margin-top: 100px;
`;

export const LeftVectorContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const LeftVectorImage = styled.Image`
  width: 150px;
  height: 250px;
`;
