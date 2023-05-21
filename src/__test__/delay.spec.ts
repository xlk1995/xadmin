import { delay } from "../utils/delay";

it("异步测试", (done) => {
  jest.useFakeTimers();
  delay(() => {
    done();
  });
  jest.runAllTimers();
  expect(true).toBe(true);
});
