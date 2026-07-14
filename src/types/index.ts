import type { KeyboardTypeOptions } from "react-native";

export type SortOption =
    | "newest"
    | "name-asc"
    | "name-desc"
    | "amount-asc"
    | "amount-desc";

export interface CategoryFilterBarProps {
    searchText: string;
    sortOption: SortOption;
    onChangeSearchText: (value: string) => void;
    onChangeSortOption: (option: SortOption) => void;
}
export interface BudgetState {
    budgets: MonthlyBudget[];
    selectedPeriodKey: string;
}

export interface MonthlyBudget {
    id: string;
    amount: number;
    currency: string;
    month: number;
    year: number;
    periodKey: string;
    categories: CategoryBudget[];
}

export interface CategoryBudget {
    id: string;
    name: string;
    description: string | null;
    allocatedAmount: number;
    subcategories: SubcategoryBudget[];
    expenses: Expense[];
    createdAt: string
}

export interface SubcategoryBudget {
    id: string;
    name: string;
    description: string | null;
    allocatedAmount: number;
    expenses: Expense[];
}

export interface Expense {
    id: string;
    title: string;
    amount: number;
    date: string;
}

export interface BudgetSectionProps {
    monthlyBudget: MonthlyBudget | null;
    isBudgetFormOpen: boolean;
    budgetInputValue: string;
    budgetErrorMessage: string;
    onOpenBudgetForm: () => void;
    onCloseBudgetForm: () => void;
    onSaveBudget: () => void;
    onChangeBudgetInputValue: (value: string) => void;
}
export interface CategorySectionProps {
    categories: CategoryBudget[];
    categoryInputValue: string;
    categoryErrorMessage: string;
    onChangeCategoryInputValue: (value: string) => void;
    onAddCategory: () => void;
    onDeleteCategory: (categoriesId: string) => void;
    onAddMoneyToCategory: (categoryId: string, amount: number) => void;
    onAddExpenseToCategory: (categoryId: string, expense: Expense) => void;
    onAddSubcategory: (categoryId: string, subcategory: SubcategoryBudget) => void;
    onEditCategory: (category: CategoryBudget) => void;
}

export interface CategoryListProps {
    categories: CategoryBudget[];
    onDeleteCategory: (categoryId: string) => void;
    onAddMoneyToCategory: (categoryId: string, amount: number) => void;
    onAddExpenseToCategory: (categoryId: string, expense: Expense) => void;
    onAddSubcategory: (categoryId: string, subcategory: SubcategoryBudget) => void;
    onEditCategory: (category: CategoryBudget) => void;
}

export interface CategoryCardProps {
    category: CategoryBudget;
    onDeleteCategory: (categoryId: string) => void;
    onAddMoneyToCategory: (categoryId: string, amount: number) => void;
    onAddExpenseToCategory: (categoryId: string, expense: Expense) => void;
    onAddSubcategory: (categoryId: string, subcategory: SubcategoryBudget) => void;
    onEditCategory: (categoriesId: CategoryBudget) => void;
}

export interface SubcategoryListProps {
    categoryId: string;
    subcategories: SubcategoryBudget[];
    onDeleteSubcategory: (categoryId: string, subcategoryId: string) => void;
    onAddMoneyToSubcategory: (
        categoryId: string,
        subcategoryId: string,
        amount: number
    ) => void;
    onAddExpenseToSubcategory: (
        categoryId: string,
        subcategoryId: string,
        expense: Expense
    ) => void;
    onEditSubcategory: (
        categoryId: string,
        subcategory: SubcategoryBudget
    ) => void;
}

export interface SubcategoryCardProps {
    categoryId: string;
    subcategory: SubcategoryBudget;
    onDeleteSubcategory: (categoryId: string, subcategoryId: string) => void;
    onAddMoneyToSubcategory: (
        categoryId: string,
        subcategoryId: string,
        amount: number
    ) => void;
    onAddExpenseToSubcategory: (
        categoryId: string,
        subcategoryId: string,
        expense: Expense
    ) => void;
    onEditSubcategory: (
        categoryId: string,
        subcategory: SubcategoryBudget
    ) => void;
}

export type AppButtonVariant = "primary" | "secondary" | "danger" | "disabled";

export interface AppButtonProps {
    title: string;
    variant?: AppButtonVariant;
    onPress: () => void;
}
export type AppInputVariant = "default" | "textarea";

export interface AppInputProps {
    placeholder: string;
    value: string;
    variant?: AppInputVariant;
    onChangeText: (value: string) => void;
    keyboardType?: KeyboardTypeOptions;
    multiline?: boolean;
}

export interface AddMoneyFormProps {
  onSave: (amount: number) => void;
  onCancel: () => void;
}