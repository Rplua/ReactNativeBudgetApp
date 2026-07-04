import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import type {
  MonthlyBudget,
  CategoryBudget,
  Expense,
  SubcategoryBudget,
} from "../types";
import BudgetSection from "../components/budget/BudgetSection";
import CategorySection from "../components/category/CategorySection";
import { getCurrentPeriodKey, getMonthAndYearFromPeriodKey, createPeriodKey } from "../utils/period";
import { useBudgetManager } from "../hooks/useBudgetManger"
import ScreenContainer from "../UI/ScreenContainer";

export default function HomeScreen() {

  const [isBudgetFormOpen, setIsBudgetFormOpen] = useState(false);
  const [budgetInputValue, setBudgetInputValue] = useState("");
  const [budgetErrorMessage, setBudgetErrorMessage] = useState("");

  const [categoryInputValue, setCategoryInputValue] = useState("");
  const [categoryErrorMessage, setCategoryErrorMessage] = useState("");

  const {
    selectedBudget,
    createBudget,
    addCategoryToSelectedBudget,
    addMoneyToCategoryInSelectedBudget,
    deleteCategoryFromSelectedBudget,
    editCategoryInSelectedBudget,
    addExpenseToCategoryInSelectedBudget,
    addSubcategoryToSelectedBudget,
  } = useBudgetManager(); useBudgetManager();

  const openBudgetForm = () => {
    setIsBudgetFormOpen(true);
  };

  const closeBudgetForm = () => {
    setIsBudgetFormOpen(false);
    setBudgetErrorMessage("");
    setBudgetInputValue("");
  };

  const saveBudget = () => {
    const parsedBudget = Number(budgetInputValue);

    if (Number.isNaN(parsedBudget) || parsedBudget <= 0) {
      setBudgetErrorMessage("The budget must be greater than 0.");
      return;
    }

    const errorMessage = createBudget(parsedBudget);

    if (errorMessage !== null) {
      setBudgetErrorMessage(errorMessage);
      return;
    }

    setBudgetInputValue("");
    setBudgetErrorMessage("");
    setIsBudgetFormOpen(false);
  };

  const addCategory = () => {
    const categoryName = categoryInputValue.trim();

    if (categoryName === "") {
      setCategoryErrorMessage("You can't add an empty category.");
      return;
    }

    const errorMessage = addCategoryToSelectedBudget(categoryName);

    if (errorMessage !== null) {
      setCategoryErrorMessage(errorMessage);
      return;
    }

    setCategoryInputValue("");
    setCategoryErrorMessage("");
  };

  return (
    <ScreenContainer>
      <BudgetSection
        monthlyBudget={selectedBudget}
        isBudgetFormOpen={isBudgetFormOpen}
        budgetInputValue={budgetInputValue}
        budgetErrorMessage={budgetErrorMessage}
        onOpenBudgetForm={openBudgetForm}
        onCloseBudgetForm={closeBudgetForm}
        onSaveBudget={saveBudget}
        onChangeBudgetInputValue={setBudgetInputValue}
      />

      {selectedBudget !== null && (
        <CategorySection
          categories={selectedBudget.categories}
          categoryInputValue={categoryInputValue}
          categoryErrorMessage={categoryErrorMessage}
          onAddCategory={addCategory}
          onAddExpenseToCategory={addExpenseToCategoryInSelectedBudget}
          onAddSubcategory={addSubcategoryToSelectedBudget}
          onAddMoneyToCategory={addMoneyToCategoryInSelectedBudget}
          onChangeCategoryInputValue={setCategoryInputValue}
          onEditCategory={editCategoryInSelectedBudget}
          onDeleteCategory={deleteCategoryFromSelectedBudget}
        />
      )}
    </ScreenContainer>
  );
}



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  content: {
    padding: 16,
    gap: 20,
    paddingBottom: 40,
  },
  emptyBudgetContainer: {
    gap: 12,
  },
  emptyBudgetText: {
    fontSize: 16,
  },
  budgetCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    gap: 8,
  },
  budgetLabel: {
    fontSize: 16,
  },
  budgetAmount: {
    fontSize: 32,
    fontWeight: "700",
  },
  formContainer: {
    gap: 12,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    color: "red",
  },
  primaryButton: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#111827",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  secondaryButton: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#eeeeee",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#111827",
    fontWeight: "700",
  },
});