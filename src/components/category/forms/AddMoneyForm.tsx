import AppCard from "../../../UI/AppCard";
import { Text, View } from 'react-native'
import AppButton from '../../../UI/AppButton'
import AppInput from '../../../UI/AppInput'
import type { AddMoneyFormProps } from '../../../types'
import { useState } from 'react'
import { styles } from './AddMoneyForm.styles';

export default function AddMoneyForm({ onSave, onCancel }: AddMoneyFormProps) {
    const [moneyInputValue, setMoneyInputValue] = useState("");
    const [moneyErrorMessage, setMoneyErrorMessage] = useState("");

    const handleSaveMoney = () => {
        const parsedAmount = Number(moneyInputValue);

        if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
            setMoneyErrorMessage("Value should be greater than 0.");
            return;
        }

        onSave(parsedAmount)
        setMoneyInputValue("");
        setMoneyErrorMessage("");
    };

    return (
        <View style={styles.form}>
            <Text style={styles.formTitle}>Add money</Text>

            <AppInput
                value={moneyInputValue}
                onChangeText={setMoneyInputValue}
                placeholder="Amount greater than 0"
                keyboardType="numeric"
            />

            {moneyErrorMessage !== "" && (
                <Text style={styles.errorText}>{moneyErrorMessage}</Text>
            )}

            <View style={styles.formActions}>
                <View style={styles.buttonWrapper}>
                    <AppButton
                        title="Cancel"
                        variant="secondary"
                        onPress={onCancel}
                    />
                </View>

                <View style={styles.buttonWrapper}>
                    <AppButton
                        title="Save"
                        variant="primary"
                        onPress={handleSaveMoney}
                    />
                </View>
            </View>
        </View>
    )
}