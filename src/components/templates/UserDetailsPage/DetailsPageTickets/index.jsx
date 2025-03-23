import Link from "next/link";

import SVGIcon from "@/components/elements/SVGIcon";
import UserTicketsTable from "@/components/modules/Tables/TicketsTable/UserTicketsTable";

function DetailsPageTickets({ userId, qty = undefined, isUserProfilePage }) {
  return (
    <div className="c-container">
      <h2 className="title">تیکت ها</h2>
      <UserTicketsTable userId={userId} qty={qty} />
      {isUserProfilePage ? (
        <div className="mt-5 text-left">
          <Link
            href="/profile/tickets"
            className="inline-flex items-center text-sm text-primary"
          >
            <span>مشاهده همه تیکت ها</span>
            <SVGIcon name="chevronLeft" className="size-4 !fill-primary" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default DetailsPageTickets;
