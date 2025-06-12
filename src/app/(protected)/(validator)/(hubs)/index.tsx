// app/scanner.tsx
import AddHub from "@/components/card/AddHub";
import Card, { StatusType } from "@/components/card/Card";
import { ICardInUser } from "@/interfaces/user";
import { getValidatorCards } from "@/services/card/getValidatorCards";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";

export default function HubsScreen() {
  const [cards, setCards] = useState<ICardInUser[]>([]);
  useEffect(() => {
    const fetchCards = async () => {
      const data = await getValidatorCards();
      setCards(data);
    };
    fetchCards();
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <View style={{ paddingTop: 12 }}>
        {cards.length === 0 && (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg font-semibold">
              Você ainda não participa de um Hub
            </Text>
          </View>
        )}
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              status={StatusType.WAITING}
              onPress={(id) => {
                router.push("/(validate_options)");
              }}
            />
          );
        })}

        <AddHub />
      </View>
    </ScrollView>
  );
}
