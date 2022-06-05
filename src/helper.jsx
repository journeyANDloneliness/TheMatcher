import structuredClone from "@ungap/structured-clone";

export function calculateFromInfo(stage, info) {
  if (stage === info.stageCount) return info;
  else {
    var i = {...info};
    i.blockGap =
      info.blockGap + info.gap + info.blockHeight + info.blockBorderHeight * 2;
    i.gap = info.gap + info.blockGap + info.blockHeight;

    return calculateFromInfo(stage + 1, i);
  }
}
export function blockToNumber({ partCount, stageCount, side, stage, number }) {
  //side = (partCount / 2) * side;
  var time = 2 ** (stageCount - (stage - 1));
  console.log("time" + time);
  console.log("time",stage);
  return Array(time)
    .fill()
    .map((_, i) => {
      //return side + number * time - i;
      return number * time - i;
    });
}
export function blockToNumber2({ partCount, stageCount, side, stagePassed, number }) {
  //side = (partCount / 2) * side;
  var time = 2 ** stagePassed;
  console.log("time" + time);
  console.log("time",stagePassed);
  return Array(time)
    .fill()
    .map((_, i) => {
      //return side + number * time - i;
      return number * time - i;
    });
}
export function iStage({ stageCount, stage }) {
  return stageCount - (stage - 1);
}

export function parentMatch({number, stagePassed}){

  for(let i=0;i<stagePassed;i++){
    
    number=Math.ceil(number/2)
    
  }
  return Math.floor(number)
}

export function getStageCount({a=0, stage}) {
  stage += 1;
  if (a / 2 > 2) return getStage({a:a / 2, stage});
  else return stage;
}