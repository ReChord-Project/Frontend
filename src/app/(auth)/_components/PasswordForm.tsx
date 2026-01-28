'use client';

import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

type PasswordFormProps = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string; // 비밀번호 값
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showPassword: boolean;
  toggleShowPassword: () => void; // 비밀번호 보이기 토글
  autoComplete?: React.InputHTMLAttributes<HTMLInputElement>['autoComplete']; // 자동완성
  showToggle?: boolean; // 보이기/숨기기 버튼 노출 여부(기본 true)
};

export default function PasswordForm({
  id,
  name,
  label,
  placeholder = '비밀번호를 입력하세요',
  value,
  onChange,
  error,
  showPassword,
  toggleShowPassword,
  autoComplete = 'current-password',
  showToggle = true,
}: PasswordFormProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="id" className="text-[#9CA3AF] text-base font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          autoComplete={autoComplete}
          required
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="block w-full px-4 py-[0.875rem] rounded-2xl bg-[#FDFBF7] 
                          placeholder:text-[#9CA3AF] placeholder:text-base"
        ></input>

        {/* 보이기/숨기기 아이콘 */}
        {showToggle && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-4 top-1/2 -translate-y-1/2
                            text-[#9CA3AF]"
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {/* 비밀번호 에러 메시지 */}
      {error && <p className="mt-2 text-xs font-medium text-[#FF0000]">{error}</p>}
    </div>
  );
}
