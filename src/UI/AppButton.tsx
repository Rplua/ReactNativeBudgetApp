import { Pressable, Text } from "react-native";
import type { AppButtonProps } from "../types";
import { styles } from "./AppButton.styles"

export default function AppButton({
    title,
    variant = "primary",
    onPress,
}: AppButtonProps) {
    const isDisabled = variant === "disabled";

    return (
        <Pressable
            style={[styles.button, styles[variant]]}
            onPress={onPress}
            disabled={isDisabled}
        >
            <Text style={[styles.buttonText, styles[`${variant}Text`]]}>
                {title}
            </Text>
        </Pressable>
    );
}