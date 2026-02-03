import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthBtn from './AuthBtn';

describe('AuthBtn 컴포넌트', () => {
  // 전달받은 text prop이 버튼 라벨로 정상 렌더링되는지 확인
  test('prop으로 전달된 텍스트가 렌더링된다.', () => {
    const buttonText = '로그인';
    const mockHandleSubmit = jest.fn();

    render(<AuthBtn text={buttonText} handleSubmit={mockHandleSubmit} />);

    const button = screen.getByRole('button', { name: buttonText });
    expect(button).toBeInTheDocument();
  });

  // 버튼 클릭 시 외부에서 전달된 handleSubmit 콜백이 호출되는지 확인
  test('버튼을 클릭하면 handleSubmit 함수가 호출된다.', async () => {
    const buttonText = '회원가입';
    const mockHandleSubmit = jest.fn();
    const user = userEvent.setup();

    render(<AuthBtn text={buttonText} handleSubmit={mockHandleSubmit} />);

    const button = screen.getByRole('button', { name: buttonText });
    await user.click(button);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
