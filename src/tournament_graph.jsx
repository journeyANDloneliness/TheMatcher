import React, {
  useState,
  useEffect, useRef
} from "react";
import Animer,{AnimerConsumer, AnimerContext} from "./animer"
import BlockParticipant, { BlockParticipantSingle } from "./block_participant";
import PropTypes from "prop-types";
import Stager from "./stager";
import useOneTime from "./hook/use_one_time"

import Matcher from "./matcher"
export default function TournamentGraph({ ...props }) {
  const [operation,setOperation] = useState()
  const [statusParticipant,setStatusParticipant] = useState(false)
  const [stageInfo, setStageInfo] = useState({
    blockBorderHeight: 2,
    blockHeight: 50,
    blockGap: 10,
    gap: 20,
    gap2: 10,
    participantCount:8,
    stageCount: 3, ...props.stageInfo
  });
  const [participantRef,participantRefSet] = useState({})
  const [participantDouble,participantDoubleSet] = useState([[]])
  const [last, setLast] = useState(stageInfo)

  useEffect(()=>{
    //if(!lock)return
   let time=1
    let y={}
  let a=Array.from(Array(stageInfo.stageCount), () => []);
    for(let i=1;i<stageInfo.stageCount+1;i++){
      let odd=true;
      let f={}
      for(let i2=1;i2<((stageInfo.participantCount/time)+1);i2++){
        let o=odd?'top':'bottom'
        f[o]=props.participant.find((v)=>{
          return v.selfNumber >=  i2*time-(time-1) &&  v.selfNumber <= i2*time && i <= v.stagePassed 
        }) 
        
        if(f[o])
          if(f[o].justChangedStage){
            f[o]={...f[o]}
            //f[o].justChangedStage=false
          }
        y[i+"-"+i2] = f
        if(!odd){
          a[i-1].push({...f})
        }
        odd = !odd
      }
      time=time*2
    }
    let laste=props.participant.find((v)=>{
          return  v.stagePassed >= stageInfo.stageCount +1
        }) 
    if(laste){
      if(laste.justChangedStage){
            laste={...laste}
      }
      setLast(laste)
    }else setLast(stageInfo)
      
    participantDoubleSet(a)
    participantRefSet(y)
  },[props.participant])
    const [lock,setLock]=useOneTime(2,()=>{
    
    props.participant.forEach((v)=>{
      //v.justChangedStage=false
    })
    if(operation){
     operation.setStatus({justChangedStage:false})
    }
  
  },[props.participant])
  useEffect(()=>{
    let m=new Matcher({...props, stageInfo})
    setOperation(m)
    m.updateStatus=()=>setLock(true)
    props.operation(m)
    
  },[])


  
  return (
            <Animer >
    
              {participantDouble.map((v,i)=>
             ( <Stager stage={stageInfo.stageCount-i} stageInfo={stageInfo} pos={i} key={i.toString()}>
        {v.map((el, i2) => {
            return (

              <BlockParticipant
                number={i2 + 1}
                stage={stageInfo.stageCount-i}

                stageInfo={stageInfo}
                key={i2.toString()}
                soloT={el.top}
                soloB={el.bottom}
                
              />
    
            );
          })}
      </Stager>))}
    <Stager key={"last"} stage={0} stageInfo={stageInfo}>
      <BlockParticipantSingle solo={last} stage={0} stageInfo={stageInfo} />
    </Stager>)
                </Animer>
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

