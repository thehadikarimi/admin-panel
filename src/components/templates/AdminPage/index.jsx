import UsersTable from "@/components/modules/Tables/UsersTable";
import TicketsTable from "@/components/modules/Tables/TicketsTable";

function AdminPage() {
  return (
    <div className="flex flex-col gap-3 lg:gap-5">
      <div className="c-container">
        <h2 className="title">لیست کاربران</h2>
        <UsersTable />
      </div>
      <div className="c-container">
        <h2 className="title">لیست تیکت ها</h2>
        <TicketsTable />
      </div>
    </div>
  );
}

export default AdminPage;
