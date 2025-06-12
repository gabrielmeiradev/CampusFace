import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(validate_options)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
