"use client";

import { useTheme } from "next-themes";
import ClipLoader from "react-spinners/ClipLoader";

export default function Spinner() {
  const { theme } = useTheme();

  return (
    <ClipLoader
      size={25}
      color={theme === "light" ? "#000000" : "#ffffff"} // Set color based on theme
    />
  );
}
