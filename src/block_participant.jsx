 import React, {
  useState,
  useEffect,
  Fragment,
  createRef,
  forwardRef,
  Children,
  useContext,
   useCallback,
   memo
} from "react";
import PropTypes from "prop-types";
//import structuredClone from "@ungap/structured-clone";
import { blockToNumber, iStage, calculateFromInfo, parentMatch } from "./helper";
import { Flare, BorderGrad, BorderGradTop, BorderGradBottom } from "./effect"
//import {useAnimer} from "./hook"
//import {AnimerContext} from "./animer"
import {BlockTop, BlockBottom,BlockSingle} from "./block_part"
//import tween from '@tweenjs/tween.js'

import {SampleParticipant} from "./matcher"
export default memo(BlockParticipant)
export function BlockParticipant(props) {
 // const animer = useContext(props.animer.ctx)

  let [soloT, setSoloT] = useState(props.soloT || props.stageInfo)
  let [soloB, setSoloB] = useState(props.soloB || props.stageInfo)

  const [listPosib, setListPosib] = useState(blockToNumber({ ...props, stageCount: props.stageInfo.stageCount }))

 // console.log(listPosib)
  const is = iStage({ ...props, stageCount: props.stageInfo.stageCount });
  useEffect(()=>{
    setSoloT(props.soloT || props.stageInfo )
  },[props.soloT])
  useEffect(()=>{
    setSoloB(props.soloB || props.stageInfo)
  },[props.soloB])
  
  
  console.log("bp run...")
  const i = calculateFromInfo(props.stage, props.stageInfo);
  const style = {
    height: i.blockHeight
  };
  const stylect = {
    height: (i.blockGap + i.blockHeight) / 2,
    marginTop: -i.blockHeight / 2
  };
  const stylecb = {
    height: (i.blockGap + i.blockHeight) / 2,
    marginBottom: -i.blockHeight / 2
  }
  const s=useCallback((props2)=> <soloT.component active={props2.active} position={1} {...props}{...soloT.fields} />,[soloT])
  const s2=useCallback((props2)=> <soloB.component active={props2.active} position={2} {...props}{...soloB.fields} />,[soloB])
  

  return (
    <div className="packer" >
      <div className="cont">
        <BlockTop is={is} style={stylect} stylea={style} dataOrder={{number:props.stage}} id={"top_"+props.stage+props.number} 
          soloT={soloT} group={props.stage}
     comp={s}>
          </BlockTop>
        {console.log('bp render..')}
        <BlockBottom is={is} style={stylecb}  stylea={style} dataOrder={{number:props.stage}} id={"bottom_"+props.stage+props.number} 
          soloB={soloB} group={props.stage}
      comp={s2}>
           
        </BlockBottom>
      </div>
    </div>
  );
}
export const BlockParticipantSingle = (props) => {

  const s=useCallback((props2)=> <props.solo.component active={props2.active} position={1} {...props}{...props.solo.fields} number={1}/>,[props.solo])
  const style = {
    height: props.stageInfo.blockHeight
  };

  const is=props.stageCount+1
  return (
    <div className="packer" >
      <div className="cont">

<BlockSingle style={style} is={is} dataOrder={{number:props.stage}} id={"single_"+props.stage+props.number} 
          solo={props.solo} group={props.stage}
      comp={s}/>

      </div>
    </div>
  );
}
BlockParticipant.propTypes = {
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  card: PropTypes.elementType
};

BlockParticipant.defaultProps = {
  top: true,
  bottom: true
};
