'use client';

import React from 'react';

type IDFormProps = {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
};

export default function IDForm({ id, setId }: IDFormProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="id" className="text-[#9CA3AF] text-base font-medium">
        아이디
      </label>
      <input
        id="id"
        name="id"
        type="text"
        autoComplete="id"
        required
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="아이디를 입력하세요"
        className="block w-full px-4 py-[0.875rem] rounded-2xl bg-[#FDFBF7]
                          placeholder:text-[#9CA3AF] placeholder:text-base"
      />
    </div>
  );
}
