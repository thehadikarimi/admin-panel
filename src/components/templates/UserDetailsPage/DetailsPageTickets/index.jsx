import UserTicketsTable from "@/components/modules/Tables/TicketsTable/UserTicketsTable";

function DetailsPageTickets({ userId }) {
  return (
    <div className="c-container">
      <h2 className="title">تیکت ها</h2>
      <UserTicketsTable userId={userId} />
    </div>
  );
}

export default DetailsPageTickets;
