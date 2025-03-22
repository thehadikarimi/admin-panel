import { mixed, object, string } from "yup";

const signupformSchema = object({
  name: string()
    .required("لطفا نام و نام خانوادگی خود را وارد نمایید")
    .min(6, "حداقل باید 6 کاراکتر وارد نمایید")
    .max(32, "حداکثر باید 32 کاراکتر وارد نمایید")
    .trim(),
  email: string()
    .required("لطفا ایمیل خود را وارد نمایید")
    .email("لطفا ایمیل معتبر وارد نمایید")
    .trim(),
  password: string()
    .required("لطفا گذرواژه خود را وارد نمایید")
    .min(6, "حداقل باید 6 کاراکتر وارد نمایید")
    .max(32, "حداکثر باید 32 کاراکتر وارد نمایید"),
}).required();

const loginformSchema = object({
  email: string()
    .required("لطفا ایمیل خود را وارد نمایید")
    .email("لطفا ایمیل معتبر وارد نمایید")
    .trim(),
  password: string()
    .required("لطفا گذرواژه خود را وارد نمایید")
    .min(6, "حداقل باید 6 کاراکتر وارد نمایید")
    .max(32, "حداکثر باید 32 کاراکتر وارد نمایید"),
}).required();

const addUserFormSchema = object({
  name: string()
    .required("لطفا نام و نام خانوادگی را وارد نمایید")
    .min(6, "حداقل باید 6 کاراکتر وارد نمایید")
    .max(32, "حداکثر باید 32 کاراکتر وارد نمایید"),
  phoneNumber: string()
    .test({
      test: (value) => value === "" || /^09[0-9]{9}$/.test(value),
      message: "لطفا شماره تلفن را به درستی وارد نمایید",
    })
    .trim(),
  category: string().trim(),
  email: string().email("لطفا ایمیل معتبر وارد نمایید").trim(),
  password: string().when("email", {
    is: (email) => email.length > 0,
    then: () =>
      string()
        .required("لطفا برای افزودن کاربر با ایمیل، گذرواژه را نیز وارد نمایید")
        .min(6, "حداقل باید 6 کاراکتر وارد نمایید")
        .max(32, "حداکثر باید 32 کاراکتر وارد نمایید"),
    otherwise: () => string(),
  }),
});

const editUserFormSchema = object({
  name: string()
    .required("لطفا نام و نام خانوادگی را وارد نمایید")
    .min(6, "حداقل باید 6 کاراکتر وارد نمایید")
    .max(32, "حداکثر باید 32 کاراکتر وارد نمایید"),
  email: string().email("لطفا ایمیل معتبر وارد نمایید").trim(),
  password: string().when("email", {
    is: (email) => email.length > 0,
    then: () =>
      string()
        .test({
          test: (value) => value !== "",
          message: "لطفا برای افزودن ایمیل کاربر، گذرواژه را نیز وارد نمایید",
        })
        .min(6, "حداقل باید 6 کاراکتر وارد نمایید")
        .max(32, "حداکثر باید 32 کاراکتر وارد نمایید"),
    otherwise: () => string(),
  }),
  phoneNumber: string()
    .test({
      test: (value) => value === "" || /^09[0-9]{9}$/.test(value),
      message: "لطفا شماره تلفن را به درستی وارد نمایید",
    })
    .trim(),
  category: string().trim(),
  birthDate: string(),
});

const categoryFormSchema = object({
  name: string()
    .required("لطفا نام دسته بندی را وارد نمایید")
    .min(4, "حداقل باید 4 کاراکتر وارد نمایید")
    .max(32, "حداکثر باید 32 کاراکتر وارد نمایید")
    .trim(),
  description: string()
    .test(
      "min-length",
      "حداقل باید 6 کاراکتر وارد نمایید",
      (value) => value === "" || (value && value.length >= 6),
    )
    .max(64, "حداکثر باید 64 کاراکتر وارد نمایید")
    .trim(),
});

const addTicketFormSchema = object({
  title: string()
    .required("لطفا عنوان تیکت را وارد نمایید")
    .min(4, "حداقل باید 4 کاراکتر وارد نمایید")
    .max(64, "حداکثر باید 64 کاراکتر وارد نمایید")
    .trim(),
  message: string()
    .required("لطفا توضیحات را وارد نمایید")
    .min(4, "حداقل باید 4 کاراکتر وارد نمایید")
    .max(1000, "حداکثر باید 1000 کاراکتر وارد نمایید")
    .trim(),
  image: mixed()
    .test(
      "حجم فایل",
      "حجم فایل باید کمتر از 5 مگابایت باشد",
      (value) =>
        !value.length || (value[0] && value[0].size <= 5 * 1024 * 1024),
    )
    .test(
      "نوع فایل",
      "فایل باید تصویر و با فرمت png و یا jpg باشد",
      (value) =>
        !value.length ||
        (value[0] && ["image/jpeg", "image/png"].includes(value[0].type)),
    ),
});

const SendTicketFormSchema = object({
  message: string()
    .required("لطفا توضیحات را وارد نمایید")
    .min(4, "حداقل باید 4 کاراکتر وارد نمایید")
    .max(1000, "حداکثر باید 1000 کاراکتر وارد نمایید")
    .trim(),
  image: mixed()
    .test(
      "حجم فایل",
      "حجم فایل باید کمتر از 5 مگابایت باشد",
      (value) =>
        !value.length || (value[0] && value[0].size <= 5 * 1024 * 1024),
    )
    .test(
      "نوع فایل",
      "فایل باید تصویر و با فرمت png و یا jpg باشد",
      (value) =>
        !value.length ||
        (value[0] && ["image/jpeg", "image/png"].includes(value[0].type)),
    ),
});

export {
  signupformSchema,
  loginformSchema,
  addUserFormSchema,
  editUserFormSchema,
  categoryFormSchema,
  addTicketFormSchema,
  SendTicketFormSchema,
};
