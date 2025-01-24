"use client";

import { useState } from "react";

export default function useToggle(initialState = false) {
  const [value, setValue] = useState(initialState);

  function toggleValue(value) {
    setValue((currentValue) =>
      typeof value === "boolean" ? value : !currentValue,
    );
  }

  return [value, toggleValue];
}
