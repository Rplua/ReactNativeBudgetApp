import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type {
  MonthlyBudget,
  CategoryBudget,
  Expense,
  SubcategoryBudget,
} from "../types";
import BudgetSection from "../components/budget/BudgetSection";
import CategorySection from "../components/category/CategorySection";


export default function HomeScreen() {
  const [monthlyBudget, setMonthlyBudget] = useState<MonthlyBudget | null>(
    null,
  );
  const [isBudgetFormOpen, setIsBudgetFormOpen] = useState(false);
  const [budgetInputValue, setBudgetInputValue] = useState("");
  const [budgetErrorMessage, setBudgetErrorMessage] = useState("");

  const [categoryInputValue, setCategoryInputValue] = useState("");
  const [categoryErrorMessage, setCategoryErrorMessage] = useState("");

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
    let date = new Date();

    const newBudget: MonthlyBudget = {
      id: Date.now().toString(),
      amount: parsedBudget,
      currency: "EUR",
      month: getNumberOfMonth(date),
      year: date.getFullYear(),
      categories: [],
    };

    setMonthlyBudget(newBudget);
    setBudgetInputValue("");
    setBudgetErrorMessage("");
    setIsBudgetFormOpen(false);
  };

  const getNumberOfMonth = (date: Date) => {
    return date.getMonth() + 1;
  };

  const addCategory = () => {
    if (monthlyBudget === null) {
      setCategoryErrorMessage("Create a monthly budget first.");
      return;
    }

    const categoryName = categoryInputValue.trim();

    if (categoryName === "") {
      setCategoryErrorMessage("You can't add an empty category.");
      return;
    }

    const categoryAlreadyExists = monthlyBudget.categories.some(
      (existingCategory) =>
        existingCategory.name.toLowerCase() === categoryName.toLowerCase(),
    );

    if (categoryAlreadyExists) {
      setCategoryErrorMessage("You can't add the same category twice.");
      return;
    }

    const newCategory: CategoryBudget = {
      id: Date.now().toString(),
      name: categoryName,
      allocatedAmount: 0,
      description: null,
      subcategories: [],
      expenses: [],
    };

    setMonthlyBudget((previousBudget) => {
      if (previousBudget === null) {
        return previousBudget;
      }

      return {
        ...previousBudget,
        categories: [...previousBudget.categories, newCategory],
      };
    });

    setCategoryInputValue("");
    setCategoryErrorMessage("");
  };

  const addMoneyToCategory = (categoryId: string, amount: number) => {
    setMonthlyBudget((previousBudget) => {
      if (previousBudget === null) {
        return previousBudget;
      }

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

  const onDeleteCategory = (categoriesId: string) => {
    setMonthlyBudget((previousBudget) => {
      if (previousBudget === null) {
        return previousBudget
      }
      return {
        ...previousBudget,
        categories: previousBudget.categories.filter((category) => category.id != category.id)
      }
    })
  }

  const editCategory = (updatedCategory: CategoryBudget) => {
    setMonthlyBudget((previousBudget) => {
      if (previousBudget === null) {
        return previousBudget;
      }

      return {
        ...previousBudget,
        categories: previousBudget.categories.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        ),
      };
    });
  };

  const addExpenseToCategory = (categoryId: string, expense: Expense) => {
    setMonthlyBudget((previousBudget) => {
      if (previousBudget === null) {
        return previousBudget;
      }

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

  const addSubcategory = (
  categoryId: string,
  subcategory: SubcategoryBudget
) => {
  setMonthlyBudget((previousBudget) => {
    if (previousBudget === null) {
      return previousBudget;
    }

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

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Componente Budget */}
        <BudgetSection
          monthlyBudget={monthlyBudget}
          isBudgetFormOpen={isBudgetFormOpen}
          budgetInputValue={budgetInputValue}
          budgetErrorMessage={budgetErrorMessage}
          onOpenBudgetForm={openBudgetForm}
          onCloseBudgetForm={closeBudgetForm}
          onSaveBudget={saveBudget}
          onChangeBudgetInputValue={setBudgetInputValue}
        ></BudgetSection>
        <View>
          {/* Componente Category */}
          {monthlyBudget != null && (
            <CategorySection
              categories={monthlyBudget.categories}
              categoryInputValue={categoryInputValue}
              categoryErrorMessage={categoryErrorMessage}
              onAddCategory={addCategory}
              onAddExpenseToCategory={ addExpenseToCategory}
              onAddSubcategory={ addSubcategory}
              onAddMoneyToCategory={addMoneyToCategory}
              onChangeCategoryInputValue={setCategoryInputValue}
              onEditCategory={editCategory}
              onDeleteCategory={onDeleteCategory}
            ></CategorySection>
          )}
        </View>
      </View>
    </View>
  );
}



export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 20,
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