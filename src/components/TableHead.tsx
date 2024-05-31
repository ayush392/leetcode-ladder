import React from "react";

function TableHead() {
  return (
    <thead className="text-gray-500 border-b ">
      <tr>
        <th scope="col" className="px-6 pt-2 pb-3 font-semibold">Status</th>
        <th scope="col" className="px-6 pt-2 pb-3 font-semibold">Title</th>
        <th scope="col" className="px-6 pt-2 pb-3 font-semibold">Credit</th>
        <th scope="col" className="px-6 pt-2 pb-3 font-semibold">Difficulty</th>
        <th scope="col" className="hidden px-6 pt-2 pb-3 font-semibold md:block">Contest</th>
      </tr>
    </thead>
  );
}

export default TableHead;
