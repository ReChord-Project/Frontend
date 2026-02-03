import Link from 'next/link';

// 회원가입 보이게/안보이게 하는 props 타입
interface HeaderProps {
  showSignup?: boolean;
}

export default function Header({ showSignup = true }: HeaderProps) {
  return (
    <>
      <div className="flex items-center gap-3">
        {/* ✅ TODO: 로고 넣기 */}
        <div className="h-12 w-12 rounded-lg bg-[#4B86C6]" />
        <span className="text-3xl font-semibold tracking-tight">ReChord</span>
      </div>

      {showSignup && (
        <Link
          href="/signup"
          className="items-center gap-2 rounded-2xl border border-[#E7EAF0] bg-white px-5 py-2 text-base font-medium text-[#4A88C4]"
        >
          회원가입 <span aria-hidden>→</span>
        </Link>
      )}
    </>
  );
}
