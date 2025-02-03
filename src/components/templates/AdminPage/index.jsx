import Link from "next/link";

import UsersTable from "@/components/modules/Tables/UsersTable";
import TicketsTable from "@/components/modules/Tables/TicketsTable";
import SVGIcon from "@/components/elements/SVGIcon";

function AdminPage() {
  return (
    <div className="flex flex-col gap-3 lg:gap-5">
      <div className="c-container">
        <h2 className="title">لیست کاربران</h2>
        <UsersTable qty={4} />
        <div className="mt-3 text-left">
          <Link
            href="/admin/users"
            className="inline-flex items-center text-sm text-primary"
          >
            <span>مشاهده همه کاربران</span>
            <SVGIcon name="chevronLeft" className="size-4 fill-primary" />
          </Link>
        </div>
      </div>
      <div className="c-container">
        <h2 className="title">لیست تیکت ها</h2>
        <TicketsTable />
        <div className="mt-3 text-left">
          <Link
            href="/admin/tickets"
            className="inline-flex items-center text-sm text-primary"
          >
            <span>مشاهده همه تیکت ها</span>
            <SVGIcon name="chevronLeft" className="size-4 fill-primary" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
