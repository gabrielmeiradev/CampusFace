import { router } from "expo-router";
import { Button } from "../Button";

export default function AddHub() {
  return (
    <Button
      title="Adicionar Hub"
      theme="secondary"
      onPress={() => {
        router.push("/add-hub");
      }}
    />
  );
}
