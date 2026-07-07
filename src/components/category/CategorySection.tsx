import type { CategoryBudget, CategorySectionProps, SortOption } from "../../types";
import { Pressable, Text, TextInput, View, } from "react-native";
import { useState } from "react";
import { styles } from "./CategorySection.styles";
import CategoryList from "./CategoryList";
import AppInput from "../../UI/AppInput";
import AppButton from "../../UI/AppButton";
import CategoryFilterBar from "../../UI/CategoryFIlterBar";
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

    const [searchText, setSearchText] = useState("");
    const [sortOption, setSortOption] = useState<SortOption>("newest");

    const getFilteredAndSortedCategories = () => {
        const normalizedSearchText = searchText.trim().toLowerCase();

        const filteredCategories = categories.filter((category) =>
            category.name.toLowerCase().includes(normalizedSearchText)
        );

        const sortedCategories = [...filteredCategories].sort((a, b) => {
            if (sortOption === "name-asc") {
                return a.name.localeCompare(b.name);
            }

            if (sortOption === "name-desc") {
                return b.name.localeCompare(a.name);
            }

            if (sortOption === "amount-asc") {
                return a.allocatedAmount - b.allocatedAmount;
            }

            if (sortOption === "amount-desc") {
                return b.allocatedAmount - a.allocatedAmount;
            }

            if (sortOption === "newest") {
                return Number(b.id) - Number(a.id);
            }

            return 0;
        });

        return sortedCategories;
    };

    const filteredAndSortedCategories = getFilteredAndSortedCategories();

    return (
        <View style={styles.section}>
            <Text style={styles.title}>Categories</Text>
            <View style={styles.form}>
                <AppInput
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
            <CategoryFilterBar
                searchText={searchText}
                sortOption={sortOption}
                onChangeSearchText={setSearchText}
                onChangeSortOption={setSortOption}
            />
            {filteredAndSortedCategories.length > 0 ? (
                <CategoryList
                    categories={filteredAndSortedCategories}
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