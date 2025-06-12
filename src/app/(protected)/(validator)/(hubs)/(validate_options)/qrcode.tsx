// app/scanner.tsx
import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  CameraView,
  BarcodeScanningResult,
  Camera,
  PermissionStatus,
} from "expo-camera";
import { StudentContext } from "../../contexts/StudentContext";

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const { setStudents } = useContext(StudentContext);

  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermissionsAsync();
      setHasPermission(permission.status === PermissionStatus.GRANTED);
    })();
  }, []);

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    if (scanned) return;

    setScanned(true);
    const { data } = result;

    try {
      let studentId = "";
      try {
        const json = JSON.parse(data);
        studentId = json.id;
      } catch {
        studentId = data;
      }

      setStudents((prev) =>
        prev.map((s) => (s.id === studentId ? { ...s, checkedIn: true } : s))
      );
    } catch (error) {
      alert("Código QR inválido");
    }

    setTimeout(() => setScanned(false), 2000);
  };

  if (hasPermission === null) return <Text>Solicitando permissão...</Text>;
  if (hasPermission === false) return <Text>Sem acesso à câmera</Text>;

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
        </View>
      </CameraView>
      {scanned && (
        <TouchableOpacity
          onPress={() => setScanned(false)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Toque para escanear novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#fff",
  },
  button: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
