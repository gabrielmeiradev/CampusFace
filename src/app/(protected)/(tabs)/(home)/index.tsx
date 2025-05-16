import AddCard from "@/components/card/AddCard";
import Card from "@/components/card/Card";
import { getUserCards } from "@/services/card/getUsersCards";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function IndexScreen() {
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      const data = await getUserCards();
      setCards(data);
    };
    fetchCards();
  }, []);
  return (
    <ScrollView className="justify-center items-center flex-1">
      <View className="pt-3">
        {cards.map((card) => (
          <Card key={card.id} id={card.id} title={card.title} />
        ))}

        <AddCard />
      </View>
    </ScrollView>
  );
}
