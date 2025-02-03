import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function curMonth(type = "numeric") {
  return new Date().toLocaleDateString("fa-IR", { month: type });
}
