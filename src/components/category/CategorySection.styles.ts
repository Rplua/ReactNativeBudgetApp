import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  section: {
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  form: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  primaryButton: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#111827",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  emptyText: {
    fontSize: 14,
    color: "#666666",
  },
});