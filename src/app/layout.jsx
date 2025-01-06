import localFont from "next/font/local";

import "./globals.css";

const vazirmatn = localFont({
  src: [
    {
      path: "../../public/fonts/Vazirmatn/Vazirmatn-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn/Vazirmatn-Light.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn/Vazirmatn-ExtraLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn/Vazirmatn-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn/Vazirmatn-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn/Vazirmatn-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn/Vazirmatn-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn/Vazirmatn-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn/Vazirmatn-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata = {
  title: "گروه رزمی آناکوندا",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.className}>
      <body className="bg-white font-vazirmatn text-base font-normal text-dark-500 transition-colors duration-300 dark:bg-dark-500 dark:text-neutral-100">
        {children}
      </body>
    </html>
  );
}
