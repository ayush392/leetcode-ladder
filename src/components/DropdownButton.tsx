import React from 'react'
const upArrow = <svg className="w-2.5 h-2.5 ms-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5l4-4 4 4"/>
</svg>

const downArrow = <svg className="w-2.5 h-2.5 ms-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
</svg>

{/* <Suspense fallback={<div>Loading...</div>}>
<DropdownButton buttonName="Contest" dropdownItems={items.contest} />
</Suspense> */}

function DropdownButton({buttonName, dropdownItems, handleChange, isOpen, setIsOpen}:any) {
  return (
    <div>
      <button
        onClick={() => {
          isOpen === buttonName ? setIsOpen("") : setIsOpen(buttonName),
            console.log(buttonName);
        }}
        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-200 font-medium rounded-md text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
      >
        {buttonName}
        <span>{isOpen === buttonName ? upArrow : downArrow}</span>
      </button>
      {/* <!-- Dropdown menu --> */}
      <div
        className={`z-10 ${
          isOpen === buttonName ? "absolute" : "hidden"
        } bg-white mt-1  rounded-md shadow w-44 dark:bg-gray-700`}
      >
        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
          {dropdownItems.map((item: any, index: number) => (
            <li key={index}>
              <button
                name={buttonName}
                value={item.value}
                onClick={handleChange}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${item?.color}`}
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