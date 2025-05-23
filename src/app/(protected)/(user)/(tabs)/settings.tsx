import { View } from "react-native";
import { Button } from "@/components/Button";
import { useContext } from "react";
import { AuthContext } from "@/utils/authContext";

export default function SettingsScreen() {
  const authState = useContext(AuthContext);

  return (
    <View className="justify-center flex-1 p-4">
      <Button title="Sair da conta" onPress={authState.logOut} />
    </View>
  );
}
