import { Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import { TextError } from "../../../styles/GlobalStyles";
import * as S from "./styles";

interface OptionItem<T> {
  label: string;
  id: T;
}

interface IOptionsContainer<T extends string> {
  options: OptionItem<T>[];
  title: string;
  onChange: (selected: T) => void;
  defaultValue: T;
  error?: string;
}

export function OptionContainer<T extends string>({
  options,
  onChange,
  title,
  error,
  defaultValue,
}: IOptionsContainer<T>) {
  const [selected, setSelected] = useState(defaultValue);

  const handleClick = (id: T) => {
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
}

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
