import { add } from "../utils/add";

describe("测试add函数", () => {
    test("add(1,2) === 3", () => {
      // 断言
      expect(add(1, 2)).toBe(3);
    });
  
    test("add(2,2) === 5", () => {
      expect(add(2, 2)).toBe(4);
    });
  });