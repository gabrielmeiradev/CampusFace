import { Stack } from "expo-router";
import "../../global.css";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/utils/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="(protected)/(user)"
          options={{
            animation: "none",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(protected)/(validator)"
          options={{
            animation: "none",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
