"use client";

import { useState, useEffect } from "react";
import { PacmanLoader } from "react-spinners";

export default function LoadingPopup({
  isLoading = false,
  message = "Loading...",
}: {
  isLoading?: boolean;
  message?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isLoading);
  }, [isLoading]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      aria-live="assertive"
      role="alert"
    >
      <div className="flex flex-col items-center space-y-2">
        <PacmanLoader color="#6100ff" />
        <p className="text-center text-sm font-medium text-muted-foreground">
          {message}
        </p>
      </div>
    </div>
  );
}
