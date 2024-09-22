import { useEffect, useState } from "react";

export const useThemeMode = () => {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    const media =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

    setMode(media.matches ? "dark" : "light");

    media.addEventListener("change", () => {
      setMode(media.matches ? "dark" : "light");
    });

    return () => {};
  }, []);

  return {
    mode,
  };
};
