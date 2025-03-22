import SendTicketForm from "@/components/modules/Forms/Ticket/SendTicketForm";
import TicketCard from "@/components/modules/TicketCard";

import { useGetProfile } from "@/services/queries";

function TicketPageMessages({ ticketData }) {
  const { data } = useGetProfile();
  const profile = data?.data.user || {};

  return (
    <>
      <div className="c-container">
        <h2 className="title">پیام ها</h2>
        <hr className="my-5 border-neutral-500 dark:border-neutral-900" />
        <div className="flex flex-col gap-y-3 sm:gap-y-6">
          {ticketData.messages.map((message) => (
            <TicketCard key={message._id} data={message} userId={profile._id} />
          ))}
        </div>
      </div>
      <div className="c-container mt-3 lg:mt-5">
        <SendTicketForm userId={profile._id} ticketId={ticketData._id} />
      </div>
    </>
  );
}

export default TicketPageMessages;
