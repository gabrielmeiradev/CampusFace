import { RegisterUser } from "@/interfaces/UserRegistration";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import constants from "./constants";

SplashScreen.preventAutoHideAsync();

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  register: (user: RegisterUser) => Promise<void>;
};

const authStorageKey = "auth-key";

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  logIn: (email: string, password: string) => {},
  logOut: () => {},
  register: (user: RegisterUser) => Promise.resolve(),
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const storeAuthState = async (newState: { isLoggedIn: boolean }) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(authStorageKey, jsonValue);
    } catch (error) {
      console.log("Error saving", error);
    }
  };

  const logIn = async (username: string, password: string) => {
    try {
      // router.replace("(protected)/(validator)");
      // return;
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      console.log(constants.API_URL);
      const response = await fetch(`${constants.API_URL}/auth/login`, {
        method: "POST",
        body: formData,
      });

      console.log(JSON.stringify({ username, password }));

      console.log(`${constants.API_URL}/auth/login`);

      if (!response.ok) {
        setIsLoggedIn(false);

        storeAuthState({ isLoggedIn: false });
        console.log("Credenciais inválidas");
        throw new Error("Credenciais inválidas");
      }
      ``;

      const data = await response.json();
      setIsLoggedIn(true);
      storeAuthState({ isLoggedIn: true });
      if (data.main_role === "client") {
        router.replace("(protected)/(user)");
      } else if (data.main_role === "validator") {
        router.replace("(protected)/(validator)");
      } else {
        router.replace("/");
      }
    } catch (error) {
      setIsLoggedIn(false);
      storeAuthState({ isLoggedIn: false });
      throw new Error("Erro ao fazer login " + (error as Error).message);
    }
  };

  const register = async (user: RegisterUser) => {
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("name", user.name);
    formData.append("password", user.password);
    formData.append("birthDate", user.birthDate);
    formData.append("cpf", user.cpf);
    formData.append("role", user.role);
    if (user.image && user.image.uri) {
      const file = {
        uri: user.image.uri,
        name: user.image.uri.split("/").pop() || "image.jpg",
        type: user.image.type || "image/jpeg",
      };

      formData.append("image", file as any);
    }

    console.log("FormData being sent:", formData);
    console.log(`${constants.API_URL}/user/create`);

    try {
      const response = await fetch(`${constants.API_URL}/user/create`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar usuário");
      }

      const data = await response.json();
      console.log("Usuário registrado com sucesso:", data);
    } catch (error) {
      console.log("Erro ao registrar usuário:", error);
      throw new Error("Erro ao registrar usuário");
    }
  };

  const logOut = () => {
    setIsLoggedIn(false);
    storeAuthState({ isLoggedIn: false });
    router.replace("/login");
  };

  useEffect(() => {
    const getAuthFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem(authStorageKey);
        if (value !== null) {
          const auth = JSON.parse(value);
          setIsLoggedIn(auth.isLoggedIn);
        }
      } catch (error) {
        console.log("Error fetching from storage", error);
      }
      setIsReady(true);
    };
    getAuthFromStorage();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();

      router.replace("/login");
    }
  }, [isReady]);

  return (
    <AuthContext.Provider
      value={{
        isReady,
        isLoggedIn,
        logIn,
        logOut,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
