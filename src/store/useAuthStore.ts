import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/users";
import {
  createUser,
  getUserByEmail,
  getUserByCredentials,
} from "../database/userRepository";

const SESSION_KEY = "fintrack:session";

interface AuthState {
  user: User | null;

  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{
    success: boolean;
    message: string;
  }>;

  login: (
    email: string,
    password: string,
  ) => Promise<{
    success: boolean;
    message: string;
  }>;

  logout: () => Promise<void>;

  loadSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  register: async (name, email, password) => {
    const existingUser = getUserByEmail(email);

    if (existingUser) {
      return {
        success: false,
        message: "Já existe um usuário cadastrado com este e-mail.",
      };
    }

    const newUser: User = {
      id: String(Date.now()),
      name,
      email,
      password,
    };

    createUser(newUser.id, newUser.name, newUser.email, newUser.password);

    return {
      success: true,
      message: "Usuário cadastrado com sucesso.",
    };
  },

  login: async (email, password) => {
    const foundUser = getUserByCredentials(email, password);

    if (!foundUser) {
      return {
        success: false,
        message: "E-mail ou senha inválidos.",
      };
    }

    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(foundUser));

    set({
      user: foundUser,
    });

    return {
      success: true,
      message: "Login realizado.",
    };
  },

  logout: async () => {
    await AsyncStorage.removeItem(SESSION_KEY);

    set({
      user: null,
    });
  },

  loadSession: async () => {
    const session = await AsyncStorage.getItem(SESSION_KEY);

    if (session) {
      set({
        user: JSON.parse(session),
      });
    } else {
      set({
        user: null,
      });
    }
  },
}));
