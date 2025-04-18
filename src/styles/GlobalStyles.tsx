import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #fff;
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

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid #9a9a9a;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 65px;
`;

export const TextInput = styled.TextInput`
  margin-left: 10px;
  color: #9a9a9a;
  font-size: 16px;
  flex: 1;
`;

export const ForgotPassword = styled.Text`
  text-align: right;
  font-size: 15px;
  color: #bebebe;
  margin: -5px 65px 0 65px;
`;

export const SignInButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 30px 65px 0 65px;
`;

export const LinearButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px 60px;
`;

export const SignInTextButton = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: bold;
  padding: 5px 40px;
`;

export const RegisterTouchable = styled.TouchableOpacity``;

export const RegisterText = styled.Text`
  text-align: center;
  font-size: 15px;
  width: 100%;
  color: #262626;
  margin-top: 100px;
`;

export const RegisterLink = styled.Text`
  text-decoration: underline;
  color: #00bfff;
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

export const ErrorText = styled.Text`
  text-align: center;
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;
