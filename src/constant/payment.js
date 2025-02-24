import { curYear } from "@/utils/helper";
import { p2e } from "@/utils/replaceNumber";

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

export const userDefaultPayment = {
  lastPayment: {
    year: "",
    month: "",
  },
  allPayments: [
    {
      year: p2e(curYear()),
      data: months.map((month) => ({ month, status: "unknown" })),
    },
  ],
};
