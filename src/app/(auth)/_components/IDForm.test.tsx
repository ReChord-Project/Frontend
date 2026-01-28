import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IDForm from './IDForm';

describe('IDForm 컴포넌트', () => {
  // 아이디 입력을 위한 라벨과 input 필드가 화면에 정상 렌더링되는지 확인
  test('아이디 라벨과 입력 필드가 렌더링된다.', () => {
    const mockSetId = jest.fn();
    render(<IDForm id="" setId={mockSetId} />);

    const label = screen.getByLabelText('아이디');
    const input = screen.getByPlaceholderText('아이디를 입력하세요');

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  // input에 값을 입력할 때 onChange를 통해 setId 콜백이 호출되는지 확인
  test('입력 필드에 값을 입력하면 setId 함수가 호출된다.', async () => {
    const mockSetId = jest.fn();
    const user = userEvent.setup();
    render(<IDForm id="" setId={mockSetId} />);

    const input = screen.getByPlaceholderText('아이디를 입력하세요');
    await user.type(input, 'testuser');

    // 타이핑 과정에서 setId가 한 번 이상 호출되는지 검증
    expect(mockSetId).toHaveBeenCalled();
  });

  // 외부에서 잔달된 id prop 값이 input의 value로 반영되는지 확인
  test('id prop으로 전달된 값이 입력 필드의 value로 설정된다.', () => {
    const mockSetId = jest.fn();
    const testId = 'initialId';
    render(<IDForm id={testId} setId={mockSetId} />);

    const input = screen.getByPlaceholderText('아이디를 입력하세요');
    expect(input).toHaveValue(testId);
  });
});
