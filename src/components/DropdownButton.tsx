import React from 'react'
import { DownArrow, UpArrow } from "./icons";

function DropdownButton({
  buttonName,
  dropdownItems,
  handleChange,
  isOpen,
  setIsOpen,
}: any) {
  return (
    <div>
      <button
        onClick={() => {
          isOpen === buttonName ? setIsOpen("") : setIsOpen(buttonName);
        }}
        // onBlur={() => {isOpen === buttonName ? setIsOpen("") : setIsOpen(buttonName)}}
        className="inline-flex bg-gray-100 rounded-md text-sm px-3 py-1.5 items-center border border-gray-200 focus:outline-none hover:bg-gray-200 focus:ring-1 focus:ring-gray-200"
        type="button"
      >
        {buttonName}
        <span>{isOpen === buttonName ? <UpArrow /> : <DownArrow />}</span>
      </button>
      {/* <!-- Dropdown menu --> */}
      <div
        className={`z-10 ${
          isOpen === buttonName ? "absolute" : "hidden"
        } bg-white mt-1  rounded-md shadow w-44 `}
      >
        <ul className="py-1 text-sm">
          {dropdownItems.map((item: any, index: number) => (
            <li key={index}>
              <button
                name={buttonName}
                value={item.value}
                onClick={handleChange}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${item?.color}`}
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

export default DropdownButton