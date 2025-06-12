import * as ImagePicker from "expo-image-picker";

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  name: string;
  birthDate: string;
  cpf: string;
  role: string;
  disabled: boolean;
  created_at: string;
  image?: ImagePicker.ImagePickerAsset;
  updated_at: string;
}
