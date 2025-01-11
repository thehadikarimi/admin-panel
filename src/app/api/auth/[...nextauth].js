import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/models/User";
import { DB_IsConnected } from "@/utils/DB";
import { verifyPassword } from "@/utils/password";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const isConnected = await DB_IsConnected();
        if (isConnected === "not-connected") {
          throw new Error("خطا در هنگام اتطال به دیتابیس.");
        }

        if (!email || !password) {
          throw new Error("لطفا ایمیل و گذرواژه معتبر وارد کنید.");
        }

        const user = await User.findOne({ email: email });

        if (!user)
          throw new Error("حساب کاربری یافت نشد، لطفا ابتدا ثبت نام کنید.");

        const isValid = await verifyPassword(password, user.password);

        if (!isValid)
          throw new Error(
            "گذرواژه اشتباه است، لطفا گذرواژه صحیح را وارد کنید.",
          );

        return { email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
