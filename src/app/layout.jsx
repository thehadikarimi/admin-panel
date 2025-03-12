import localFont from "next/font/local";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";

import TanstakQueryProvider from "@/components/providers/TanstakQueryProvider";
import Icons from "@/components/modules/Icons";

import "./globals.css";
import ModalProvider from "@/context/ModalProvider";
import DefaultModal from "@/components/modules/Modal/DefaultModal";

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
  title: "داشبورد نکست",
};

export default async function RootLayout({ children }) {
  const cookie = await cookies();
  const colorMode = cookie.get("color-theme")?.value;
  const className =
    colorMode === "dark" ? `${vazirmatn.className} dark` : vazirmatn.className;

  return (
    <html lang="fa" dir="rtl" className={className}>
      <body className="bg-neutral-200 font-vazirmatn text-base font-normal text-black transition-colors duration-300 dark:bg-dark-700 dark:text-neutral-100">
        <ModalProvider>
          <TanstakQueryProvider>
            <Icons />
            <div className="relative">{children}</div>
            <div id="modal-root" />
            <Toaster />
            <DefaultModal />
          </TanstakQueryProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
