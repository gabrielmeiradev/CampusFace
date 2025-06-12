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
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { RegisterUser } from "@/interfaces/UserRegistration";
import RoleSwitcher from "@/components/RoleSwitcher";
import * as ImagePicker from "expo-image-picker";

interface UserData {
  username: string;
  name: string; // Optional, can be same as username
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: Date;
  cpf: string;
  role: string;
  disabled: boolean;
  image?: ImagePicker.ImagePickerAsset;
}

export default function RegisterScreen() {
  const authContext = useContext(AuthContext);

  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    birthDate: new Date(),
    cpf: "",
    role: "client", // Default role, can be 'user' or 'integrante' or other
    disabled: false,
    image: undefined,
  });

  const setRole = (role: string) => {
    setUserData((prevState) => ({
      ...prevState,
      role: role,
      // Optionally reset image if role changes from 'integrante'
      // image: role !== "integrante" ? undefined : prevState.image,
    }));
  };

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
      name: "",
      confirmPassword: "",
      birthDate: new Date(),
      cpf: "",
      role: "client",
      disabled: false,
      image: undefined,
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

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de permissão para acessar suas fotos."
      );
      return false;
    }
    return true;
  };

  const selectimage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    Alert.alert("Selecionar foto", "Escolha uma opção:", [
      {
        text: "Galeria",
        onPress: () => openImagePicker("gallery"),
      },
      {
        text: "Câmera",
        onPress: () => openImagePicker("camera"),
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  };

  const openImagePicker = async (source: "gallery" | "camera") => {
    try {
      let result;

      if (source === "camera") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permissão necessária",
            "Precisamos de permissão para usar a câmera."
          );
          return;
        }

        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setUserData({
          ...userData,
          image: result.assets[0],
        });
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível selecionar a imagem.");
    }
  };

  const removeimage = () => {
    setUserData({
      ...userData,
      image: undefined,
    });
  };

  const handleRegistration = async () => {
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
      role: userData.role,
      disabled: userData.disabled,
      image: userData.image, // Only include image if role is 'integrante'
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      name: userData.name, // Assuming username is used as name
    };

    authContext
      .register(user)
      .then(() => {
        clearInputs();
        router.push("/login");
      })
      .catch((error: Error) => {
        console.error("Erro ao registrar usuário:", error);
        Alert.alert(
          "Erro",
          "Não foi possível registrar o usuário. Tente novamente."
        );
      });
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

          <RoleSwitcher value={userData.role} setValue={setRole} />

          <View className="mb-4 flex flex-col gap-3 mt-6">
            {/* image Section - Conditional Rendering */}
            {userData.role == "client" && (
              <View className="mb-4 items-center">
                <View className="relative">
                  {userData.image ? (
                    <View className="items-center">
                      <Image
                        source={{ uri: userData.image.uri }}
                        className="w-36 h-36 rounded-full"
                      />
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={selectimage}
                      className="w-36 h-36 rounded-full border-2 border-dashed border-gray-400 items-center justify-center bg-gray-100"
                    >
                      <AppText
                        size="small"
                        color="secondary"
                        className="text-center"
                      >
                        Adicionar{"\n"}Foto
                      </AppText>
                    </TouchableOpacity>
                  )}
                </View>

                {userData.image && (
                  <TouchableOpacity onPress={selectimage} className="mt-2">
                    <AppText size="small" className="text-blue-500">
                      Alterar foto
                    </AppText>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <Input
              placeholder="Nome completo"
              value={userData.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
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
            <View className="mb-2 flex-row items-center justify-between px-1">
              <AppText size="small" color="secondary">
                Data de nascimento:
              </AppText>

              {Platform.OS === "android" && (
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className="border p-3 rounded-md border-gray-300 bg-white" // Added bg-white for better visibility
                >
                  <AppText>{formatDateForDisplay(userData.birthDate)}</AppText>
                </TouchableOpacity>
              )}

              {showDatePicker && (
                <DateTimePicker
                  value={userData.birthDate}
                  mode="date"
                  display={"default"} // can be "spinner", "calendar"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                  // style={{ width: Platform.OS === 'ios' ? '100%' : undefined }} // Full width for iOS if desired
                />
              )}

              {Platform.OS === "ios" && !showDatePicker && (
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className="p-3"
                >
                  <AppText className="text-blue-500">
                    {formatDateForDisplay(userData.birthDate)}
                  </AppText>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View className="flex-col gap-3">
            <Button title="Cadastrar" onPress={handleRegistration} />

            <Button
              title="Já tenho uma conta"
              theme={"secondary"}
              onPress={() => {
                router.push("/login");
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
