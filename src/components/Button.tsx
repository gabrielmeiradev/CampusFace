import { Pressable, PressableProps, Text } from "react-native";
import { cn } from "../utils/cn";
import React from "react";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  theme?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
} & PressableProps;

export const Button = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  ButtonProps
>(({ title, onPress, theme = "primary", disabled, ...rest }, ref) => {
  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      className={cn(
        "flex-row items-center justify-center rounded-full px-5 py-3 border",
        theme === "primary" && "bg-primary border-primary",
        theme === "secondary" && "bg-white border-gray-300",
        theme === "tertiary" && "bg-transparent border-transparent",
        disabled && "opacity-50"
      )}
      disabled={disabled}
      {...rest}
    >
      <Text
        className={cn(
          "font-semibold text-md tracking-wider",
          theme === "secondary" && "text-black",
          theme === "primary" && "text-white",
          theme === "tertiary" && "text-gray-800"
        )}
      >
        {title} {disabled}
      </Text>
    </Pressable>
  );
});

Button.displayName = "Button";
