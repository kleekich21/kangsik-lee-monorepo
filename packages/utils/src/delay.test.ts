import { describe, expect, test } from "@jest/globals";
import { delay } from "./delay";
import timeSpan from "time-span";

describe("delay", () => {
  test("주어진 시간동안 프로세스를 지연시킨다.", async () => {
    const DELAY_TIME = 2000;
    const end = timeSpan();

    await delay(DELAY_TIME);
    const duration = end();

    expect(duration).toBeGreaterThanOrEqual(DELAY_TIME);
    expect(duration).toBeLessThan(DELAY_TIME + 50);
  });
  test("프로미스를 처리한다.", async () => {
    await expect(delay(1000)).resolves.toBeUndefined();
  });
});
