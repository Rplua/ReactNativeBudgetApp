import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    form: {
        padding: 12,
        borderRadius: 10,
        backgroundColor: "#f8f9fa",
        gap: 10,
    },

    formTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2d3748",
    },

    errorText: {
        color: "#e53e3e",
        fontSize: 13,
    },

    formActions: {
        flexDirection: "row",
        gap: 8,
    },

    buttonWrapper: {
        flex: 1,
    },
});
