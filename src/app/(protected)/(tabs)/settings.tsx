import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/utils/authContext";

export default function FourthScreen() {
  const router = useRouter();
  const authState = useContext(AuthContext);

  return (
    <View className="justify-center flex-1 p-4">
      <Button title="Sair da conta" onPress={authState.logOut} />
    </View>
  );
}
