import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 12,
        alignItems: "center",
    },

    buttonText: {
        fontWeight: "700",
        fontSize: 15,
    },

    primary: {
        backgroundColor: "#111827",
    },
    primaryText: {
        color: "#ffffff",
    },

    secondary: {
        backgroundColor: "#eeeeee",
    },
    secondaryText: {
        color: "#111827",
    },

    danger: {
        backgroundColor: "#fee2e2",
    },
    dangerText: {
        color: "#991b1b",
    },

    disabled: {
        backgroundColor: "#f3f4f6",
    },
    disabledText: {
        color: "#9ca3af",
    },
    smallButton: {
        paddingVertical: 9,
        paddingHorizontal: 8,
        borderRadius: 10,
    },

    smallButtonText: {
        fontSize: 13,
    },
});