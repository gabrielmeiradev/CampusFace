import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";

export default function CardContainer({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="h-56 max-w-[400px] w-full rounded-2xl overflow-hidden shadow-lg shadow-gray-300"
    >
      <LinearGradient
        colors={["#757575", "#212121"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 rounded-xl justify-center"
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
}
