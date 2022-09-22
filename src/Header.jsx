import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ubicá tu bus</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
  },
});
