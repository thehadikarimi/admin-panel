import { curYear } from "@/utils/helper";

const months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export const userDefaultPayment = [
  {
    year: curYear(),
    data: months.map((month) => ({ month, status: "unknown" })),
  },
];
