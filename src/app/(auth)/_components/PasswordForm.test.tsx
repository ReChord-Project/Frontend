import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordForm from './PasswordForm';

describe('PasswordForm 컴포넌트', () => {
  const mockOnChange = jest.fn();
  const mockToggleShowPassword = jest.fn();

  // 각 테스트 실행 전 mock 함수 호출 기록 초기화
  beforeEach(() => {
    mockOnChange.mockClear();
    mockToggleShowPassword.mockClear();
  });

  const defaultProps = {
    id: 'password',
    name: 'password',
    label: '비밀번호',
    value: '',
    onChange: mockOnChange,
    showPassword: false,
    toggleShowPassword: mockToggleShowPassword,
  };

  // 라벨과 input 필드가 정상적으로 렌더링되고,
  // label과 input이 올바르게 연결되어 있는지 확인
  test('라벨, 입력 필드가 올바르게 렌더링된다.', () => {
    render(<PasswordForm {...defaultProps} />);

    // label과 input이 연결되어 있으면 getByLabelText가 성공해야 함
    const input = screen.getByLabelText('비밀번호');
    expect(input).toBeInTheDocument();

    // placeholder도 존재하면 같이 확인(선택)
    expect(screen.getByPlaceholderText('비밀번호를 입력하세요')).toBeInTheDocument();
  });

  // 사용자가 비밀번호를 입력할 때 onChange 콜백이 호출되는지 확인
  test('입력 필드에 값을 입력하면 onChange 함수가 호출된다.', async () => {
    const user = userEvent.setup();
    render(<PasswordForm {...defaultProps} />);

    const input = screen.getByLabelText('비밀번호');
    await user.type(input, 'password123');

    expect(mockOnChange).toHaveBeenCalled();
  });

  // showPassword가 false일 때 input type이 password로 설정되는지 확인
  test('showPassword가 false일 때 type=password 이다.', () => {
    render(<PasswordForm {...defaultProps} showPassword={false} />);
    const input = screen.getByLabelText('비밀번호');
    expect(input).toHaveAttribute('type', 'password');
  });

  // showPassword가 true일 경우 input type이 text로 변경되는지 확인하는 테스트
  test('showPassword가 true일 때 type=text 이다.', () => {
    render(<PasswordForm {...defaultProps} showPassword />);
    const input = screen.getByLabelText('비밀번호');
    expect(input).toHaveAttribute('type', 'text');
  });

  // 비밀번호 보이기/숨기기 버튼 클릭 시
  // toggleShowPassword 콜백이 호출되는지 확인
  test('보이기/숨기기 버튼을 클릭하면 toggleShowPassword 함수가 호출된다.', async () => {
    const user = userEvent.setup();
    render(<PasswordForm {...defaultProps} />);

    // 네 DOM을 보면 button에 aria-label이 있음 → role + name으로 찾기 좋음
    const toggleButton = screen.getByRole('button', { name: /비밀번호 보이기|비밀번호 숨기기/ });
    await user.click(toggleButton);

    expect(mockToggleShowPassword).toHaveBeenCalledTimes(1);
  });

  // error prop이 전달되었을 때 에러 메세지가 화면에 표시되는지 확인
  test('에러 메시지가 있을 경우 렌더링된다.', () => {
    const errorMessage = '비밀번호가 너무 짧습니다.';
    render(<PasswordForm {...defaultProps} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  // error prop이 전달되지 않았을 때
  // 에러 메시지가 화면에 렌더링되지 않는지 확인
  test('에러 메시지가 없을 경우 렌더링되지 않는다.', () => {
    render(<PasswordForm {...defaultProps} />);

    expect(screen.queryByText('비밀번호가 너무 짧습니다.')).not.toBeInTheDocument();
  });
});
