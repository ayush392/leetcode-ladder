"use client";
import { useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DropdownButton from "./DropdownButton";
import { CloseIcon, ResetIcon, SearchIcon } from "./icons";

const items = {
  contest: [
    { name: "Weekly Contest", value: "Weekly" },
    { name: "Biweekly Contest", value: "Biweekly" },
  ],
  difficulty: [
    { name: "Easy", value: "Easy", color: "text-green-500" },
    { name: "Medium", value: "Medium", color: "text-amber-500" },
    { name: "Hard", value: "Hard", color: "text-red-500" },
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

function Filter({
  contest,
  difficulty,
  credit,
  search,
}: {
  contest: string;
  difficulty: string;
  credit: string;
  search: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState("");
  const [filters, setFilters] = useState({
    contest,
    difficulty,
    credit: credit ? credit + " credits" : "",
    search,
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value || value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
        params.set("page", "1");
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
    <section className="my-6">
      <div className="flex flex-wrap gap-4 my-3">
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

        <label htmlFor="search" className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            <SearchIcon className={"text-gray-500"} />
          </div>
          <input
            type="text"
            name="search"
            className="bg-gray-100 text-sm px-3 py-1.5 border border-gray-200 rounded-md ps-8 focus:outline-none hover:bg-gray-200 focus:ring-1 focus:ring-gray-200"
            placeholder="Search questions"
            value={filters.search}
            onChange={handleChange}
            onClick={() => setIsOpen("")}
          />
        </label>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex gap-4">
          {Object.entries(filters).map(([key, value], index) => {
            if (value) {
              return (
                <div
                  key={index}
                  className="flex gap-1 items-center text-xs bg-gray-100 px-2 py-1.5 rounded-md  "
                >
                  <span className="">{value}</span>
                  <button
                    className="flex items-center rounded-full "
                    onClick={() => removeFilter(key)}
                  >
                    <CloseIcon className="text-gray-400 hover:text-gray-500" />
                  </button>
                </div>
              );
            }
          })}
        </div>
        <button
          className={`${
            Object.values(filters).some(
              (filter) => filter !== "" && filter !== undefined
            )
              ? "flex items-center gap-1.5 text-gray-500 hover:text-gray-700 cursor-pointer"
              : "hidden"
          }`}
          onClick={handleResetFilter}
        >
          <ResetIcon />
          <span>Reset</span>
        </button>
      </div>
    </section>
  );
}

export default Filter;
