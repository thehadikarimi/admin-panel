import TicketPage from "@/components/templates/TicketPage";

async function Page({ params }) {
  const { ticketId } = await params;

  return <TicketPage ticketId={ticketId} />;
}

export default Page;
