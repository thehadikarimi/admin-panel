"use client";

import Loading from "@/components/elements/Loading";
import DetailsPageHeader from "../UserDetailsPage/DetailsPageHeader";
import DetailsPagePayment from "../UserDetailsPage/DetailsPagePayment";

import { useGetProfile } from "@/services/queries";
import DetailsPageTickets from "../UserDetailsPage/DetailsPageTickets";

function UserProfilePage() {
  const { data, isPending } = useGetProfile();

  if (isPending) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loading />
      </div>
    );
  }

  const { user } = data.data;

  return (
    <div className="flex flex-col gap-3 lg:gap-5">
      <DetailsPageHeader userData={user} enableDataEditing={false} />
      <DetailsPagePayment userData={user} enablePaymentEditing={false} />
      <DetailsPageTickets userId={user._id} qty={4} isUserProfilePage={true} />
    </div>
  );
}

export default UserProfilePage;
