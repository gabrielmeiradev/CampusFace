import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { AuthContext } from "@/utils/authContext";
import { useContext, useState } from "react";
import { Image, View } from "react-native";

export default function LoginScreen() {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    try {
      authContext.logIn(email, password);
      console.log("Login successful");
    } catch (error) {
      alert((error as Error).message);
    }
  }

  return (
    <View className="flex-1 justify-center p-5">
      <Image
        source={require("@/assets/logo.svg")}
        className="mb-8 h-20 w-20 self-center"
      />
      <View className="mb-4">
        <AppText size="heading" className="!mb-2" center bold>
          Entre agora
        </AppText>
        <AppText size="medium" color="secondary" center>
          Entre com sua conta do hub
        </AppText>
      </View>
      <View className="mb-4 flex flex-col gap-3">
        <Input
          placeholder="E-mail da conta"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Senha da conta"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <Button title="Entrar" onPress={() => handleLogin()} />
    </View>
  );
}
