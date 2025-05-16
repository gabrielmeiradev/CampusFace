import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Meus cards" }} />
      <Stack.Screen name="add-card" options={{ title: "Adicionar card" }} />
    </Stack>
  );
}
