
import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    form: {
        backgroundColor: "#f8f9fa",
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },

    formTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#2d3748",
        marginBottom: 15,
        textAlign: "center",
    },

    inputContainer: {
        marginBottom: 15,
    },

    errorText: {
        color: "#e53e3e",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
    },

    formActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },

    button: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 12,
    },

    cancelButton: {
        backgroundColor: "#e2e8f0",
    },

    saveButton: {
        backgroundColor: "#4299e1",
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    },

    saveButtonText: {
        color: "#fff",
    },

    cancelButtonText: {
        color: "#4a5568",
    },
});
