import { debounce } from "./debounce.js";

// Jest에서 제공하는 fake timer 사용 설정
jest.useFakeTimers();

describe("debounce function", () => {
  let mockFunction: jest.Mock;

  beforeEach(() => {
    // 테스트용 mock 함수 생성
    mockFunction = jest.fn();
  });

  test("지정된 딜레이 후에만 함수가 호출되어야 함", () => {
    const debouncedFunc = debounce(mockFunction, 300);

    // 함수가 연속적으로 호출됨
    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    // 아직 함수가 호출되지 않음 (debounce 대기 중)
    expect(mockFunction).not.toHaveBeenCalled();

    // 300ms 시간이 흐르도록 타이머 빠르게 진행
    jest.advanceTimersByTime(300);

    // 마지막 호출만 실행됨
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  test("연속 호출 시 마지막 호출만 실행되어야 함", () => {
    const debouncedFunc = debounce(mockFunction, 300);

    // 함수가 여러 번 호출됨
    debouncedFunc();
    jest.advanceTimersByTime(100); // 100ms 후에 다시 호출
    debouncedFunc();
    jest.advanceTimersByTime(100); // 다시 100ms 후에 호출
    debouncedFunc();

    // 아직 함수가 호출되지 않음
    expect(mockFunction).not.toHaveBeenCalled();

    // 300ms가 지난 후 마지막 호출만 실행
    jest.advanceTimersByTime(300);

    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  test("제한 시간 전에 호출이 취소되면 함수는 호출되지 않아야 함", () => {
    const debouncedFunc = debounce(mockFunction, 300);

    // 함수가 한 번 호출됨
    debouncedFunc();

    // 200ms만 경과 (아직 300ms가 안됨)
    jest.advanceTimersByTime(200);

    // 추가 호출 없이 타이머 종료
    expect(mockFunction).not.toHaveBeenCalled();

    // 이제 타이머가 종료되었으므로 300ms 경과
    jest.advanceTimersByTime(100);

    // 함수가 실행됨
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
