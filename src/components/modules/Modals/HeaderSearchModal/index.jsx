import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

import Modal from "../../Modal";
import SVGIcon from "@/components/elements/SVGIcon";
import Loading from "@/components/elements/Loading";

import { useGetSearch } from "@/services/mutations";
import { usePathname } from "next/navigation";

function HeaderSearchModal({ state, stateToggle }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { mutate, isPending } = useGetSearch();
  const searchInputRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (state) {
      searchInputRef.current.focus();
    }
  }, [state]);

  useEffect(() => {
    const controller = new AbortController();

    if (searchTerm.trim().length >= 3) {
      mutate(
        { data: { q: searchTerm }, controller },
        {
          onSuccess: (data) => {
            setSearchResult(data.data.searchResult);
          },
          onError: (error) => {
            toast.error(error.data.message || "خطا در برقراری ارتباط");
          },
        },
      );
    } else {
      setSearchResult([]);
    }

    return () => controller.abort();
  }, [searchTerm]);

  useEffect(() => stateToggle(false), [pathname]);

  return (
    <Modal
      state={state}
      stateToggle={stateToggle}
      modalClassName="h-full max-h-dvh rounded-none"
    >
      <div className="border-neutral-500 p-3 lg:border-b dark:border-neutral-900">
        <div className="flex items-center gap-3 rounded-full bg-neutral-500 px-3 lg:!bg-transparent lg:p-0 dark:bg-neutral-900">
          <SVGIcon
            name="arrowForward"
            className="size-6 cursor-pointer"
            onClick={() => stateToggle(false)}
          />
          <input
            ref={searchInputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            className="flex-1 border-none bg-transparent py-3 text-sm outline-none"
            placeholder="جست و جو"
          />
          {searchTerm.trim().length >= 3 ? (
            <SVGIcon
              name="close"
              className="size-6 cursor-pointer"
              onClick={() => setSearchTerm("")}
            />
          ) : null}
        </div>
      </div>
      <div className="mt-3 h-[calc(100%_-_68px_-_0.75rem)] overflow-y-auto py-3">
        {isPending ? (
          <div className="flex h-32 items-center justify-center">
            <Loading />
          </div>
        ) : searchResult.length ? (
          searchResult.map((result, index) =>
            result.data.length ? (
              <div key={index} className="mb-4 last:mb-0">
                <div className="px-3 pb-2 text-sm opacity-50">
                  {result.label}
                </div>
                <div className="flex flex-col">
                  {result.data.map((item) => (
                    <Link
                      key={item._id}
                      href={item.link}
                      className="px-3 py-2 hover:bg-neutral-500 dark:hover:bg-neutral-900"
                      onClick={() =>
                        item.link === pathname && stateToggle(false)
                      }
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null,
          )
        ) : null}

        {!isPending && !searchResult.length && searchTerm.trim().length >= 3 ? (
          <div className="text-center">هیچ نتیجه ای یافت نشد!</div>
        ) : null}
      </div>
    </Modal>
  );
}

export default HeaderSearchModal;
