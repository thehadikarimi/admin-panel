import DarkModeToggle from "@/components/elements/DarkModeToggle";
import Searchbar from "@/components/elements/Searchbar";
import SVGIcon from "@/components/elements/SVGIcon";

function DesktopHeader() {
  return (
    <div className="flex h-full items-center justify-between gap-8">
      <div className="w-full">
        <Searchbar />
      </div>
      <div className="flex items-center gap-4">
        <DarkModeToggle />
        <button>
          <SVGIcon name="person_0" className="size-6 dark:fill-neutral-500" />
        </button>
      </div>
    </div>
  );
}

export default DesktopHeader;
