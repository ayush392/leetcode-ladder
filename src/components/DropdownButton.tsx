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
        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-200 font-medium rounded-md text-sm px-3 py-1.5"
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
        <ul className="py-1 text-sm text-gray-700 ">
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