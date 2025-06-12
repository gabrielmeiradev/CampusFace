import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StudentProvider } from "./contexts/StudentContext";

export default function Layout() {
  return (
    <StudentProvider>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName = "";
            if (route.name === "(hubs)") {
              iconName = focused ? "grid" : "grid-outline";
            } else if (route.name === "students") {
              iconName = focused ? "people" : "people-outline";
            } else if (route.name === "settings") {
              iconName = focused ? "settings" : "settings-outline";
            }
            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: "#1C1B1F",
          headerShown: true,
        })}
      >
        <Tabs.Screen name="(hubs)" options={{ title: "Meus hubs" }} />
        <Tabs.Screen name="students" options={{ title: "Diário" }} />
        <Tabs.Screen name="settings" options={{ title: "Configurações" }} />
        {/* <Tabs.Screen
          name="(validate_options)"
          options={{ headerShown: false, href: null }}
        /> */}
      </Tabs>
    </StudentProvider>
  );
}
