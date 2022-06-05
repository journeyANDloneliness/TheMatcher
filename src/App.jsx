 import "./styles/styles.scss";

import React,{useState, useEffect} from "react"

import TournamentGraph from "./tournament_graph"
import BracketMatching from "./bracket_matching"
import {AnimSettDefault} from "./context/anim_settings"
import {BlankSelectParticipant} from "./preset/sample_items"
export default function App() {
  const [op, setOperation] = useState()
  const [op2, setOperation2] = useState()
  
  let any_list=["a","b","c","d","e","f","g","h",
                "i","j","k","l","m","n","o","p"]
  const test=Array(16).fill().map((_,i)=>{
    return {id:any_list[i],
    fields:{name:any_list[i]},
    component:(props)=><span className='show-fade' >{props.name}</span>,
    //getPos:(p)=>p.pos === i+1 ? true:0,
    stagePassed:1,
            selfNumber:i+1
    //matching:{} 
  }})
  let y=["e"]
  const setPassed=()=>{
    ["c","a","g","e","i","l","n","p"].forEach((v,i)=>{
      op.setStagePassed({id:v,stagePassed:2})
    })
    y.forEach((v,i)=>{
      op.setStagePassed({id:v,stagePassed:3})
     })
  }
 const reset=()=>{
   op.resetStagePassed()
   op2.resetStagePassed()
 }
  
  let stageInfo={
    component:(props)=><BlankSelectParticipant op={()=>{let r; setOperation(v=>{r=v;return v});return r}} {...props}/>,
    reverse:true
  }
  
  let stageInfo2={
    component:(props)=><div className="flip-item" ><BlankSelectParticipant op={()=>{let r; setOperation2(v=>{r=v;return v});return r}} {...props}/></div>,
    reverse:true
  }
  const [participant1, setParticipant1] = useState(test.slice(0,test.length/2))
  const [participant2, setParticipant2] = useState(test.slice(test.length/2).map(v=>{
    return {...v, component:(props)=><div className="flip-item" ><span className='show-fade' >{props.name}</span></div>}
  }))
  useEffect(()=>{
    if(op){
    ["a","c","g","e","i","l","n","p"].forEach((v,i)=>{
      op.setStagePassed({id:v,stagePassed:2})
    })
    y.forEach((v,i)=>{
      op.setStagePassed({id:v,stagePassed:3})
     })
    }
  },[])


  useEffect(()=>{
    if(op){
    op.onDone(op.participant)
     

    
    }
  },[op])
    useEffect(()=>{
    if(op2)
    op2.onDone(op2.participant)
  },[op2])
  let s1=(<TournamentGraph 
        operation={(me)=>{
          me.setOnDone((participant)=>setParticipant1([...participant]))  
          setOperation(me)
        }}
            
            stageInfo={stageInfo}
        participant={participant1}  />)
  
  let s2=(<TournamentGraph 
        operation={(me)=>{
          me.setOnDone((participant)=>setParticipant2([...participant]))  
          setOperation2(me)
        }}
            
            stageInfo={stageInfo2}
        participant={participant2}  />)

  return (
    <div className="App">
      <button onClick={setPassed}>set passed</button>
      <button onClick={reset}>reset</button>
      <AnimSettDefault>
        <BracketMatching sideL={s1} sideR={s2} />  
      </AnimSettDefault>
      
    </div>
  );
}