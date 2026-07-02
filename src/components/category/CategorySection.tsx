import type { CategorySectionProps } from "../../types";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "./CategorySection.styles";
import CategoryList from "./CategoryList";

export default function CategorySection({
    categories,
    categoryInputValue,
    categoryErrorMessage,
    onChangeCategoryInputValue,
    onAddCategory,
    onDeleteCategory,
    onAddExpenseToCategory,
    onAddMoneyToCategory,
    onAddSubcategory,
    onEditCategory,
}: CategorySectionProps) {
    return (
        <View style={styles.section}>
            <Text style={styles.title}>Categories</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Add your category"
                    value={categoryInputValue}
                    onChangeText={onChangeCategoryInputValue}
                />

                <Pressable style={styles.primaryButton} onPress={onAddCategory}>
                    <Text style={styles.primaryButtonText}>Add Category</Text>
                </Pressable>

                {categoryErrorMessage !== "" && (
                    <Text style={styles.errorText}>{categoryErrorMessage}</Text>
                )}
            </View>

            {categories.length > 0 ? (
                <CategoryList
                    categories={categories}
                    onAddExpenseToCategory={onAddExpenseToCategory}
                    onAddMoneyToCategory={onAddMoneyToCategory}
                    onDeleteCategory={onDeleteCategory}
                    onAddSubcategory={onAddSubcategory}
                    onEditCategory={onEditCategory}
                />
            ) : (
                <Text style={styles.emptyText}>No categories yet.</Text>
            )}
        </View>
    );
}