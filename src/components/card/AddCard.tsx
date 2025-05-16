import { router } from "expo-router";
import { Button } from "../Button";

export default function AddCard() {
  return (
    <Button
      title="Adicionar Card"
      theme="secondary"
      onPress={() => {
        router.push("/add-card");
      }}
    />
  );
}
