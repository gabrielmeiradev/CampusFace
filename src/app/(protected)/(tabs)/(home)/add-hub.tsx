import { Input } from "@/components/Input";
import { useState } from "react";
import { View } from "react-native";

export default function AddHubPage() {
  const [search, setSearch] = useState("");
  return (
    <View className="p-4">
      <Input
        placeholder="Pesquise o hub"
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
}
