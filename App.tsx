import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import AppHeader from './src/components/AppHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader></AppHeader>
      <HomeScreen />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  }
})
