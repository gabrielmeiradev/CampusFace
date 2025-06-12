import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
export default function ValidateOptionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View className="flex-1 flex-col items-center justify-center">
      <View className="flex-1 w-full max-w-2xl p-4 flex flex-col items-center justify-center">
        <Text className="text-xl font-bold text-center">
          Como você gostaria de validar?
        </Text>
        <Text className="text-gray-500 text-center mt-2">
          Escolha uma das opções abaixo para começar a validar.
        </Text>
        <View className="w-full flex flex-col items-center justify-center mt-10 gap-3">
          <ValidateOption
            title="QR Code"
            icon={<Ionicons name="qr-code-outline" size={24} color="gray" />}
            onClick={() => {
              router.push("qrcode");
            }}
          />
          <ValidateOption
            title="Reconhecimento Facial"
            icon={<Ionicons name="happy-outline" size={24} color="gray" />}
            onClick={() => {
              router.push("facial");
            }}
          />
        </View>
      </View>
    </View>
  );
}

function ValidateOption({
  title,
  onClick,
  icon,
}: {
  title: string;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <TouchableOpacity
      onPress={onClick}
      className="bg-white p-4 rounded-lg shadow-lg shadow-gray-200 w-full border border-gray-200 flex flex-row items-center gap-3"
    >
      {icon && <View className="text-gray-500">{icon}</View>}
      <Text className="text-lg font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
