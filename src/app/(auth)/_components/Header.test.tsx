import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header 컴포넌트', () => {
  // 기본 상태에서 회원가입 링크가 화면에 노출되는지 확인
  test('기본적으로 회원가입 링크가 렌더링된다.', () => {
    render(<Header />);

    const signupLink = screen.getByRole('link', { name: /회원가입/ });
    expect(signupLink).toBeInTheDocument();
  });

  // showSignup 옵션에 따라 회원가입 링크가 숨겨지는지 확인
  test('showSignup prop이 false일 때 회원가입 링크가 렌더링되지 않는다.', () => {
    render(<Header showSignup={false} />);

    const signupLink = screen.queryByRole('link', { name: /회원가입/ });
    expect(signupLink).not.toBeInTheDocument();
  });

  // 헤더에 서비스 로고 텍스트가 항상 노출되는지 확인
  test('ReChord 텍스트가 렌더링된다.', () => {
    render(<Header />);

    const logoText = screen.getByText('ReChord');
    expect(logoText).toBeInTheDocument();
  });
});
