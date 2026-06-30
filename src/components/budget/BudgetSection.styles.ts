import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  emptyBudgetContainer: {
    gap: 12,
  },
  emptyBudgetText: {
    fontSize: 16,
  },
  budgetCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    gap: 8,
  },
  budgetLabel: {
    fontSize: 16,
  },
  budgetAmount: {
    fontSize: 32,
    fontWeight: '700',
  },
  formContainer: {
    gap: 12,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
  },
  primaryButton: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#111827',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  secondaryButton: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#111827',
    fontWeight: '700',
  },
});