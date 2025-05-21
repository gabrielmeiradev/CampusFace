import AddHub from "@/components/card/AddHub";
import Card, { StatusType } from "@/components/card/Card";
import { getUserCards } from "@/services/card/getUsersCards";
import { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";

export default function IndexScreen() {
  const [cards, setCards] = useState<any[]>([]);
  const [status, setStatus] = useState(StatusType.WAITING);

  useEffect(() => {
    const fetchCards = async () => {
      const data = await getUserCards();
      setCards(data);
    };
    fetchCards();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus(StatusType.ACCEPTED);
    }, 5000);
    return () => clearTimeout(timer);
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
              status={status}
            />
          );
        })}

        <AddHub />
      </View>
    </ScrollView>
  );
}
