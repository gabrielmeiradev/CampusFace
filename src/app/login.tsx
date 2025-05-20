import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { AuthContext } from "@/utils/authContext";
import { Link, router } from "expo-router";
import { useContext, useState } from "react";
import { Image, View } from "react-native";

export default function LoginScreen() {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    try {
      authContext.logIn(username, password);
      console.log("Login successful");
    } catch (error) {
      alert((error as Error).message);
    }
  }

  return (
    <View className="flex-1 justify-center p-5">
      <Image
        source={require("@/assets/logo.png")}
        className="mb-8 self-center"
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
          placeholder="Nome de usuário"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          placeholder="Senha da conta"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <Button title="Entrar" onPress={() => handleLogin()} />

      <Button
        title="Não tenho uma conta"
        theme={"secondary"}
        onPress={() => {
          router.push("/register");
        }}
      />
    </View>
  );
}
