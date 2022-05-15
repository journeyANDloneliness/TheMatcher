import structuredClone from "@ungap/structured-clone";

export function calculateFromInfo(stage, info) {
  if (stage === info.stageCount) return info;
  else {
    var i = structuredClone(info);
    i.blockGap =
      info.blockGap + info.gap + info.blockHeight + info.blockBorderHeight * 2;
    i.gap = info.gap + info.blockGap + info.blockHeight;

    return calculateFromInfo(stage + 1, i);
  }
}
export function blockToNumber({ partCount, stageCount, side, stage, number }) {
  side = (partCount / 2) * side;
  var time = 2 ** (stageCount - (stage - 1));
  console.log("time" + time);
  return Array(time)
    .fill()
    .map((_, i) => {
      return side + number * time - i;
    });
}
export function iStage({ stageCount, stage }) {
  return stageCount - (stage - 1);
}
