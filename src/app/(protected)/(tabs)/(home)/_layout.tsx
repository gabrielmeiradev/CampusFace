import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Meus cards" }} />
      <Stack.Screen name="add-hub" options={{ title: "Adicionar Hub" }} />
      <Stack.Screen name="card" options={{ headerShown: false }} />
    </Stack>
  );
}
