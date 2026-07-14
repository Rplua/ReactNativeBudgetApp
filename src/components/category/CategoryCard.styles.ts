import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: "#ffffff",
        gap: 12,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
    categoryName: {
        fontSize: 18,
        fontWeight: "700",
    },
    description: {
        fontSize: 14,
        color: "#666666",
        marginTop: 4,
    },
    amount: {
        fontSize: 18,
        fontWeight: "700",
    },
    summary: {
        gap: 4,
    },
    summaryText: {
        fontSize: 14,
        color: "#444444",
    },
    actions: {
        flexDirection: "row",
        gap: 8,
        flexWrap: "wrap",
    },
    futureActions: {
        flexDirection: "row",
        gap: 8,
        flexWrap: "wrap",
    },
    form: {
        gap: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#cccccc",
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
    },
    errorText: {
        fontSize: 14,
        color: "red",
    },
    primaryButton: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: "#111827",
        alignItems: "center",
    },
    primaryButtonText: {
        color: "#ffffff",
        fontWeight: "700",
    },
    secondaryButton: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: "#eeeeee",
        alignItems: "center",
    },
    secondaryButtonText: {
        color: "#111827",
        fontWeight: "700",
    },
    dangerButton: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: "#fee2e2",
        alignItems: "center",
    },
    dangerButtonText: {
        color: "#991b1b",
        fontWeight: "700",
    },
    disabledButton: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: "#f3f4f6",
        alignItems: "center",
    },
    disabledButtonText: {
        color: "#9ca3af",
        fontWeight: "700",
    },
    subcategoriesContainer: {
        gap: 6,
        paddingTop: 8,
    },
    subcategoriesTitle: {
        fontSize: 16,
        fontWeight: "700",
    },
    subcategoryText: {
        fontSize: 14,
        color: "#444444",
    },
    editForm: {
        gap: 10,
        padding: 12,
        borderRadius: 14,
        backgroundColor: "#f9fafb",
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },

    formTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
    },

    descriptionInput: {
        minHeight: 80,
        textAlignVertical: "top",
    },

    formActions: {
        flexDirection: "row",
        gap: 8,
        flexWrap: "wrap",
    },

    amountLabel: {
        fontSize: 12,
        color: "#6b7280",
        textAlign: "right",
    },
});
