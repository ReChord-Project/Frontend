'use client';

import { useState } from 'react';
import Header from '../_components/Header';
import IDForm from '../_components/IDForm';
import PasswordForm from '../_components/PasswordForm';
import AuthBtn from '../_components/AuthBtn';
import Link from 'next/link';

export default function SignupPage() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // 재확인 비밀번호
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // 검증 로직
  const validate = (nextId: string, nextPw: string, nextconfirmPw: string) => {
    if (!nextId || !nextPw) return '아이디와 비밀번호를 모두 입력해주세요';
    if (nextPw.length < 8) return '비밀번호는 8자리 이상 입력하세요';
    if (password != nextconfirmPw) return '비밀번호가 일치하지 않습니다';
    return '';
  };

  // 아이디와 비밀번호 입력 여부 체크 함수(로그인 버튼에 사용)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(validate(id, password, confirmPassword));
  };

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setError(validate(id, value, confirmPassword));
  };

  // 비밀번호 재확인 입력 핸들러
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setError(validate(id, password, value));
  };

  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <header className="fixed top-0 left-0 z-50 w-full px-6 py-6">
        <div className="mx-auto flex items-center justify-between">
          <Header showSignup={false} />
        </div>
      </header>

      {/* 모달창 */}
      <section className="flex flex-col gap-12 w-121 relative bg-white rounded-3xl shadow-[0px_20px_60px_0px_rgba(31,41,55,0.14)] overflow-hidden p-[3.125rem]">
        {/* 제목과 부제목 */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[#1F2937] text-3xl font-semibold">환영합니다!</h2>
          <h3 className="text-[#6B7280] text-xl font-medium">ReChord 계정 만들기</h3>
        </div>

        {/* 아이디와 비밀번호 */}
        <article className="flex flex-col gap-8">
          {/* 아이디 */}
          <IDForm id={id} setId={setId} />

          {/* 이름 */}
          <div className="flex flex-col gap-1">
            <label htmlFor="id" className="text-[#9CA3AF] text-base font-medium">
              이름
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="본인의 이름을 입력하세요"
              className="block w-full px-4 py-[0.875rem] rounded-2xl bg-[#FDFBF7]
                          placeholder:text-[#9CA3AF] placeholder:text-base"
            />
          </div>

          {/* 비밀번호 */}
          <PasswordForm
            id="password"
            name="password"
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={handlePasswordChange}
            error={error}
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword((prev) => !prev)}
            autoComplete="new-password"
          />

          {/* 비밀번호 재확인 */}
          <PasswordForm
            id="passwordConfirm"
            name="passwordConfirm"
            label="비밀번호 재확인"
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={error}
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword((prev) => !prev)}
            autoComplete="new-password"
          />
        </article>

        {/* 회원가입 */}
        <article className="flex flex-col gap-8">
          {/* 회원가입 버튼 */}
          <AuthBtn handleSubmit={handleSubmit} text="회원가입" />

          {/* 계정 유무 경계선 */}
          <div className="flex items-center gap-4">
            <div className="w-full h-px flex-1 bg-[#F0F2F6]" />
          </div>

          {/* 계정이 있으신가요? 질문 버튼 */}
          <Link
            href="/login"
            className="flex justify-center text-xs font-medium text-[#4A88C4] cursor-pointer"
          >
            이미 계정이 있으신가요?
          </Link>
        </article>
      </section>
    </main>
  );
}
