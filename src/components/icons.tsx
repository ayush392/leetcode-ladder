import React from "react";

export const SearchIcon = ({ className = "" }: any) => {
  return (
    <svg
      className={`h-5 w-5 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M5.527 5.527a7.5 7.5 0 0111.268 9.852l3.581 3.583a1 1 0 01-1.414 1.415l-3.582-3.583A7.501 7.501 0 015.527 5.527zm1.414 1.414a5.5 5.5 0 107.779 7.779A5.5 5.5 0 006.94 6.94z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
};

export const CloseIcon = ({ className = "" }: any) => {
  return (
    <svg
      className={`h-3.5 w-3.5 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm1.414-10l2.293-2.293a1 1 0 00-1.414-1.414L12 10.586 9.707 8.293a1 1 0 00-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 101.414 1.414L12 13.414l2.293 2.293a1 1 0 001.414-1.414L13.414 12z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
};

export const ResetIcon = ({ className = "" }: any) => {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M5.725 9.255h2.843a1 1 0 110 2H3.2a1 1 0 01-1-1V4.887a1 1 0 012 0v3.056l2.445-2.297a9.053 9.053 0 11-2.142 9.415 1 1 0 011.886-.665 7.053 7.053 0 1010.064-8.515 7.063 7.063 0 00-8.417 1.202L5.725 9.255z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
};

export const UpArrow = ({ className = "" }: any) => {
  return (
    <svg
      className={`w-2.5 h-2.5 ms-2.5 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5l4-4 4 4"
      />
    </svg>
  );
};

export const DownArrow = ({ className = "" }: any) => {
  return (
    <svg
      className={`w-2.5 h-2.5 ms-2.5 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  );
};

export const LeftArrow = ({ className = "" }: any) => {
  return (
    <svg
      className={`w-3.5 h-3.5 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 1L1 5l4 4"
      />
    </svg>
  );
};

export const RightArrow = ({ className = "" }: any) => {
  return (
    <svg
      className={`w-3.5 h-3.5 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 1l4 4-4 4"
      />
    </svg>
  );
};
