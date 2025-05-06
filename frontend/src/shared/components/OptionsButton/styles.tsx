import styled from "styled-components/native";

export const Label = styled.Text`
  font-size: 16px;
  color: #999798;
  font-weight: 700;
`;

export const OptionsButtonContainer = styled.View`
  display: flex;
  gap: 10px;
`;

export const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: "100%";
  /* border: 1px solid black; */
`;

export const OptionButton = styled.Pressable<{ $isSelected: boolean }>`
  flex-shrink: 1;
  flex-grow: 1;
  background-color: ${({ $isSelected }: { $isSelected: boolean }) =>
    $isSelected ? "#00BFFF" : "gray"};
  padding: 10px;
  border-radius: 8px;
  align-items: center;
`;
