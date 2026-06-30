import { View } from "react-native";
import type { CategoryListProps } from "../../types";
import CategoryCard from "./CategoryCard";
import { styles } from "./CategoryList.styles";

export default function CategoryList({
  categories,
  onAddSubcategory,
  onAddExpenseToCategory,
  onAddMoneyToCategory,
  onEditCategory,
  onDeleteCategory,
}: CategoryListProps) {
  return (
    <View style={styles.list}>
      {categories.map((item) => (
        <CategoryCard
          key={item.id}
          category={item}
          onAddExpenseToCategory={onAddExpenseToCategory}
          onAddMoneyToCategory={onAddMoneyToCategory}
          onAddSubcategory={onAddSubcategory}
          onDeleteCategory={onDeleteCategory}
          onEditCategory={onEditCategory}
        />
      ))}
    </View>
  );
}