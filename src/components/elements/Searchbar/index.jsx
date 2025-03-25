import HeaderSearchModal from "@/components/modules/Modals/HeaderSearchModal";
import SVGIcon from "../SVGIcon";

import useToggle from "@/hooks/useToggle";

function Searchbar() {
  const [headerSearch, headerSearchToggle] = useToggle();

  return (
    <>
      <div
        className="relative flex-grow lg:max-w-screen-sm"
        onClick={() => headerSearchToggle(true)}
      >
        <input
          type="text"
          placeholder="جست و جو"
          className="w-full rounded-full border-none bg-neutral-500 px-4 py-2.5 text-sm outline-none lg:py-3.5 dark:bg-neutral-900"
        />
        <button className="absolute left-4 top-2 lg:top-3">
          <SVGIcon name="search" className="size-6" />
        </button>
      </div>
      <HeaderSearchModal
        state={headerSearch}
        stateToggle={headerSearchToggle}
      />
    </>
  );
}

export default Searchbar;
