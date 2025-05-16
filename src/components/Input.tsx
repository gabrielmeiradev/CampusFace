import { TextInput, View, Text } from "react-native";

export function Input({
  label,
  error,
  errorMessage,
  ...props
}: {
  label?: string;
  error?: boolean;
  errorMessage?: string;
} & React.ComponentProps<typeof TextInput>) {
  return (
    <View>
      {label && (
        <Text className="mb-2 text-sm font-medium text-gray-700">{label}</Text>
      )}
      <TextInput
        className={`h-14 w-full rounded-xl px-6 text-sm bg-gray-300 placeholder:text-gray-500 outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {error && (
        <Text className="mt-1 text-sm text-red-500">{errorMessage}</Text>
      )}
    </View>
  );
}
