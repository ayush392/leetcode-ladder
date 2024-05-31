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
    <section className="w-full py-2 my-6">
      <div className="flex items-center justify-center gap-3 ml-auto w-fit">
        <button
          className={`py-2 px-2.5 rounded-md border bg-gray-100 border-gray-200 ${
            page == 1
              ? "cursor-auto opacity-40 bg-gray-50"
              : "hover:bg-gray-200"
          }`}
          onClick={() => handlePageChange(page - 1)}
        >
          <LeftArrow className=" stroke-gray-500" />
        </button>

        {page && parseInt(page) >= 1 && parseInt(page) <= totalPages && (
          <div className="flex gap-1.5 items-center">
            <span>Showing page</span>
            <input
              className=" w-12 rounded-md py-0.5 px-1 border"
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
          className={`py-2 px-2.5 rounded-md border bg-gray-100 border-gray-200 ${
            page >= totalPages
              ? "cursor-auto opacity-40 bg-gray-50"
              : "hover:bg-gray-200"
          }`}
          onClick={() => handlePageChange(parseInt(page) + 1)}
        >
          <RightArrow className=" stroke-gray-500" />
        </button>
      </div>
    </section>
  );
}

export default Pagination;
