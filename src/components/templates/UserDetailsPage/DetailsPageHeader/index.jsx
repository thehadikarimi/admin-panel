import { usePathname, useRouter, useSearchParams } from "next/navigation";

import SVGIcon from "@/components/elements/SVGIcon";
import EditUserForm from "@/components/modules/Forms/User/EditUserForm";

import { jalaliDate } from "@/utils/helper";

function DetailsPageHeader({ userData }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit");

  const { role, name, email, phoneNumber, birthDate, category } = userData;
  const userMeta = [
    { title: "شماره تلفن", content: phoneNumber },
    { title: "ایمیل", content: email },
    { title: "تاریخ تولد", content: jalaliDate(birthDate) },
    { title: "دسته بندی", content: category },
  ];

  return (
    <div className="c-container">
      {+isEdit === 1 ? (
        <EditUserForm userData={userData} />
      ) : (
        <>
          <div className="flex justify-between gap-2">
            <h2 className="title w-1/2 overflow-hidden text-ellipsis whitespace-nowrap">
              {name}
            </h2>
            <div className="flex w-1/2 items-center justify-end overflow-hidden whitespace-nowrap">
              <button
                onClick={() => router.push(pathname + "?edit=1")}
                className="flex items-center gap-1"
              >
                <span className="text-xs text-primary lg:text-sm">
                  ویرایش اطلاعات {role === "ADMIN" ? "مدیر" : "کاربر"}
                </span>
                <SVGIcon
                  name="edit"
                  className="size-4 fill-primary lg:size-5"
                />
              </button>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium text-black lg:text-base dark:text-neutral-500">
              مشخصات {role === "ADMIN" ? "مدیر" : "کاربر"}
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            {userMeta.map((item, index) => (
              <div
                key={index}
                className="border-b border-neutral-500 transition-colors duration-300 last:border-b-0 sm:odd:border-l xl:border-b-0 dark:border-neutral-700 xl:[&:nth-child(-n_+_2)]:border-l sm:[&:nth-last-child(-n_+_2)]:border-b-0"
              >
                <div className="p-3 text-sm text-black lg:text-base dark:text-neutral-500">
                  <p className="text-[.9em]">{item.title}</p>
                  <p className="mt-2 overflow-hidden text-ellipsis font-medium">
                    {item.content || "_"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default DetailsPageHeader;
