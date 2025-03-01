import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function jalaliDate(date) {
  if (!date) return;
  return new Date(date).toLocaleDateString("fa-IR");
}

export function curMonth(type = "numeric") {
  return new Date().toLocaleDateString("fa-IR", { month: type });
}

export function curYear(type = "numeric") {
  return new Date().toLocaleDateString("fa-IR-u-nu-latn", { year: type });
}
