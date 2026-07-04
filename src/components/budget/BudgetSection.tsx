import { Text, View } from "react-native";
import type { BudgetSectionProps } from "../../types";
import { styles } from "./BudgetSection.styles";
import AppButton from "../../UI/AppButton";
import AppInput from "../../UI/AppInput";
import AppCard from "../../UI/AppCard";

export default function BudgetSection({
  monthlyBudget,
  isBudgetFormOpen,
  budgetInputValue,
  budgetErrorMessage,
  onOpenBudgetForm,
  onCloseBudgetForm,
  onSaveBudget,
  onChangeBudgetInputValue,
}: BudgetSectionProps) {
  return (
    <View style={styles.section}>
      {monthlyBudget === null && (
        <AppCard>
          <Text style={styles.emptyBudgetText}>
            Add your monthly budget for your games or other funny stuff
          </Text>

          <AppButton title="Add Budget" onPress={onOpenBudgetForm} />
        </AppCard>
      )}

      {monthlyBudget !== null && (
        <AppCard>
          <Text style={styles.budgetLabel}>Your monthly budget</Text>
          <Text style={styles.budgetAmount}>{monthlyBudget.amount} €</Text>
        </AppCard>
      )}

      {isBudgetFormOpen && (
        <AppCard>
          <Text style={styles.formTitle}>Add your monthly budget</Text>

          <AppInput
            value={budgetInputValue}
            onChangeText={onChangeBudgetInputValue}
            placeholder="Enter a number bigger than 0"
            keyboardType="numeric"
          />

          {budgetErrorMessage !== "" && (
            <Text style={styles.errorText}>{budgetErrorMessage}</Text>
          )}

          <AppButton title="Save Budget" onPress={onSaveBudget} />

          <AppButton
            title="Cancel"
            variant="secondary"
            onPress={onCloseBudgetForm}
          />
        </AppCard>
      )}
    </View>
  );
}