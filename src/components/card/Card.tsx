import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

import { Dimensions } from "react-native";

export default function Card({ id, title }: { id: string; title: string }) {
  const screenWidth = Dimensions.get("window").width;

  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/card/" + id);
      }}
      className="bg-white border border-gray-200 shadow-sm p-8 mb-3 rounded-lg flex flex-row items-center justify-between"
      style={{
        width: screenWidth - 48,
      }}
    >
      <Text className="text-gray-500 text-lg">{title}</Text>
      <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
    </TouchableOpacity>
  );
}
