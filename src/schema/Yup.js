import { object, string } from "yup";

const signupformSchema = object({
  name: string()
    .required("لطفا نام و نام خانوادگی خود را وارد نمایید")
    .min(6, "حداقل باید 6 کاراکتر وارد نمایید")
    .max(32, "حداکثر باید 32 کاراکتر وارد نمایید"),
  email: string()
    .required("لطفا ایمیل خود را وارد نمایید")
    .email("لطفا ایمیل معتبر وارد نمایید"),
  password: string()
    .required("لطفا گذرواژه خود را وارد نمایید")
    .min(6, "حداقل باید 6 کاراکتر وارد نمایید")
    .max(32, "حداکثر باید 32 کاراکتر وارد نمایید"),
}).required();

export { signupformSchema };
