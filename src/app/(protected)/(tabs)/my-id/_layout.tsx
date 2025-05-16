import { Stack, usePathname } from "expo-router";

export default function Layout() {
  const pathname = usePathname();

  return (
    <Stack
      screenOptions={{
        animation: pathname.startsWith("/my-id") ? "default" : "none",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Minha ID" }} />
    </Stack>
  );
}
