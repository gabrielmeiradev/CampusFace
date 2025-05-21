import { ICard } from "@/interfaces/card";

export async function getCardById(id: string): Promise<ICard> {
  return {
    id,
    title: "Fatec Zona Leste",
    authCode: "gabriel",
    expirationDate: new Date(Date.now() + 30000),
  };
}
