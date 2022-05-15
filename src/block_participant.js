import React, {
  useState,
  useEffect,
  Fragment,
  createRef,
  forwardRef,
  Children
} from "react";
import PropTypes from "prop-types";
import structuredClone from "@ungap/structured-clone";
import {blockToNumber,iStage, calculateFromInfo } from "./helper";
function getSide({partCount, pos}){
  return pos <= partCount/2?0:1;
}
function getTeam(){

}

export default function BlockParticipant(props) {
  const [animFlare,setAnimFlare] = useState({})
  const [active,setActive] =useState({})
  const [activeCombiner, setActiveCombiner]=useState({})
  const [animBurst,setAnimBurst] = useState({})
  const [showFlare, setShowFlare] = useState(false)
  const [topP, setTopP] = useState(props.participant)
  const [botP, setBotP] = useState(props.participant)
  const [listPosib,setListPosib]= useState(blockToNumber({...props,stageCount:props.stageInfo.stageCount}))
  const is=iStage({...props,stageCount:props.stageInfo.stageCount})
  useEffect(()=>{
    console.log("test")
    props.participant.forEach((o,i)=>{
      listPosib.forEach((v,n)=>{
      if(o.getPos({pos:v})){
          if(o.stagePassed === is)
         { if(v/(2**is)>=1)
           setBotP(o)
           else
           setTopP(o)
         }
          
      }})
    })
  },[props.participant, listPosib])
  useEffect(()=>{

  },[topP,botP])
  const a={b:()=><div>a</div>}
  var bt = "";
  var bb = "";
  var i = calculateFromInfo(props.stage, props.stageInfo);
  var style = {
    height: i.blockHeight
  };
  var stylect = {
    height: (i.blockGap+i.blockHeight)/2,
    marginTop: -i.blockHeight/2
  };
  var stylecb ={
    height: (i.blockGap+i.blockHeight)/2,
    marginBottom: -i.blockHeight/2
  }
  var styleCont={
    height: i.blockGap+(i.blockHeight*2),
  }
  if (props.top) {
    bt = <div style={style} className="block-participant block-participant-top "></div>;
  }
  if (props.bottom) {
    bb = <div style={style} className="block-participant block-participant-bottom"></div>;
  }
  return (
    <div   className="packer" >
      <div className="cont">
      <div style={style} className="block-participant block-participant-bottom">
        <topP.component {...topP.fields}/>
      </div>
        <div style={stylect} className="combiner-top ">
          <div className="combiner-flare">
          
            <div className="combiner-f-mover">
            </div>
            <div className="combiner-f">
              </div>
            </div>
        </div>

        <div style={stylecb} className="combiner-bottom "></div>
      <div style={style} className="block-participant block-participant-bottom">
      <botP.component {...topP.fields}/>

</div>        
      </div>
    </div>
  );
}
export const BlockParticipantSingle = (props)=>{
 
  var i = calculateFromInfo(props.stage, props.stageInfo);
  var style = {
    height: i.blockHeight
  };
  var style2 = {
    height: 0,
    marginTop: -i.blockHeight/2,
  };

  return (
    <div   className="packer" >
      <div  className="cont">

      <div style={style} className="block-participant block-participant-bottom"></div>
        <div style={style2} className="combiner "></div>
 
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
