
import React,{useState} from "react"
import {BorderGrad } from "./../effect"
import {iStage} from "./../helper"
export function BlankSelectParticipant(props){
  const [posib, setPosib] = useState()
  const [parts, setParts] = useState()
  const [visible, setVisible] = useState(false)
  
  return(
    <div className="poke">
      
<button onClick={(ev)=>{
  let list=props.op().getPosibleChildren({number:props.number,stage:props.stage})
         
     setParts(list) ;setVisible(true)}}>choose</button>
      {visible?<SelectParticipant parts={parts} {...props}setVisible={()=>setVisible((v)=>!v)}/>:""}
</div>
  )
}
function SelectParticipant(props){
 
let iv=iStage({stage:props.stage,stageCount:props.stageInfo.stageCount})

  return (
    <div className="list-select">
      <BorderGrad>
      {    
        (props.parts || []).map((v,i)=>{
        if((v<props.parts[props.parts.length/2-1] && props.position == 1)
           ||(v>=props.parts[props.parts.length/2-1] && props.position == 2)){
           return <div key={i} onClick={(ev)=>{props.op().setStagePassed({selfNumber:v,stagePassed:iv
   })    
          props.setVisible(false)
        }} className="list-select-item">
          {v}</div>
        }

          })
      }
      </BorderGrad>
    </div>
  )
}

export function ParticipantWithIcon(props){
  return(<div>X</div>)
}