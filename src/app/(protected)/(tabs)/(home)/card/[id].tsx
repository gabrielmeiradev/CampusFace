import { ICard } from "@/interfaces/card";
import { getCardById } from "@/services/card/getCardById";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function Card() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [card, setCard] = useState<ICard | null>(null);
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    if (remaining === 0) {
      getCardById(id).then(setCard);
    }
  }, [remaining, id]);

  useEffect(() => {
    getCardById(id).then((card) => {
      setCard(card);
      if (card) {
        const expiration = new Date(card.expirationDate).getTime();
        const now = Date.now();
        setRemaining(Math.max(0, expiration - now));
      }
    });
  }, [id]);

  // Update remaining time every second
  useEffect(() => {
    if (!card) return;
    function updateRemaining() {
      const expiration = new Date(card!.expirationDate).getTime();
      const now = Date.now();
      setRemaining(Math.max(0, expiration - now));
    }
    updateRemaining();
    const timer = setInterval(updateRemaining, 1000);
    return () => clearInterval(timer);
  }, [card]);

  if (!card) {
    return <></>;
  }

  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  if (card == null) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Stack.Screen options={{ title: card.title }} />
      <QRCode value={card.authCode} backgroundColor="transparent" size={230} />
      <Text className="text-gray-500 text-lg mt-4">
        {`Expira em ${minutes}:${seconds.toString().padStart(2, "0")}`}
      </Text>
    </View>
  );
}
