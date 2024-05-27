"use client";
import { useState, Suspense, useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DropdownButton from "./DropdownButton";

const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" className="h-3.5 w-3.5"><path fill-rule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm1.414-10l2.293-2.293a1 1 0 00-1.414-1.414L12 10.586 9.707 8.293a1 1 0 00-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 101.414 1.414L12 13.414l2.293 2.293a1 1 0 001.414-1.414L13.414 12z" clip-rule="evenodd"></path></svg>

function Filter({contest, difficulty, credit, search}: {contest: string, difficulty: string, credit: string, search: string}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState("");
  const [filters, setFilters] = useState({contest, difficulty, credit, search});

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
    const newValue = name === "Credit" ? value + " credits" : value;
    setIsOpen("");

    const newFilters = { ...filters, [name.toLowerCase()]: newValue };
    setFilters(newFilters);
    router.push(pathname + "?" + createQueryString(name.toLowerCase(), value));
  };

  const items = {
    contest: [
      { name: "Weekly Contest", value: "weekly" },
      { name: "Biweekly Contest", value: "biweekly" },
    ],
    difficulty: [
      { name: "Easy", value: "Easy", color: "text-teal-600" },
      { name: "Medium", value: "Medium", color: "text-yellow-600" },
      { name: "Hard", value: "Hard", color: "text-red-600" },
    ],
    credit: [
      { name: "1 credit", value: 1 },
      { name: "2 credits", value: 2 },
      { name: "3 credits", value: 3 },
      { name: "4 credits", value: 4 },
      { name: "5 credits", value: 5 },
      { name: "6 credits", value: 6 },
      { name: "7 credits", value: 7 },
      { name: "8 credits", value: 8 },
      { name: "9 credits", value: 9 },
      { name: "10 credits", value: 10 },
    ],
  };

  const removeFilter = (key: string) => {
    setFilters({ ...filters, [key]: "" });
    router.push(pathname + "?" + createQueryString(key, ""));
  };

  const handleResetFilter = () => {
    setFilters({
      contest: "",
      difficulty: "",
      credit: "",
      search: "",
    });
    const params = new URLSearchParams(searchParams.toString());
    [...Object.keys(filters)].forEach((key) => params.delete(key));
    router.push(pathname + "?" + params.toString());
  };

  return (
    <section className="">
      <div className="flex gap-4 my-4">
        <DropdownButton
          buttonName="Contest"
          dropdownItems={items.contest}
          handleChange={handleChange}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <DropdownButton
          buttonName="Difficulty"
          dropdownItems={items.difficulty}
          handleChange={handleChange}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <DropdownButton
          buttonName="Credit"
          dropdownItems={items.credit}
          handleChange={handleChange}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <input
          type="text"
          name="search"
          className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-700"
          placeholder="Search questions"
          value={filters.search}
          onChange={handleChange}
          onClick={() => setIsOpen("")}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          {Object.entries(filters).map(([key, value], index) => {
            if (value) {
              return (
                <div
                  key={index}
                  className="flex gap-1 items-center text-xs bg-gray-200 px-2 py-1.5 rounded-md dark:bg-gray-700 "
                >
                  <span className="">{value}</span>
                  <button
                    className="rounded-full size-2.5 block"
                    onClick={() => removeFilter(key)}
                  >
                    {closeIcon}
                  </button>
                </div>
              );
            }
          })}
        </div>
        <button onClick={handleResetFilter}>reset</button>
      </div>
    </section>
  );
}

export default Filter;
