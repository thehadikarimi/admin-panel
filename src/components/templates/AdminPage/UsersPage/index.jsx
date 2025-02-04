import UsersTable from "@/components/modules/Tables/UsersTable";
import SVGIcon from "@/components/elements/SVGIcon";

function UsersPage() {
  return (
    <div className="c-container">
      <div className="flex justify-between">
        <h2 className="title">لیست کاربران</h2>
        <div className="flex items-center">
          <button className="flex items-center gap-1 rounded-full border border-neutral-500 px-2 py-1 transition-colors duration-300 dark:border-neutral-700">
            <span className="text-xs text-black lg:text-sm dark:text-neutral-100">
              افزودن کاربر
            </span>
            <SVGIcon
              name="add"
              className="size-4 lg:size-5 dark:fill-neutral-500"
            />
          </button>
        </div>
      </div>
      <UsersTable />
    </div>
  );
}

export default UsersPage;
