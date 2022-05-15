import React, {
  useState,
  useEffect,
  Fragment,
  createRef,
  forwardRef,
  Children
} from "react";

import BlockParticipant, { BlockParticipantSingle } from "./block_participant";
import PropTypes from "prop-types";
import Stager from "./stager";
import GraphGrouper from "./graph_grouper";

export default function TournamentGraph({ participant, card }) {
  var half = participant.length / 2;
  var side = half / 2;
  var a = 3;
  console.log(a);
  var o = {
    blockBorderHeight: 2,
    blockHeight: 50,
    blockGap: 10,
    gap: 20,
    gap2: 10,
    stageCount: a
  };
  const [stageInfo, setStageInfo] = useState(o);
  //side left

  var stager_list_l = Array(a);
  var next = 1;
  const [b, setB] = useState(Array(16).fill({}));
  const setBPInfo = (idx, data) => {
    b[idx] = data;
    setB(b);
  };
  var sl = stager_list_l.fill(0).map((el, i) => {
    next *= 2;
    return (props) => (
      <Stager stage={i + 1} stageInfo={stageInfo} pos={i} key={i.toString()}>
        {Array(next / 2)
          .fill(0)
          .map((el, i2) => {
            setB[i2] = {};
            return (
              <BlockParticipant
                partCount={participant.length }
                number={i2 + 1}
                stage={i + 1}
                side={props.side}
                active
                l={b}
                stageInfo={stageInfo}
                key={i2.toString()}
                card={card}
                participant={participant}
              />
            );
          })}
      </Stager>
    );
  });
  sl.unshift(
    (props)=><Stager side={props.side} stage={0} stageInfo={stageInfo}>
      <BlockParticipantSingle side={props.side} stage={0} stageInfo={stageInfo} />
    </Stager>
  );
  
  let sl1 = sl.map((V, i) => {
    return <V key={i} {...stageInfo} side={1}/>;
  });
  let sl2 = sl.map((V, i) => {
    return <V key={i} {...stageInfo} side={1}/>;
  })

  var bp = Array(participant).map((el, i) => {
    return <Stager {...stageInfo} pos="1">{sl}</Stager>;
  });
  return (
    <div className="bracket-matching">
      <div className="side reverse">{sl1}</div>
      <div className="center-matching">
        <div className="center-top"></div>
        <div className="center-top"></div>
      </div>
      <div className="side">{sl2}</div>
    </div>
  );
}

TournamentGraph.propTypes = {
  participant: PropTypes.array,
  stage: PropTypes.number,
  card: PropTypes.elementType
};

TournamentGraph.defaultProps = {
  participant: Array(16)
    .fill(1)
    .map((_, idx) => {
      id: idx;
    }),
  stage: 0
};
function getStage(a, stage) {
  stage += 1;
  if (a / 2 > 2) return getStage(a / 2, stage);
  else return stage;
}
