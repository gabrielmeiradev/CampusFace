import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

type RoleSwitcherProps = {
  value: string;
  setValue: (value: string) => void;
};

const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ value, setValue }) => {
  const roles = [
    { label: "Integrante", key: "user" },
    { label: "Validador", key: "validator" },
  ];

  return (
    <View style={styles.container}>
      {roles.map((role) => (
        <TouchableOpacity
          key={role.key}
          style={styles.button}
          className={value === role.key ? "bg-primary" : "bg-gray-200"}
          onPress={() => setValue(role.key)}
        >
          <Text style={[styles.text, value === role.key && styles.activeText]}>
            {role.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#eee",
    borderRadius: 100,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  text: {
    color: "#333",
    fontWeight: "bold",
  },
  activeText: {
    color: "white",
  },
});

export default RoleSwitcher;
