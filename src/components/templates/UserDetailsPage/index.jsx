"use client";

import { notFound } from "next/navigation";

import Loading from "@/components/elements/Loading";

import { useGetUserById } from "@/services/queries";
import DetailsPageHeader from "./DetailsPageHeader";

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
    </div>
  );
}

export default UserDetailsPage;
