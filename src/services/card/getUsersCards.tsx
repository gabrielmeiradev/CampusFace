import { ICardInUser } from "@/interfaces/user";

export async function getUserCards(): Promise<ICardInUser[]> {
  return [
    {
      id: "1",
      title: "Fatec Zona Leste",
    },
  ];
}
