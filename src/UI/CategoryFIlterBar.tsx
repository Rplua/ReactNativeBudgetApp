import type { CategoryFilterBarProps } from "../types";
import { View } from "react-native";
import AppButton from "./AppButton";
import { styles } from "./CategoryFilterBar.styles";
import AppInput from "./AppInput";
export default function CategoryFilterBar({
    searchText,
    sortOption,
    onChangeSearchText,
    onChangeSortOption,
}: CategoryFilterBarProps) {
    return (
        <View style={styles.container}>
            <AppInput
                value={searchText}
                onChangeText={onChangeSearchText}
                placeholder="Search categories"
            />

            <View style={styles.sortButtons}>
                <AppButton
                    title="Newest"
                    variant={sortOption === "newest" ? "primary" : "secondary"}
                    onPress={() => onChangeSortOption("newest")}
                />

                <AppButton
                    title="A-Z"
                    variant={sortOption === "name-asc" ? "primary" : "secondary"}
                    onPress={() => onChangeSortOption("name-asc")}
                />

                <AppButton
                    title="Z-A"
                    variant={sortOption === "name-desc" ? "primary" : "secondary"}
                    onPress={() => onChangeSortOption("name-desc")}
                />

                <AppButton
                    title="Amount ↑"
                    variant={sortOption === "amount-asc" ? "primary" : "secondary"}
                    onPress={() => onChangeSortOption("amount-asc")}
                />

                <AppButton
                    title="Amount ↓"
                    variant={sortOption === "amount-desc" ? "primary" : "secondary"}
                    onPress={() => onChangeSortOption("amount-desc")}
                />
            </View>
        </View>
    );
}