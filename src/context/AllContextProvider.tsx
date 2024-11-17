import React, { ReactNode } from "react";
import { AuthContextProvider } from "./AuthContext";

const AllContextProvider = ({ children }: { children: ReactNode }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default AllContextProvider;
