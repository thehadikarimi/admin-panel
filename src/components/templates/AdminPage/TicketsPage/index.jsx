import AdminTicketsTable from "@/components/modules/Tables/TicketsTable/AdminTicketsTable";

function TicketsPage() {
  return (
    <div className="c-container">
      <h2 className="title">لیست تیکت ها</h2>
      <AdminTicketsTable />
    </div>
  );
}

export default TicketsPage;
