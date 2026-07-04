import type { ReactNode } from "react";
import { View } from "react-native";
import { styles } from "./AppCard.styles"

interface AppCardProps {
    children: ReactNode;
}

export default function AppCard({ children }: AppCardProps) {
    return <View style={styles.card}>{children}</View>;
}