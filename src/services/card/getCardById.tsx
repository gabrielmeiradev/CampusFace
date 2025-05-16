import { ICard } from "@/interfaces/card";

export async function getCardById(id: string): Promise<ICard> {
  return {
    id,
    title: "Card Title Here",
    authCode: Math.random().toString(36).substring(2, 15),
    expirationDate: new Date(Date.now() + 7000),
  };
}
