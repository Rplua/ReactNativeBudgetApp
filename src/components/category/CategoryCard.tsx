// src/components/category/CategoryCard.tsx
import { useState } from "react";
import { View, Text } from "react-native";
import type { CategoryCardProps, Expense } from "../../types";
import { styles } from "./CategoryCard.styles";
import AppButton from "../../UI/AppButton";
import AppInput from "../../UI/AppInput";
import AppCard from "../../UI/AppCard";
import AddMoneyForm from '../category/forms/AddMoneyForm'
import AddExpenseForm from "./forms/AddExpenseForm";

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
    const availableAmount = category.allocatedAmount - totalExpenses;

    // -----------------------------
    // Toggle forms
    // -----------------------------
    const toggleAddMoneyForm = () => {
        setIsAddMoneyFormOpen((previousValue) => !previousValue);
    };

    const toggleExpenseForm = () => {
        setIsAddExpenseFormOpen((previousValue) => !previousValue);
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
                <View style={styles.actionButton}>
                    <AppButton
                        title="Money"
                        size="small"
                        variant="primary"
                        onPress={toggleAddMoneyForm}
                    />
                </View>

                <View style={styles.actionButton}>
                    <AppButton
                        title="Expense"
                        size="small"
                        variant="secondary"
                        onPress={toggleExpenseForm}
                    />
                </View>

                <View style={styles.actionButton}>
                    <AppButton
                        title="Edit"
                        size="small"
                        variant="secondary"
                        onPress={() => setIsEditFormOpen(true)}
                    />
                </View>

                <View style={styles.actionButton}>
                    <AppButton
                        title="Delete"
                        size="small"
                        variant="danger"
                        onPress={() => onDeleteCategory(category.id)}
                    />
                </View>
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
            {/* Add expense form */}
            {isAddExpenseFormOpen && (
                <AddExpenseForm availableAmount={availableAmount}
                    onAdd={(expense) => {
                        onAddExpenseToCategory(category.id, expense);
                        setIsAddExpenseFormOpen(false);
                    }}
                    onCancel={() => setIsAddExpenseFormOpen(false)}
                />

            )}
        </AppCard>
    );
}