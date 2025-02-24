"use client";

import { notFound } from "next/navigation";

import Loading from "@/components/elements/Loading";
import DetailsPageHeader from "./DetailsPageHeader";
import DetailsPagePayment from "./DetailsPagePayment";

import { useGetUserById } from "@/services/queries";

function UserDetailsPage({ userId }) {
  const { data, isPending } = useGetUserById(userId);

  if (isPending) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!data) notFound();

  const { user } = data.data;

  return (
    <div className="flex flex-col gap-3 lg:gap-5">
      <DetailsPageHeader userData={user} />
      <DetailsPagePayment userData={user} />
    </div>
  );
}

export default UserDetailsPage;
