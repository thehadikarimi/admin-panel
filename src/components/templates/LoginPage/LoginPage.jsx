"use client";

import { useState } from "react";

import LoginForm from "../../modules/Forms/Auth/LoginForm";
import SignupForm from "../../modules/Forms/Auth/SignupForm";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-dvh w-full items-center justify-center py-8">
      <div className="container max-w-screen-sm">
        <div className="w-full rounded-2xl bg-white p-5 shadow-md dark:bg-white/10">
          <ul className="flex select-none items-center justify-around">
            <li
              onClick={() => setIsLogin(true)}
              className={`w-full cursor-pointer border-b-2 border-neutral-500 p-4 text-center text-sm md:text-base ${isLogin ? "border-primary text-primary" : ""}`}
            >
              ورود
            </li>
            <li
              onClick={() => setIsLogin(false)}
              className={`w-full cursor-pointer border-b-2 border-neutral-500 p-4 text-center text-sm md:text-base ${!isLogin ? "border-primary text-primary" : ""}`}
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
