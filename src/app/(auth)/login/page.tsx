'use client';

import Header from '../_components/Header';
import { useState } from 'react';
import Image from 'next/image';
import IDForm from '../_components/IDForm';
import PasswordForm from '../_components/PasswordForm';
import AuthBtn from '../_components/AuthBtn';

// 로그인 화면
export default function Page() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기/숨기기

  // 검증 로직
  const validate = (nextId: string, nextPw: string) => {
    if (!nextId || !nextPw) return '아이디와 비밀번호를 모두 입력해주세요';
    if (nextPw.length < 8) return '비밀번호는 8자리 이상 입력하세요';
    return '';
  };

  // 아이디와 비밀번호 입력 여부 체크 함수(로그인 버튼에 사용)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(validate(id, password));
  };

  // 비밀번호 길이 체크 함수
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setError(validate(id, value));
  };

  return (
    <main className="grid min-h-dvh place-items-center p-6">
      {/* 상단바 */}
      <header className="fixed top-0 left-0 z-50 w-full px-6 py-6">
        <div className="mx-auto flex items-center justify-between">
          <Header />
        </div>
      </header>

      {/* 모달창 */}
      <section className="flex flex-col gap-12 w-121 relative bg-white rounded-3xl shadow-[0px_20px_60px_0px_rgba(31,41,55,0.14)] overflow-hidden p-[3.125rem]">
        {/* 제목과 부제목 */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[#1F2937] text-3xl font-semibold">환영합니다!</h2>
          <h3 className="text-[#6B7280] text-xl font-medium">다같이 회의해보세요</h3>
        </div>

        {/* 아이디와 비밀번호 */}
        <article className="flex flex-col gap-8">
          {/* 아이디 */}
          <IDForm id={id} setId={setId} />

          {/* 비밀번호 */}
          <PasswordForm
            password={password}
            onChangePassword={handlePasswordChange}
            error={error}
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword((prev) => !prev)}
          />
        </article>

        {/* 로그인 */}
        <article className="flex flex-col gap-8">
          {/* 로그인 버튼 */}
          <AuthBtn handleSubmit={handleSubmit} text="로그인" />

          {/* 로그인 방법 경계선 */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[#F0F2F6]" />
            <span className="text-sm text-[#6B7280]">로그인 방법</span>
            <div className="h-px flex-1 bg-[#F0F2F6]" />
          </div>

          {/* 소셜 로그인 버튼(✅ TODO: 고도화 작업 때 진행) */}
          <div className="flex gap-6 justify-center">
            <div className="flex justify-center items-center border border-[#E7EAF0] h-[3.125rem] w-[3.125rem] rounded-4xl cursor-pointer">
              <Image src="/logo/google.png" alt="KakaoTalk Logo" width={30} height={30} />
            </div>
            <div className="flex justify-center items-center border border-[#E7EAF0] h-[3.125rem] w-[3.125rem] rounded-4xl cursor-pointer">
              <Image src="/logo/kakaotalk.png" alt="KakaoTalk Logo" width={30} height={30} />
            </div>
            <div className="flex justify-center items-center border border-[#E7EAF0] h-[3.125rem] w-[3.125rem] rounded-4xl cursor-pointer">
              <Image src="/logo/naver.png" alt="Naver Logo" width={30} height={30} />
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
