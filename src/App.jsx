import "./styles.scss";
import "./styles2.css";
import React from "react"

import TournamentGraph from "./tournament_graph"
export default function App() {
//participant="" stage="" 
  let any_list=["a","b","c","d","e","f","g","h",
                "i","j","k","l","m","n","o","p"]
  const participant=Array(16).fill().map((_,i)=>{
    return {id:any_list[i],
    fields:{name:any_list[i]},
    component:(props)=><span>{props.name}</span>,
    getPos:(p)=>p.pos === i+1 ? true:0,
    stagePassed:1
    //matching:{}
  }})
  return (
    <div className="App">
      <TournamentGraph participant={participant}  />
    </div>
  );
}