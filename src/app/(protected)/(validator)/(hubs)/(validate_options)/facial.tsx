// app/scanner.tsx
import React, { useEffect, useState, useContext, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  CameraView,
  Camera,
  PermissionStatus,
  CameraCapturedPicture,
} from "expo-camera";
import { StudentContext } from "../../contexts/StudentContext";
import { getIdUserByFace } from "@/services/validator/getUserByFace";

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] =
    useState<CameraCapturedPicture | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const { setStudents } = useContext(StudentContext);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    } catch (error) {
      console.error("Permission error:", error);
      setHasPermission(false);
    }
  };

  const takePicture = async () => {
    if (!cameraRef.current || isProcessing) return null;

    try {
      return await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: false,
        skipProcessing: true,
      });
    } catch (error) {
      console.error("Photo capture failed:", error);
      throw new Error("Falha ao capturar foto");
    }
  };

  const processStudentRecognition = async (photo: CameraCapturedPicture) => {
    try {
      // Show captured image immediately
      setCapturedImage(photo);

      // Call facial recognition API
      const result = await getIdUserByFace(photo);

      console.log("Recognition result:", result);

      // For now, use hardcoded name - replace with result.name when API works
      const studentName = "Gabriel Meira";

      // Update students list
      setStudents((prevStudents) => {
        const existingStudent = prevStudents.find(
          (s) => s.name === studentName
        );

        if (existingStudent) {
          return prevStudents.map((s) =>
            s.name === studentName ? { ...s, checkedIn: true } : s
          );
        } else {
          return [
            ...prevStudents,
            {
              id: Date.now().toString(),
              name: studentName,
              checkedIn: true,
            },
          ];
        }
      });

      return studentName;
    } catch (error) {
      console.error("Recognition processing failed:", error);
      throw new Error("Falha no processamento");
    }
  };

  const handleCapture = async () => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      // Step 1: Take picture
      const photo = await takePicture();
      if (!photo) throw new Error("Foto não capturada");

      // Step 2: Process recognition
      const studentName = await processStudentRecognition(photo);

      // Step 3: Show success
      Alert.alert("Sucesso", `${studentName} registrado com sucesso!`);
    } catch (error) {
      Alert.alert("Erro", String(error) || "Erro desconhecido");
    } finally {
      setIsProcessing(false);

      // Clear preview after 3 seconds
      setTimeout(() => setCapturedImage(null), 3000);
    }
  };

  // Permission states
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>
          Solicitando permissão da câmera...
        </Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>Acesso à câmera negado</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={requestCameraPermission}
        >
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="front" />

      <View style={styles.overlay}>
        <View style={styles.faceFrame} />

        <Text style={styles.instructionText}>
          Posicione seu rosto no centro da tela
        </Text>

        <TouchableOpacity
          style={styles.captureButton}
          onPress={handleCapture}
          disabled={isProcessing}
        >
          <View
            style={[
              styles.captureButtonInner,
              isProcessing && styles.captureButtonDisabled,
            ]}
          >
            {isProcessing ? (
              <Ionicons name="hourglass" size={28} color="#999" />
            ) : (
              <Text style={styles.captureText}>
                <Ionicons name="camera" size={28} color="#999" />
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {capturedImage && (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: capturedImage.uri }}
            style={styles.previewImage}
            resizeMode="cover"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  faceFrame: {
    width: 280,
    height: 350,
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 200,
    backgroundColor: "transparent",
  },
  instructionText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
    marginHorizontal: 40,
  },
  captureButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  captureButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ddd",
  },
  captureButtonDisabled: {
    backgroundColor: "#ccc",
    borderColor: "#999",
  },
  captureText: {
    fontSize: 28,
  },
  processingText: {
    fontSize: 24,
  },
  statusText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 100,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    alignSelf: "center",
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  previewContainer: {
    position: "absolute",
    top: 60,
    right: 20,
    width: 100,
    height: 120,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
});
