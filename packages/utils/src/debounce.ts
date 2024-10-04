/**
 * 지정된 시간 내에 연속적으로 호출된 함수 중 마지막 호출만 실행되도록 하는 debounce 함수.
 *
 * @template T 함수 타입
 * @param func 연속적으로 호출될 수 있는 대상 함수
 * @param delay 함수 호출을 지연시킬 시간 (밀리초 단위)
 * @returns 주어진 딜레이 후에만 호출되는 새로운 함수
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}
