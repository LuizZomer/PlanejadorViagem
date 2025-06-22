import React, { useEffect, useRef } from "react";
import { Animated, Text } from "react-native";
import { LoadingContainer } from "./styles";

export const PlanLoading = () => {
  const translateYAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateYAnim, {
          toValue: -10,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateYAnim]);

  return (
    <LoadingContainer>
      <Animated.Image
        source={require("../../assets/airplane.png")}
        style={{
          width: 100,
          height: 100,
          transform: [{ translateY: translateYAnim }],
        }}
      />
      <Text style={{ color: "black", fontSize: 16 }}>
        Criando planejamento...
      </Text>
    </LoadingContainer>
  );
};
