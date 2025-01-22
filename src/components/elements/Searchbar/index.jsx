import SVGIcon from "../SVGIcon";

function Searchbar() {
  return (
    <div className="relative flex-grow lg:max-w-screen-sm">
      <input
        type="text"
        placeholder="جست و جو"
        className="w-full rounded-full border-none bg-neutral-500 px-4 py-2.5 text-sm outline-none transition-colors duration-300 lg:py-3.5 dark:bg-neutral-900"
      />
      <button className="absolute left-4 top-2 lg:top-3">
        <SVGIcon name="search" className="size-6 dark:fill-neutral-500" />
      </button>
    </div>
  );
}

export default Searchbar;
