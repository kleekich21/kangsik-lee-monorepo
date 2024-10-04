/**
 * 지정된 시간 내에 오직 한번의 호출만 실행되도록 하는 throttle 함수.
 *
 * @template T 함수 타입
 * @param func 지정된 시간에 한번만 호출 되도록 제한할 함수
 * @param delay 다음 함수 호출이 될수 있는 최소시간 (밀리초 단위)
 * @returns 지정된 시간 내에 호출되는 한번만 호출되는 새로운 함수
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (!timerId) {
      func.apply(this, args);
      timerId = setTimeout(() => {
        timerId = null;
      }, delay);
    }
  };
}
