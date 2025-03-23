"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";

import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "dark");

  useEffect(() => {
    const htmlClass = window.document.documentElement.classList;

    colorMode === "dark" ? htmlClass.add("dark") : htmlClass.remove("dark");

    Cookies.set("color-theme", colorMode);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
