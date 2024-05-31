"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LeftArrow, RightArrow } from "./icons";

function Pagination({ totalQuestions, currentPage, limit = 20 }: any) {
  const totalPages = Math.ceil(totalQuestions / limit);
  const [page, setPage] = useState(currentPage);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value || value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handlePageChange = (newPage: number) => {
    if(newPage == currentPage) return;
    if (isNaN(newPage) || newPage < 1 || newPage > totalPages) {
      setPage(currentPage);
      return;
    }
    setPage(newPage);
    router.push(pathname + "?" + createQueryString("page", newPage.toString()));
  };

  return (
    <section className="w-full py-7">
      <div className="flex items-center justify-center gap-3 ml-auto w-fit">
        <button
          className={`py-2 px-2.5 rounded-md border bg-gray-100 border-gray-200 dark:border-neutral-700 dark:bg-neutral-800 ${
            page == 1
              ? "cursor-auto opacity-40 bg-gray-50"
              : "hover:bg-gray-200 dark:hover:bg-neutral-700"
          }`}
          onClick={() => handlePageChange(page - 1)}
        >
          <LeftArrow className=" stroke-gray-500 dark:stroke-neutral-300" />
        </button>

        {page && parseInt(page) >= 1 && parseInt(page) <= totalPages && (
          <div className="flex gap-1.5 items-center">
            <span>Showing page</span>
            <input
              className=" bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-md py-0.5 px-1 w-12 border border-gray-200 focus:outline-none hover:bg-gray-200 focus:ring-1 focus:ring-gray-200 dark:border-neutral-700 dark:focus:ring-neutral-700"
              type="text"
              value={page}
              onChange={(e) => setPage(e.target.value)}
              onBlur={() => handlePageChange(parseInt(page))}
              onKeyDown={(e) =>
                e.key === "Enter" && handlePageChange(parseInt(page))
              }
            />
            <span>of {totalPages} pages</span>
          </div>
        )}

        <button
          className={`py-2 px-2.5 rounded-md border bg-gray-100 border-gray-200 dark:border-neutral-700 dark:bg-neutral-800 ${
            page >= totalPages
              ? "cursor-auto opacity-40 bg-gray-50"
              : "hover:bg-gray-200 dark:hover:bg-neutral-700"
          }`}
          onClick={() => handlePageChange(parseInt(page) + 1)}
        >
          <RightArrow className=" stroke-gray-500 dark:stroke-neutral-300" />
        </button>
      </div>
    </section>
  );
}

export default Pagination;
