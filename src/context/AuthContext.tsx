"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import { useLogout } from "@/services/api/authApi";

type AuthContextType = {
  isLoggedIn: boolean;

  token: string | undefined;

  setToken: Dispatch<SetStateAction<string | undefined>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,

  token: undefined,

  setToken: () => {},
  setIsLoggedIn: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const router = useRouter();
  // const { mutate: logoutMutate } = useLogout();

  useEffect(() => {
    const userToken = Cookies.get("jwt");
    // console.log(userToken);
    if (userToken) {
      setIsLoggedIn(true);
      setToken(userToken);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const logout = () => {
    console.log("logout");
    Cookies.remove("jwt");
    setIsLoggedIn(false);
    setToken(undefined);
    router.push("/");
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
