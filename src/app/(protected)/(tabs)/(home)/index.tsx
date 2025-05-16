import { AppText } from "@/components/AppText";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import CardContainer from "@/components/card/CardContainer";
import { router } from "expo-router";

export default function IndexScreen() {
  return (
    <View className="justify-center items-center flex-1 p-4">
      <AddCard />
    </View>
  );
}

function AddCard() {
  return (
    <>
      <CardContainer
        onPress={() => {
          router.push("/add-card");
        }}
      >
        <View className="flex-1 justify-center items-center">
          <View className="flex-row items-center gap-3">
            <MaterialCommunityIcons
              name="card-plus"
              size={30}
              className="text-gray-300"
            />
            <AppText className="!m-0 text-gray-300">Adicionar Card</AppText>
          </View>
        </View>
      </CardContainer>
    </>
  );
}
