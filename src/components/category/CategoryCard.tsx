// src/components/category/CategoryCard.tsx
import { useState } from "react";
import { View, Text } from "react-native";
import type { CategoryCardProps, Expense } from "../../types";
import { styles } from "./CategoryCard.styles";
import AppButton from "../../UI/AppButton";
import AppInput from "../../UI/AppInput";
import AppCard from "../../UI/AppCard";
import AddMoneyForm from '../category/forms/AddMoneyForm'

export default function CategoryCard({
    category,
    onAddMoneyToCategory,
    onDeleteCategory,
    onEditCategory,
    onAddExpenseToCategory,
}: CategoryCardProps) {

    const [isAddMoneyFormOpen, setIsAddMoneyFormOpen] = useState(false);

    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [editNameInputValue, setEditNameInputValue] = useState(category.name);
    const [editAmountInputValue, setEditAmountInputValue] = useState(
        category.allocatedAmount.toString()
    );
    const [editDescriptionInputValue, setEditDescriptionInputValue] = useState(
        category.description ?? ""
    );
    const [editErrorMessage, setEditErrorMessage] = useState("");

    const [isAddExpenseFormOpen, setIsAddExpenseFormOpen] = useState(false);
    const [expenseNameInputValue, setExpenseNameInputValue] = useState("");
    const [expenseAmountInputValue, setExpenseAmountInputValue] = useState("");
    const [expenseErrorMessage, setExpenseErrorMessage] = useState("");

    // -----------------------------
    // Calculations
    // -----------------------------
    const directExpensesTotal = category.expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    const subcategoriesExpensesTotal = category.subcategories.reduce(
        (total, subcategory) => {
            const subcategoryTotal = subcategory.expenses.reduce(
                (subtotal, expense) => subtotal + expense.amount,
                0
            );

            return total + subcategoryTotal;
        },
        0
    );

    const totalExpenses = directExpensesTotal + subcategoriesExpensesTotal;

    // Dinero que el usuario tiene actualmente disponible en la categoría.
    const availableAmount = category.allocatedAmount - totalExpenses;

    // -----------------------------
    // Toggle forms
    // -----------------------------
    const toggleAddMoneyForm = () => {
        setIsAddMoneyFormOpen((previousValue) => !previousValue);
    };

    const toggleExpenseForm = () => {
        setIsAddExpenseFormOpen((previousValue) => !previousValue);
        setExpenseErrorMessage("");
    };

    // -----------------------------
    // Save expense
    // -----------------------------
    const handleSaveExpense = () => {
        const trimmedExpenseName = expenseNameInputValue.trim();
        const parsedAmount = Number(expenseAmountInputValue);

        // 1. Validate expense name
        if (trimmedExpenseName === "") {
            setExpenseErrorMessage("Expense name can't be empty.");
            return;
        }

        // 2. Validate amount
        if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
            setExpenseErrorMessage("Value should be greater than 0.");
            return;
        }

        // 3. Validate category remaining money
        if (parsedAmount > availableAmount) {
            setExpenseErrorMessage(
                "You can't spend more than the remaining amount for this category."
            );
            return;
        }

        // 4. Create the expense object
        const newExpense: Expense = {
            id: Date.now().toString(),
            title: trimmedExpenseName,
            amount: parsedAmount,
            date: new Date().toISOString(),
        };

        // 5. Send the expense to HomeScreen
        onAddExpenseToCategory(category.id, newExpense);

        // 6. Clean form
        setExpenseNameInputValue("");
        setExpenseAmountInputValue("");
        setExpenseErrorMessage("");
        setIsAddExpenseFormOpen(false);
    };

    // -----------------------------
    // Save category edition
    // -----------------------------
    const handleSaveEditCategory = () => {
        const trimmedName = editNameInputValue.trim();
        const parsedAmount = Number(editAmountInputValue);

        if (trimmedName === "") {
            setEditErrorMessage("Category name can't be empty.");
            return;
        }

        if (Number.isNaN(parsedAmount) || parsedAmount < 0) {
            setEditErrorMessage("Amount should be 0 or greater.");
            return;
        }

        onEditCategory({
            ...category,
            name: trimmedName,
            allocatedAmount: parsedAmount,
            description:
                editDescriptionInputValue.trim() === ""
                    ? null
                    : editDescriptionInputValue.trim(),
        });

        setEditErrorMessage("");
        setIsEditFormOpen(false);
    };

    return (
        <AppCard>
            {/* Category header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.categoryName}>{category.name}</Text>

                    {category.description !== null && (
                        <Text style={styles.description}>{category.description}</Text>
                    )}
                </View>
                <Text style={styles.amountLabel}>Available</Text>
                <Text style={styles.amount}>{availableAmount} €</Text>
            </View>

            {/* Main actions */}
            <View style={styles.actions}>
                <AppButton title="Add Money" variant="primary" onPress={toggleAddMoneyForm} />
                <AppButton title="Edit" variant="secondary" onPress={() => setIsEditFormOpen(true)} />
                <AppButton title="Delete" variant="danger" onPress={() => onDeleteCategory(category.id)} />
            </View>

            {/* Edit category form */}
            {isEditFormOpen && (
                <View style={styles.editForm}>
                    <Text style={styles.formTitle}>Edit category</Text>

                    <AppInput
                        value={editNameInputValue}
                        onChangeText={setEditNameInputValue}
                        placeholder="Category name"
                    />

                    <AppInput
                        value={editAmountInputValue}
                        onChangeText={setEditAmountInputValue}
                        placeholder="Allocated amount"
                        keyboardType="numeric"
                    />

                    <AppInput
                        value={editDescriptionInputValue}
                        onChangeText={setEditDescriptionInputValue}
                        placeholder="Description"
                        multiline
                    />

                    {editErrorMessage !== "" && (
                        <Text style={styles.errorText}>{editErrorMessage}</Text>
                    )}

                    <View style={styles.formActions}>
                        <AppButton
                            title="Save changes"
                            variant="primary"
                            onPress={handleSaveEditCategory}
                        />

                        <AppButton
                            title="Cancel"
                            variant="secondary"
                            onPress={() => setIsEditFormOpen(false)}
                        />
                    </View>
                </View>
            )}

            {/* Add money form */}
            {isAddMoneyFormOpen && (
                <AddMoneyForm
                    onSave={(amount) => {
                        onAddMoneyToCategory(category.id, amount);
                        setIsAddMoneyFormOpen(false);
                    }}
                    onCancel={() => setIsAddMoneyFormOpen(false)}
                />
            )}

            {/* Secondary actions */}
            <View style={styles.futureActions}>
                <AppButton
                    title="Add Expense"
                    variant="secondary"
                    onPress={toggleExpenseForm}
                />
            </View>

            {/* Add expense form */}
            {isAddExpenseFormOpen && (
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
                            title="Save expense"
                            variant="primary"
                            onPress={handleSaveExpense}
                        />

                        <AppButton
                            title="Cancel"
                            variant="secondary"
                            onPress={() => setIsAddExpenseFormOpen(false)}
                        />
                    </View>
                </View>
            )}
        </AppCard>
    );
}