import { useState } from "react";
import { View } from "react-native";
import * as S from "./styles";
import { Text } from "@rneui/themed";
import { TextError } from "../../../styles/GlobalStyles";

interface IOptionsContainer {
  options: {
    label: string;
    id: string;
  }[];
  title: string;
  onChange: (selected: string) => void;
  error: string | undefined;
}

export const OptionContainer = ({
  options,
  onChange,
  title,
  error,
}: IOptionsContainer) => {
  const [selected, setSelected] = useState(options[0].id);

  const handleClick = (id: string) => {
    setSelected(id);

    onChange(id);
  };

  return (
    <S.OptionsButtonContainer>
      <S.Label>{title}</S.Label>
      <S.ButtonContainer>
        {options.map(({ id, label }) => (
          <OptionButton
            id={id}
            isSelected={selected === id}
            onPress={() => handleClick(id)}
            key={id}
          >
            {label}
          </OptionButton>
        ))}
      </S.ButtonContainer>
      {error && <TextError>{error}</TextError>}
      <TextError></TextError>
    </S.OptionsButtonContainer>
  );
};

interface IButtonOption {
  children: string;
  isSelected: boolean;
  onPress: VoidFunction;
  id: string;
}

export const OptionButton = ({
  children,
  isSelected,
  onPress,
  id,
}: IButtonOption) => {
  return (
    <S.OptionButton $isSelected={isSelected} onPress={() => onPress()} id={id}>
      <Text style={{ color: "white" }}>{children}</Text>
    </S.OptionButton>
  );
};
