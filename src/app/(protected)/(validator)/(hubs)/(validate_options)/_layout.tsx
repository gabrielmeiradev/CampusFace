import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Opções de validação" }} />
      <Stack.Screen name="qrcode" options={{ title: "QR Code" }} />
      <Stack.Screen
        name="facial"
        options={{ title: "Reconhecimento facial" }}
      />
    </Stack>
  );
}
