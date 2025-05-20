import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { AuthContext } from "@/utils/authContext";
import { useContext, useState } from "react";
import {
  Image,
  View,
  Switch,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { RegisterUser } from "@/interfaces/UserRegistration";

interface UserData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: Date;
  cpf: string;
  roles: string[];
  disabled: boolean;
}

export default function RegisterScreen() {
  const authContext = useContext(AuthContext);

  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: new Date(),
    cpf: "",
    roles: ["user"],
    disabled: false,
  });

  const [showDatePicker, setShowDatePicker] = useState<boolean>(
    Platform.OS === "ios"
  );

  // Format CPF as user types (xxx.xxx.xxx-xx)
  const formatCPF = (text: string): string => {
    const cleaned = text.replace(/\D/g, "");
    let formatted = cleaned;

    if (cleaned.length > 3) {
      formatted = cleaned.substring(0, 3) + "." + cleaned.substring(3);
    }
    if (cleaned.length > 6) {
      formatted = formatted.substring(0, 7) + "." + formatted.substring(7);
    }
    if (cleaned.length > 9) {
      formatted =
        formatted.substring(0, 11) + "-" + formatted.substring(11, 13);
    }

    return formatted.substring(0, 14);
  };

  const handleInputChange = (
    field: keyof UserData,
    value: string | boolean | Date
  ) => {
    if (field === "cpf" && typeof value === "string") {
      setUserData({
        ...userData,
        [field]: formatCPF(value),
      });
    } else {
      setUserData({
        ...userData,
        [field]: value,
      });
    }
  };

  const clearInputs = () => {
    setUserData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthDate: new Date(),
      cpf: "",
      roles: ["user"],
      disabled: false,
    });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
      if (selectedDate) {
        handleInputChange("birthDate", selectedDate);
      }
    } else if (selectedDate) {
      handleInputChange("birthDate", selectedDate);
    }
  };

  const handleRegistration = () => {
    if (userData.password !== userData.confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    if (!userData.username || !userData.email || !userData.cpf) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    const user: RegisterUser = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      birthDate: userData.birthDate.toISOString(),
      cpf: userData.cpf,
      roles: userData.roles,
      disabled: userData.disabled,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      authContext.register(user);
      console.log("Registration data:", user);
      alert("Registro realizado com sucesso!");
      clearInputs();
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const formatDateForDisplay = (date: Date): string => {
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex-1 justify-center p-5">
          <Image
            source={require("@/assets/logo.png")}
            className="mb-8 self-center"
          />

          <View className="mb-4">
            <AppText size="heading" className="!mb-2" center bold>
              Criar nova conta
            </AppText>
            <AppText size="medium" color="secondary" center>
              Preencha seus dados para se registrar
            </AppText>
          </View>

          <View className="mb-4 flex flex-col gap-3">
            <Input
              placeholder="Nome de usuário"
              value={userData.username}
              onChangeText={(text) => handleInputChange("username", text)}
            />

            <Input
              placeholder="E-mail"
              value={userData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              placeholder="Senha"
              value={userData.password}
              onChangeText={(text) => handleInputChange("password", text)}
              secureTextEntry
            />

            <Input
              placeholder="Confirmar senha"
              value={userData.confirmPassword}
              onChangeText={(text) =>
                handleInputChange("confirmPassword", text)
              }
              secureTextEntry
            />

            <Input
              placeholder="CPF (xxx.xxx.xxx-xx)"
              value={userData.cpf}
              onChangeText={(text) => handleInputChange("cpf", text)}
              keyboardType="numeric"
              maxLength={14}
            />

            <View className="mb-2">
              <AppText size="small" color="secondary" className="mb-1">
                Data de nascimento
              </AppText>

              {Platform.OS === "android" && (
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className="border p-3 rounded-md border-gray-300"
                >
                  <AppText>{formatDateForDisplay(userData.birthDate)}</AppText>
                </TouchableOpacity>
              )}

              {showDatePicker && (
                <DateTimePicker
                  value={userData.birthDate}
                  mode="date"
                  display={"default"}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}

              {Platform.OS === "ios" && !showDatePicker && (
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <AppText className="text-blue-500">Selecionar data</AppText>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <Button title="Cadastrar" onPress={handleRegistration} />

          <Button
            title="Já tenho uma conta"
            theme={"secondary"}
            onPress={() => {
              router.push("/login");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
