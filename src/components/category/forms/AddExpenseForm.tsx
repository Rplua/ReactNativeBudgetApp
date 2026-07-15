import { useState } from "react";
import { Text, View } from "react-native";
import type { AddExpenseFormProps, Expense } from "../../../types";
import AppInput from "../../../UI/AppInput";
import AppButton from "../../../UI/AppButton";
import { styles } from "./AddExpenseForm.styles";

export default function AddExpenseForm({
    availableAmount,
    onAdd,
    onCancel,
}: AddExpenseFormProps) {
    const [expenseNameInputValue, setExpenseNameInputValue] = useState("");
    const [expenseAmountInputValue, setExpenseAmountInputValue] = useState("");
    const [expenseErrorMessage, setExpenseErrorMessage] = useState("");

    const handleSaveExpense = () => {
        const trimmedExpenseName = expenseNameInputValue.trim();
        const parsedAmount = Number(expenseAmountInputValue);

        if (trimmedExpenseName === "") {
            setExpenseErrorMessage("Expense name can't be empty.");
            return;
        }

        if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
            setExpenseErrorMessage("Value should be greater than 0.");
            return;
        }

        if (parsedAmount > availableAmount) {
            setExpenseErrorMessage(
                "You can't spend more than the available money in this category."
            );
            return;
        }

        const newExpense: Expense = {
            id: Date.now().toString(),
            title: trimmedExpenseName,
            amount: parsedAmount,
            date: new Date().toISOString(),
        };

        onAdd(newExpense);

        setExpenseNameInputValue("");
        setExpenseAmountInputValue("");
        setExpenseErrorMessage("");
    };

    return (
        <View style={styles.form}>
            <Text style={styles.formTitle}>Add expense</Text>

            <AppInput
                value={expenseNameInputValue}
                onChangeText={setExpenseNameInputValue}
                placeholder="Expense name"
            />

            <AppInput
                value={expenseAmountInputValue}
                onChangeText={setExpenseAmountInputValue}
                placeholder="Amount greater than 0"
                keyboardType="numeric"
            />

            {expenseErrorMessage !== "" && (
                <Text style={styles.errorText}>{expenseErrorMessage}</Text>
            )}

            <View style={styles.formActions}>
                <AppButton
                    title="Cancel"
                    variant="secondary"
                    onPress={onCancel}
                />

                <AppButton
                    title="Save expense"
                    variant="primary"
                    onPress={handleSaveExpense}
                />
            </View>
        </View>
    );
}