import { Button } from "@/components/Button";
import { AuthContext } from "@/utils/authContext";
import { useContext } from "react";
import { View } from "react-native";

export default function Settings() {
  const authState = useContext(AuthContext);
  return (
    <View className="flex-1 items-center justify-center">
      <Button title="Sair da conta" onPress={authState.logOut} />
    </View>
  );
}
