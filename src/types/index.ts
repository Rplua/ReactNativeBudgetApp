export interface MonthlyBudget {
    id: string;
    amount: number;
    currency: string;
    month: number;
    year: number;
    categories: CategoryBudget[];
}

export interface CategoryBudget {
    id: string;
    name: string;
    description: string | null;
    allocatedAmount: number;
    subcategories: SubcategoryBudget[];
    expenses: Expense[];
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