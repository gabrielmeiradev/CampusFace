import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Dimensions } from "react-native";
import { AppText } from "../AppText";

// Status type enum
export enum StatusType {
  WAITING = "waiting",
  DENIED = "denied",
  ACCEPTED = "accepted",
}

// Status badge component with improved visuals
function StatusBadge({ type }: { type: StatusType }) {
  // Status configuration map
  const statusConfig = {
    [StatusType.ACCEPTED]: {
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      borderColor: "border-green-200",
      dotColor: "bg-green-500",
      label: "Aprovado",
    },
    [StatusType.DENIED]: {
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      borderColor: "border-red-200",
      dotColor: "bg-red-500",
      label: "Negado",
    },
    [StatusType.WAITING]: {
      bgColor: "bg-amber-100",
      textColor: "text-amber-800",
      borderColor: "border-amber-200",
      dotColor: "bg-amber-500",
      label: "Aguardando aprovação",
    },
  };

  const config = statusConfig[type] || statusConfig[StatusType.WAITING];

  return (
    <View
      className={`flex flex-row items-center px-3 py-1 rounded-full ${config.bgColor} ${config.borderColor} border`}
    >
      <View className={`w-2 h-2 rounded-full ${config.dotColor} mr-1.5`} />
      <AppText className={`text-xs font-medium ${config.textColor}`}>
        {config.label}
      </AppText>
    </View>
  );
}

export default function Card({
  id,
  title,
  status = StatusType.WAITING,
  subtitle,
  date,
  onPress,
}: {
  id: string;
  title: string;
  status?: StatusType;
  subtitle?: string;
  date?: string;
  onPress: (id: string) => void;
}) {
  const screenWidth = Dimensions.get("window").width;

  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress(id);
          return;
        }
      }}
      className="bg-white border border-gray-200 rounded-xl mb-3 shadow-sm overflow-hidden"
      style={{
        width: screenWidth - 32,
      }}
      activeOpacity={0.7}
    >
      {/* Card content container */}
      <View className="p-4">
        <View className="flex flex-row items-start justify-between mb-2">
          <View className="flex-1 mr-3">
            <AppText className="text-lg font-bold text-gray-800">
              {title}
            </AppText>
            {subtitle && (
              <AppText className="text-sm text-gray-500 mt-1">
                {subtitle}
              </AppText>
            )}
          </View>
          <StatusBadge type={status} />
        </View>

        {date && (
          <View className="flex flex-row items-center mt-2">
            <MaterialCommunityIcons
              name="clock-outline"
              size={14}
              color="#6B7280"
            />
            <AppText className="text-xs text-gray-500 ml-1">{date}</AppText>
          </View>
        )}
      </View>

      {/* Footer with chevron */}
      <View className="flex flex-row items-center justify-end px-4 py-2 bg-gray-50 border-t border-gray-100">
        <AppText className="text-sm font-medium text-blue-600 mb-0">
          Ver detalhes
        </AppText>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color="#2563EB"
        />
      </View>
    </TouchableOpacity>
  );
}
