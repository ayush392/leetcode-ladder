"use client";
import { useState, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

function Filter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    router.push(pathname + "?" + createQueryString(name, value));
  };

  return (
    <section className="flex gap-4 my-4">
      <select
        className="border p-1 rounded-md"
        name="contest"
        onChange={handleChange}
      >
        <option value="">Contest</option>
        <option value="weekly">Weekly</option>
        <option value="biweekly">Biweekly</option>
      </select>
      <select
        className="border p-1 rounded-md"
        name="difficulty"
        onChange={handleChange}
      >
        <option value="">Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <select
        className="border p-1 rounded-md"
        name="credit"
        onChange={handleChange}
      >
        <option value="">Credit</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      {/* search */}
      <input
        type="text"
        name="search"
        className="border border-gray-300 rounded-md p-1"
        placeholder="Search"
        onChange={handleChange}
      />
    </section>
  );
}

export default Filter;
