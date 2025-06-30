import { Text, View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This screen does not exist.</Text>
      <Link href="/" style={styles.button}>Go to home screen!</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    color: "purple",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "blue",
  },
});