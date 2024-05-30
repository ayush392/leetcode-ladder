import React from "react";

function TableHead() {
  return (
    <thead className="text-gray-500 border-b ">
      <tr>
        <th scope="col" className="px-6 py-3 font-semibold">Status</th>
        <th scope="col" className="px-6 py-3 font-semibold">Title</th>
        <th scope="col" className="px-6 py-3 font-semibold">Credit</th>
        <th scope="col" className="px-6 py-3 font-semibold">Difficulty</th>
        <th scope="col" className="px-6 py-3 font-semibold">Contest</th>
      </tr>
    </thead>
  );
}

export default TableHead;
