import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';



export default function AppHeader() {
    // aquí va el estado
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // aquí va la función
    const toggleMenu = () => {
        setIsMenuOpen((previousValue) => !previousValue);
    };

    return (
        <View style={styles.header}>
            <View  style={styles.headerRow}>
                <Text style={styles.title}>Budget Manager</Text>

                <Pressable style={styles.burgerButton} onPress={toggleMenu}>
                    <Text style={styles.burgerIcon}>{isMenuOpen ? '×' : '☰'}</Text>
                </Pressable>
            </View>
            {isMenuOpen && (
                <View style={styles.burgerMenu}>
                    <Text style={styles.insideMenuText}>Home</Text>
                    <Text style={styles.insideMenuText}>Exportar</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white'
    },

    headerRow: {
        height: 64,
        paddingHorizontal: 20,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap : 23
    },

    title: {
        fontSize: 20,
        fontWeight: '700'
    },
    burgerIcon: {
        fontSize: 28
    },
    burgerButton: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    insideMenuText:{
        fontSize: 17,
        fontWeight: '500'
    },
    burgerMenu: {
        backgroundColor: "red",
    }
});