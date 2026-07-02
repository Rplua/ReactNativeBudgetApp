import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import type { CategoryCardProps, Expense } from "../../types";
import { styles } from "./CategoryCard.styles";

export default function CategoryCard({
    category,
    onAddMoneyToCategory,
    onDeleteCategory,
    onEditCategory,
    onAddExpenseToCategory,
}: CategoryCardProps) {
    // -----------------------------
    // Add Money state
    // -----------------------------
    const [isAddMoneyFormOpen, setIsAddMoneyFormOpen] = useState(false);
    const [moneyInputValue, setMoneyInputValue] = useState("");
    const [moneyErrorMessage, setMoneyErrorMessage] = useState("");

    // -----------------------------
    // Edit Category state
    // -----------------------------
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [editNameInputValue, setEditNameInputValue] = useState(category.name);
    const [editAmountInputValue, setEditAmountInputValue] = useState(
        category.allocatedAmount.toString()
    );
    const [editDescriptionInputValue, setEditDescriptionInputValue] = useState(
        category.description ?? ""
    );
    const [editErrorMessage, setEditErrorMessage] = useState("");

    // -----------------------------
    // Add Expense state
    // -----------------------------
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

    const totalSpent = directExpensesTotal + subcategoriesExpensesTotal;
    const remainingAmount = category.allocatedAmount - totalSpent;

    // -----------------------------
    // Toggle forms
    // -----------------------------
    const toggleAddMoneyForm = () => {
        setIsAddMoneyFormOpen((previousValue) => !previousValue);
        setMoneyErrorMessage("");
    };

    const toggleExpenseForm = () => {
        setIsAddExpenseFormOpen((previousValue) => !previousValue);
        setExpenseErrorMessage("");
    };

    // -----------------------------
    // Save money
    // -----------------------------
    const handleSaveMoney = () => {
        const parsedAmount = Number(moneyInputValue);

        if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
            setMoneyErrorMessage("Value should be greater than 0.");
            return;
        }

        onAddMoneyToCategory(category.id, parsedAmount);

        setMoneyInputValue("");
        setMoneyErrorMessage("");
        setIsAddMoneyFormOpen(false);
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
        if (parsedAmount > remainingAmount) {
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
        <View style={styles.card}>
            {/* Category header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.categoryName}>{category.name}</Text>

                    {category.description !== null && (
                        <Text style={styles.description}>{category.description}</Text>
                    )}
                </View>

                <Text style={styles.amount}>{category.allocatedAmount} €</Text>
            </View>

            {/* Category summary */}
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Spent: {totalSpent} €</Text>
                <Text style={styles.summaryText}>Remaining: {remainingAmount} €</Text>
            </View>

            {/* Main actions */}
            <View style={styles.actions}>
                <Pressable style={styles.primaryButton} onPress={toggleAddMoneyForm}>
                    <Text style={styles.primaryButtonText}>Add Money</Text>
                </Pressable>

                <Pressable
                    style={styles.secondaryButton}
                    onPress={() => setIsEditFormOpen(true)}
                >
                    <Text style={styles.secondaryButtonText}>Edit</Text>
                </Pressable>

                <Pressable
                    style={styles.dangerButton}
                    onPress={() => onDeleteCategory(category.id)}
                >
                    <Text style={styles.dangerButtonText}>Delete</Text>
                </Pressable>
            </View>

            {/* Edit category form */}
            {isEditFormOpen && (
                <View style={styles.editForm}>
                    <Text style={styles.formTitle}>Edit category</Text>

                    <TextInput
                        style={styles.input}
                        value={editNameInputValue}
                        onChangeText={setEditNameInputValue}
                        placeholder="Category name"
                    />

                    <TextInput
                        style={styles.input}
                        value={editAmountInputValue}
                        onChangeText={setEditAmountInputValue}
                        placeholder="Allocated amount"
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={[styles.input, styles.descriptionInput]}
                        value={editDescriptionInputValue}
                        onChangeText={setEditDescriptionInputValue}
                        placeholder="Description"
                        multiline
                    />

                    {editErrorMessage !== "" && (
                        <Text style={styles.errorText}>{editErrorMessage}</Text>
                    )}

                    <View style={styles.formActions}>
                        <Pressable
                            style={styles.primaryButton}
                            onPress={handleSaveEditCategory}
                        >
                            <Text style={styles.primaryButtonText}>Save changes</Text>
                        </Pressable>

                        <Pressable
                            style={styles.secondaryButton}
                            onPress={() => setIsEditFormOpen(false)}
                        >
                            <Text style={styles.secondaryButtonText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            )}

            {/* Add money form */}
            {isAddMoneyFormOpen && (
                <View style={styles.form}>
                    <Text style={styles.formTitle}>Add money</Text>

                    <TextInput
                        style={styles.input}
                        value={moneyInputValue}
                        onChangeText={setMoneyInputValue}
                        placeholder="Amount greater than 0"
                        keyboardType="numeric"
                    />

                    {moneyErrorMessage !== "" && (
                        <Text style={styles.errorText}>{moneyErrorMessage}</Text>
                    )}

                    <Pressable style={styles.primaryButton} onPress={handleSaveMoney}>
                        <Text style={styles.primaryButtonText}>Save</Text>
                    </Pressable>
                </View>
            )}

            {/* Secondary actions */}
            <View style={styles.futureActions}>
                <Pressable style={styles.secondaryButton} onPress={toggleExpenseForm}>
                    <Text style={styles.secondaryButtonText}>Add Expense</Text>
                </Pressable>

                <Pressable style={styles.disabledButton}>
                    <Text style={styles.disabledButtonText}>Add Subcategory</Text>
                </Pressable>
            </View>

            {/* Add expense form */}
            {isAddExpenseFormOpen && (
                <View style={styles.form}>
                    <Text style={styles.formTitle}>Add expense</Text>

                    <TextInput
                        style={styles.input}
                        value={expenseNameInputValue}
                        onChangeText={setExpenseNameInputValue}
                        placeholder="Expense name"
                    />

                    <TextInput
                        style={styles.input}
                        value={expenseAmountInputValue}
                        onChangeText={setExpenseAmountInputValue}
                        placeholder="Amount greater than 0"
                        keyboardType="numeric"
                    />

                    {expenseErrorMessage !== "" && (
                        <Text style={styles.errorText}>{expenseErrorMessage}</Text>
                    )}

                    <View style={styles.formActions}>
                        <Pressable style={styles.primaryButton} onPress={handleSaveExpense}>
                            <Text style={styles.primaryButtonText}>Save expense</Text>
                        </Pressable>

                        <Pressable
                            style={styles.secondaryButton}
                            onPress={() => setIsAddExpenseFormOpen(false)}
                        >
                            <Text style={styles.secondaryButtonText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            )}

            {/* Subcategories preview */}
            {category.subcategories.length > 0 && (
                <View style={styles.subcategoriesContainer}>
                    <Text style={styles.subcategoriesTitle}>Subcategories</Text>

                    {category.subcategories.map((subcategory) => (
                        <Text key={subcategory.id} style={styles.subcategoryText}>
                            {subcategory.name} - {subcategory.allocatedAmount} €
                        </Text>
                    ))}
                </View>
            )}
        </View>
    );
}