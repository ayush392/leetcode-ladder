"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const leftArrow = (
  <svg
    className="w-3.5 h-3.5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 6 10"
  >
    <path
      className=" stroke-green-700"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 1L1 5l4 4"
    />
  </svg>
);

const rightArrow = (
  <svg
    className="w-3.5 h-3.5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 6 10"
  >
    <path
      className=" stroke-green-700"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M1 1l4 4-4 4"
    />
  </svg>
);

function Pagination({ totalQuestions, currentPage, limit = 20 }: any) {
  const totalPages = Math.ceil(totalQuestions / limit);
  const [page, setPage] = useState(currentPage);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(()=>{
    setPage(currentPage);
  },[currentPage])

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
    if (isNaN(newPage) || newPage < 1 || newPage > totalPages) {
      setPage(currentPage);
      return;
    }
    setPage(newPage);
    router.push(pathname + "?" + createQueryString("page", newPage.toString()));
  };

  return (
    <section className="w-full my-4">
      <div className="flex items-center justify-center gap-3 w-fit ml-auto">
        <button
          className="py-2 px-2.5 rounded-md border"
          onClick={() => handlePageChange(page - 1)}
        >
          {leftArrow}
        </button>

        <div className="flex gap-1.5 items-center">
          <span>Showing page</span>
          <input
            className=" w-12 rounded-md py-0.5 px-1 border"
            type="text"
            value={page}
            onChange={(e) => setPage(e.target.value)}
            onBlur={(e) => handlePageChange(parseInt(page))}
            onKeyDown={(e) =>
              e.key === "Enter" && handlePageChange(parseInt(page))
            }
          />
          <span>of {totalPages} pages</span>
        </div>

        <button
          className="py-2 px-2.5 rounded-md border"
          onClick={() => handlePageChange(parseInt(page) + 1)}
        >
          {rightArrow}
        </button>
      </div>
    </section>
  );
}

export default Pagination;
