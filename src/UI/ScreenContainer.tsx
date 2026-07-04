import type { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./ScreenContainer.styles"

interface ScreenContainerProps {
    children: ReactNode;
    scroll?: boolean;
}

export default function ScreenContainer({
    children,
    scroll = true,
}: ScreenContainerProps) {
    if (scroll) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.content}
                >
                    {children}
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>{children}</View>
        </SafeAreaView>
    );
}
