import { TextInput } from "react-native";
import type { AppInputProps } from "../types";
import { styles } from "./AppInput.styles"

export default function AppInput({
    value,
    variant = "default",
    onChangeText,
    placeholder,
    keyboardType = "default",
    multiline = false,
}: AppInputProps) {
    return (
        <TextInput
            value={value}
            style={[styles.input, styles[variant]]}
            onChangeText={onChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
            multiline={multiline}
        />
    );
}