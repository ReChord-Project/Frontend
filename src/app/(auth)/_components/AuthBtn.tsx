'use client';

import React from 'react';

type AuthBtnProps = {
  handleSubmit: (e: React.FormEvent) => void;
  text: string;
};

export default function AuthBtn({ handleSubmit, text }: AuthBtnProps) {
  return (
    <button
      type="submit"
      onClick={handleSubmit}
      className="flex justify-center w-full py-[0.875rem] bg-[#4A88C4] text-white text-base rounded-2xl cursor-pointer"
    >
      {text}
    </button>
  );
}
