"use client";
import React, { useEffect, useState } from "react";

function Checkbox({ questionId }: { questionId: string }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const localData = localStorage.getItem("LeetcodeLadder");
    if (localData) {
      const solvedQuestions = JSON.parse(localData);
      setIsChecked(solvedQuestions.includes(questionId));
    }
  }, []);

  const handleCheckboxChange = () => {
    const localData = localStorage.getItem("LeetcodeLadder");
    let solvedQuestions = localData ? JSON.parse(localData) : [];

    solvedQuestions = solvedQuestions.includes(questionId)
      ? solvedQuestions.filter((itemId: string) => itemId !== questionId)
      : [...solvedQuestions, questionId];
    console.log(solvedQuestions);

    setIsChecked(!isChecked);
    localStorage.setItem("LeetcodeLadder", JSON.stringify(solvedQuestions));
  };

  return (
    <input
      onChange={handleCheckboxChange}
      checked={isChecked}
      className="cursor-pointer scale-125"
      type="checkbox"
    />
  );
}

export default Checkbox;
