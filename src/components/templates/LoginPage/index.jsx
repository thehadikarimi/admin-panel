"use client";

import { useState } from "react";

import LoginForm from "../../modules/Forms/Auth/LoginForm";
import SignupForm from "../../modules/Forms/Auth/SignupForm";

import { cn } from "@/utils/helper";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-8 py-8">
      <div className="container max-w-md">
        <div className="z-50 mx-auto flex flex-col gap-2 rounded-xl bg-white p-4 text-sm shadow-md lg:text-base dark:bg-dark-500">
          <p>شما می‌توانید با اطالاعات زیر وارد حساب کاربری شوید</p>
          <p>ایمیل: admin@gmail.com | user@gmail.com</p>
          <p>گذرواژه: 12345678</p>
        </div>
      </div>
      <div className="container max-w-screen-sm">
        <div className="w-full rounded-2xl bg-white p-5 shadow-md dark:bg-dark-500">
          <ul className="flex select-none items-center justify-around">
            <li
              onClick={() => setIsLogin(true)}
              className={cn(
                "w-full cursor-pointer border-b-2 border-neutral-500 p-4 text-center text-base text-black dark:border-neutral-900 dark:text-neutral-100",
                isLogin && "!border-primary !text-primary",
              )}
            >
              ورود
            </li>
            <li
              onClick={() => setIsLogin(false)}
              className={cn(
                "w-full cursor-pointer border-b-2 border-neutral-500 p-4 text-center text-base text-black dark:border-neutral-900 dark:text-neutral-100",
                !isLogin && "!border-primary !text-primary",
              )}
            >
              ثبت نام
            </li>
          </ul>
          <div className="w-full pb-4 pt-8">
            {isLogin ? <LoginForm /> : <SignupForm setIsLogin={setIsLogin} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
