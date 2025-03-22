"use client";

import { notFound } from "next/navigation";

import Loading from "@/components/elements/Loading";
import TicketPageHeader from "./TicketPageHeader";
import TicketPageMessages from "./TicketPageMessages";

import { useGetTicketById } from "@/services/queries";

function TicketPage({ ticketId }) {
  const { data, isPending } = useGetTicketById(ticketId);

  if (isPending) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!data) notFound();

  const { ticket } = data.data;

  return (
    <div className="flex flex-col gap-y-4 md:flex-row-reverse">
      <TicketPageHeader ticketData={ticket} />
      <div className="md:w-2/3 md:pl-3 lg:pl-5">
        <TicketPageMessages ticketData={ticket} />
      </div>
    </div>
  );
}

export default TicketPage;
