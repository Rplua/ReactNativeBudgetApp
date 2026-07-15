import { Pressable, Text } from "react-native";
import type { AppButtonProps } from "../types";
import { styles } from "./AppButton.styles"

export default function AppButton({
    title,
    variant = "primary",
    size = "default",
    onPress,
}: AppButtonProps) {
    const isDisabled = variant === "disabled";

    return (
        <Pressable
            style={[
                styles.button,
                styles[variant],
                size === "small" && styles.smallButton,
            ]}
            onPress={onPress}
            disabled={isDisabled}
        >
            <Text
                numberOfLines={1}
                style={[
                    styles.buttonText,
                    styles[`${variant}Text`],
                    size === "small" && styles.smallButtonText,
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
}