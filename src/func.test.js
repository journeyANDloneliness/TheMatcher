import structuredClone from "@ungap/structured-clone";

import { calculateFromInfo, blockToNumber } from "./helper";

it("works", () => {
  var r = calculateFromInfo(3, { h: 200, gap: 10, gap2: 10, stageCount: 3 });
  expect(r.h).toBe(200);
});
it("works", () => {
  var r = calculateFromInfo(2, { h: 200, gap: 10, gap2: 10, stageCount: 3 });
  expect(r.h).toBe(200 + 10);
});

it("works", () => {
  var r = calculateFromInfo(1, { h: 200, gap: 10, gap2: 10, stageCount: 3 });
  expect(r.h).toBe(200 + 10 + 200 + 10);
});

it("works", () => {
  var r = blockToNumber({
    partCount: 16,
    stageCount: 3,
    side: 0,
    stage: 1,
    num: 1
  });
  expect(r).toStrictEqual([8, 7, 6, 5,4,3,2,1]);
});
