"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import EditUserForm from "@/components/modules/Forms/User/EditUserForm";
import SVGIcon from "@/components/elements/SVGIcon";
import Loading from "@/components/elements/Loading";

import { useGetProfile } from "@/services/queries";
import { jalaliDate } from "@/utils/helper";

function PersonalDetailsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit");

  const { data, isPending } = useGetProfile();

  if (isPending) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loading />
      </div>
    );
  }

  const profile = data.data.user;

  const userMeta = [
    { title: "نام و نام خانوادگی", content: profile.name },
    { title: "شماره تلفن", content: profile.phoneNumber },
    { title: "ایمیل", content: profile.email },
    { title: "تاریخ تولد", content: jalaliDate(profile.birthDate) },
  ];

  return (
    <div className="c-container">
      {+isEdit ? (
        <EditUserForm userData={profile} enableCategoryEditing={false} />
      ) : (
        <>
          <h2 className="title">اطلاعات حساب کاربری</h2>
          <div className="mt-5">
            <div className="grid rounded-lg border border-neutral-500 transition-colors duration-300 sm:grid-cols-2 dark:border-neutral-700">
              {userMeta.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-neutral-500 transition-colors duration-300 last:border-b-0 sm:odd:border-l dark:border-neutral-700 sm:[&:nth-last-child(-n_+_2)]:border-b-0"
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
          </div>
          <div className="mt-5 text-left">
            <button
              onClick={() => router.push(pathname + "?edit=1")}
              className="inline-flex items-center gap-1"
            >
              <span className="text-xs text-primary lg:text-sm">
                ویرایش اطلاعات کاربری
              </span>
              <SVGIcon name="edit" className="size-4 fill-primary lg:size-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PersonalDetailsPage;
