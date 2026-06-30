import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { BudgetSectionProps } from "../../types";
import { styles } from "./BudgetSection.styles";

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
    <View>
      {monthlyBudget === null && (
        <View style={styles.emptyBudgetContainer}>
          <Text style={styles.emptyBudgetText}>
            Add your monthly budget for your games or other funny stuff
          </Text>

          <Pressable style={styles.primaryButton} onPress={onOpenBudgetForm}>
            <Text style={styles.primaryButtonText}>Add Budget</Text>
          </Pressable>
        </View>
      )}

      {monthlyBudget !== null && (
        <View style={styles.budgetCard}>
          <Text style={styles.budgetLabel}>Your monthly budget</Text>
          <Text style={styles.budgetAmount}>{monthlyBudget.amount} €</Text>
        </View>
      )}

      {isBudgetFormOpen && (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Add your monthly budget</Text>

          <TextInput
            style={styles.input}
            value={budgetInputValue}
            onChangeText={onChangeBudgetInputValue}
            placeholder="Enter a number bigger than 0"
          />

          {budgetErrorMessage !== "" && (
            <Text style={styles.errorText}>{budgetErrorMessage}</Text>
          )}

          <Pressable style={styles.primaryButton} onPress={onSaveBudget}>
            <Text style={styles.primaryButtonText}>Save Budget</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={onCloseBudgetForm}>
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
