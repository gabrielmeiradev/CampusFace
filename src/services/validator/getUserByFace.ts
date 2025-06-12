import constants from "@/utils/constants";
import { CameraCapturedPicture } from "expo-camera";

interface RecognizedResponse {
  recognized: boolean;
  user?: object;
}

export async function getIdUserByFace(
  faceImage: CameraCapturedPicture
): Promise<RecognizedResponse> {
  const formData = new FormData();

  const file = {
    uri: faceImage.uri,
    name: "image.jpg",
    type: "image/jpeg",
  };

  formData.append("image", file as any);

  const res = await fetch(`${constants.API_URL}/face/recognize`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    console.error("Erro ao reconhecer rosto:", res.status, res.statusText);
    throw new Error("Erro ao reconhecer rosto");
  }

  const data = await res.json();
  return {
    recognized: data.recognized,
    user: data.user || undefined,
  };
}
