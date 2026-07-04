import { useState } from "react";
import type { MonthlyBudget, CategoryBudget, SubcategoryBudget, Expense } from "../types";
import {
    getCurrentPeriodKey,
    getMonthAndYearFromPeriodKey,
} from "../utils/period";

export function useBudgetManager() {
    const [budgets, setBudgets] = useState<MonthlyBudget[]>([]);
    const [selectedPeriodKey, setSelectedPeriodKey] = useState(
        () => getCurrentPeriodKey()
    );

    const selectedBudget =
        budgets.find((budget) => budget.periodKey === selectedPeriodKey) ?? null;


    const [categoryInputValue, setCategoryInputValue] = useState("");
    const [categoryErrorMessage, setCategoryErrorMessage] = useState("");

    const createBudget = (amount: number): string | null => {
        const budgetAlreadyExists = budgets.some(
            (budget) => budget.periodKey === selectedPeriodKey
        );

        if (budgetAlreadyExists) {
            return "A budget already exists for this month.";
        }

        const { month, year } = getMonthAndYearFromPeriodKey(selectedPeriodKey);

        const newBudget: MonthlyBudget = {
            id: Date.now().toString(),
            amount,
            currency: "EUR",
            month,
            year,
            periodKey: selectedPeriodKey,
            categories: [],
        };

        setBudgets((previousBudgets) => [...previousBudgets, newBudget]);

        return null;
    };

    const updateSelectedBudget = (
        updateBudget: (budget: MonthlyBudget) => MonthlyBudget
    ) => {
        setBudgets((previousBudgets) =>
            previousBudgets.map((budget) =>
                budget.periodKey === selectedPeriodKey ? updateBudget(budget) : budget
            )
        );
    };

    const addCategoryToSelectedBudget = (categoryName: string): string | null => {
        if (selectedBudget === null) {
            return "Create a monthly budget first.";
        }

        const categoryAlreadyExists = selectedBudget.categories.some(
            (existingCategory) =>
                existingCategory.name.toLowerCase() === categoryName.toLowerCase()
        );

        if (categoryAlreadyExists) {
            return "You can't add the same category twice.";
        }

        const newCategory: CategoryBudget = {
            id: Date.now().toString(),
            name: categoryName,
            allocatedAmount: 0,
            description: null,
            subcategories: [],
            expenses: [],
        };

        updateSelectedBudget((previousBudget) => {
            return {
                ...previousBudget,
                categories: [...previousBudget.categories, newCategory],
            };
        });

        return null;
    };

    const addMoneyToCategoryInSelectedBudget = (
        categoryId: string,
        amount: number
    ) => {
        updateSelectedBudget((previousBudget) => {
            return {
                ...previousBudget,
                categories: previousBudget.categories.map((category) =>
                    category.id === categoryId
                        ? {
                            ...category,
                            allocatedAmount: category.allocatedAmount + amount,
                        }
                        : category
                ),
            };
        });
    };

    const deleteCategoryFromSelectedBudget = (categoryId: string) => {
        updateSelectedBudget((previousBudget) => {
            const updatedCategories = previousBudget.categories.filter(
                (category) => category.id !== categoryId
            );

            return {
                ...previousBudget,
                categories: updatedCategories,
            };
        });
    };

    const editCategoryInSelectedBudget = (updatedCategory: CategoryBudget) => {
        updateSelectedBudget((previousBudget) => {
            return {
                ...previousBudget,
                categories: previousBudget.categories.map((category) =>
                    category.id === updatedCategory.id ? updatedCategory : category
                ),
            };
        });
    };

    const addExpenseToCategoryInSelectedBudget = (
        categoryId: string,
        expense: Expense
    ) => {
        updateSelectedBudget((previousBudget) => {
            return {
                ...previousBudget,
                categories: previousBudget.categories.map((category) =>
                    category.id === categoryId
                        ? {
                            ...category,
                            expenses: [...category.expenses, expense],
                        }
                        : category
                ),
            };
        });
    };

    const addSubcategoryToSelectedBudget = (
        categoryId: string,
        subcategory: SubcategoryBudget
    ) => {
        updateSelectedBudget((previousBudget) => {
            return {
                ...previousBudget,
                categories: previousBudget.categories.map((category) =>
                    category.id === categoryId
                        ? {
                            ...category,
                            subcategories: [...category.subcategories, subcategory],
                        }
                        : category
                ),
            };
        });
    };

    return {
        budgets,
        selectedPeriodKey,
        setSelectedPeriodKey,
        selectedBudget,
        createBudget,
        updateSelectedBudget,
        addCategoryToSelectedBudget,
        addMoneyToCategoryInSelectedBudget,
        deleteCategoryFromSelectedBudget,
        editCategoryInSelectedBudget,
        addExpenseToCategoryInSelectedBudget,
        addSubcategoryToSelectedBudget
    };
}