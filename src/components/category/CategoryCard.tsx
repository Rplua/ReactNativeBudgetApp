import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import type { CategoryCardProps } from "../../types";
import { styles } from "./CategoryCard.styles"

export default function CategoryCard({
    category,
    onAddMoneyToCategory,
    onDeleteCategory,
    onEditCategory,
}: CategoryCardProps) {
    const [isAddMoneyFormOpen, setIsAddMoneyFormOpen] = useState(false);
    const [moneyInputValue, setMoneyInputValue] = useState("");
    const [moneyErrorMessage, setMoneyErrorMessage] = useState("");

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

    const toggleAddMoneyForm = () => {
        setIsAddMoneyFormOpen((previousValue) => !previousValue);
        setMoneyErrorMessage("");
    };

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

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.categoryName}>{category.name}</Text>

                    {category.description !== null && (
                        <Text style={styles.description}>{category.description}</Text>
                    )}
                </View>

                <Text style={styles.amount}>{category.allocatedAmount} €</Text>
            </View>

            <View style={styles.summary}>
                <Text style={styles.summaryText}>Spent: {totalSpent} €</Text>
                <Text style={styles.summaryText}>Remaining: {remainingAmount} €</Text>
            </View>

            <View style={styles.actions}>
                <Pressable style={styles.primaryButton} onPress={toggleAddMoneyForm}>
                    <Text style={styles.primaryButtonText}>Add Money</Text>
                </Pressable>

                <Pressable
                    style={styles.secondaryButton}
                    onPress={() => onEditCategory(category)}
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

            {isAddMoneyFormOpen && (
                <View style={styles.form}>
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

            <View style={styles.futureActions}>
                <Pressable style={styles.disabledButton}>
                    <Text style={styles.disabledButtonText}>Add Expense</Text>
                </Pressable>

                <Pressable style={styles.disabledButton}>
                    <Text style={styles.disabledButtonText}>Add Subcategory</Text>
                </Pressable>
            </View>

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