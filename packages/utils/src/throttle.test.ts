import { throttle } from "./throttle.js";

// Jest에서 제공하는 fake timer 사용 설정
jest.useFakeTimers();

describe("throttle function", () => {
  let mockFunction: jest.Mock;

  beforeEach(() => {
    // 테스트용 mock 함수 생성
    mockFunction = jest.fn();
  });

  test("주어진 시간 내에 한 번만 함수가 호출되어야 함", () => {
    const throttledFunc = throttle(mockFunction, 500);

    // 함수가 연속적으로 호출됨
    throttledFunc();
    throttledFunc();
    throttledFunc();

    // 아직 함수가 한 번만 호출됨
    expect(mockFunction).toHaveBeenCalledTimes(1);

    // 500ms 후에 다시 호출 가능
    jest.advanceTimersByTime(500);

    throttledFunc();

    // 두 번째 호출이 이루어져야 함
    expect(mockFunction).toHaveBeenCalledTimes(2);
  });

  test("연속 호출 시 시간 제한 안에 두 번째 호출은 무시되어야 함", () => {
    const throttledFunc = throttle(mockFunction, 500);

    // 함수가 연속적으로 호출됨
    throttledFunc();
    jest.advanceTimersByTime(200); // 200ms 후에 다시 호출
    throttledFunc();

    // 500ms가 지나기 전까지 두 번째 호출은 무시됨
    expect(mockFunction).toHaveBeenCalledTimes(1);

    // 500ms가 지난 후 다시 호출 가능
    jest.advanceTimersByTime(300);
    throttledFunc();

    expect(mockFunction).toHaveBeenCalledTimes(2);
  });

  test("제한 시간 내에는 추가 호출이 무시되어야 함", () => {
    const throttledFunc = throttle(mockFunction, 500);

    // 첫 호출
    throttledFunc();

    // 500ms 이내에 여러 번 호출
    jest.advanceTimersByTime(100);
    throttledFunc();
    jest.advanceTimersByTime(100);
    throttledFunc();

    // 첫 호출만 유효함
    expect(mockFunction).toHaveBeenCalledTimes(1);

    // 500ms가 지나면 다시 호출 가능
    jest.advanceTimersByTime(300);
    throttledFunc();
    expect(mockFunction).toHaveBeenCalledTimes(2);
  });
});
