"use client";
import { useEffect, useState } from "react";
import { DownArrow, MoonIcon, SunIcon, SystemIcon, UpArrow } from "./icons";

function ThemeSwitcher() {
  const [theme, setTheme] = useState<"light" | "dark" | "system" | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownItems = [
    { name: "Light", value: "light" },
    { name: "Dark", value: "dark" },
    { name: "System", value: "system" },
  ];

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme === "light" || localTheme === "dark") setTheme(localTheme);
    else setTheme("system");
  }, []);

  const handleThemeChange = (newTheme: string) => {
    if (newTheme === theme) {
      setIsOpen(false);
      return;
    }
    if (newTheme === "system") {
      setTheme("system");
      localStorage.removeItem("theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      setIsOpen(false);
      return;
    }

    setTheme(newTheme as "light" | "dark");
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") document.documentElement.classList.add("dark");
    else if (newTheme === "light")
      document.documentElement.classList.remove("dark");
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-md text-sm px-3 py-1.5 items-center border border-gray-200 focus:outline-none hover:bg-gray-200 focus:ring-1 focus:ring-gray-200 dark:border-neutral-700 dark:focus:ring-neutral-700"
        type="button"
      >
        {theme === "light" ? (
          <SunIcon />
        ) : theme === "dark" ? (
          <MoonIcon className="dark:text-gray-50" />
        ) : (
          <SystemIcon />
        )}
        <span>{isOpen ? <UpArrow /> : <DownArrow />}</span>
      </button>
      {/* <!-- Dropdown menu --> */}
      <div
        className={`z-10 ${
          isOpen ? "absolute" : "hidden"
        } bg-white dark:bg-neutral-800 mt-1 rounded-md shadow w-36 `}
      >
        <ul className="py-1 text-sm">
          {dropdownItems.map((item: any, index: number) => (
            <li key={index}>
              <button
                name={item.name}
                value={item.value}
                onClick={() => handleThemeChange(item.value)}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-neutral-700"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
