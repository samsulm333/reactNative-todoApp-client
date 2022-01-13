import "react-native-gesture-handler";

import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DoneTaskScreen from "./src/screens/DoneTaskScreen";
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <View style={styles.header}>
        <Text style={styles.headerText}>Todo List App</Text>
      </View>
      <Stack.Navigator
        initialRouteName="Todo List"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Todo List" component={HomeScreen} />
        <Stack.Screen name="Complete Task" component={DoneTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "9%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A043C",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
