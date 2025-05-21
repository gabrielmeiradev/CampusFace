import { Input } from "@/components/Input";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const hubs = ["Fatec Zona Leste"];

export default function AddHubPage() {
  const [search, setSearch] = useState("");

  const filteredHubs =
    search.trim() !== ""
      ? hubs.filter((hub) => hub.toLowerCase().includes(search.toLowerCase()))
      : [];

  return (
    <View className="flex-1 bg-white p-4">
      <Input
        placeholder="Pesquise o hub"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredHubs}
        className="mt-4"
        keyExtractor={(item) => item}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            className="mb-3 rounded-xl bg-gray-100 p-4 border border-gray-200"
            activeOpacity={0.8}
          >
            <Text className="text-lg font-semibold text-gray-800">{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
