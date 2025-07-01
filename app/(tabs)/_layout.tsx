import { Tabs } from "expo-router";
import  Ionicons  from "@expo/vector-icons/Ionicons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "#ffd33d",
      headerStyle: {
        backgroundColor: "#25292e",
      },
      headerShown: false,
      headerShadowVisible: false,
      headerTintColor: "#fff",
      tabBarStyle: {
        backgroundColor: "#25292e",
      },
    }}>
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? "home-sharp" : "home-outline"} color={color} size={size} /> }} />
      <Tabs.Screen name="about" options={{ title: "About", tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? "information-circle" : "information-circle-outline"} color={color} size={size} /> }} />
    </Tabs>
  );
}