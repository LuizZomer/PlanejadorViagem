import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #fff;
  position: relative;
`;

export const MainContainer = styled.View`
  padding: 0 60px;
`;

export const FormContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TextError = styled.Text`
  color: red;
  font-size: 14px;
`;

