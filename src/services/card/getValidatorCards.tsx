import { ICardInUser } from "@/interfaces/user";

export async function getValidatorCards(): Promise<ICardInUser[]> {
  return [
    {
      id: "1",
      title: "Fatec Zona Leste",
    },
  ];
}
