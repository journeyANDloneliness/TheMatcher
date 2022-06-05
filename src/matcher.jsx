import React from "react"
import {blockToNumber, blockToNumber2, parentMatch,iStage} from "./helper"
export const SampleParticipant={
    id:-1,
    fields:{name:"test"},
    component:(props)=><span>{props.name}</span>,
    //getPos:(p)=>p.pos === i+1 ? true:0,
    stagePassed:1,
    selfNumber:1,
  justChangedStage:false
    //matching:{} 
  }
;

export default class Matcher{
  constructor({participant, stageInfo}){
    this.participant =participant
    this.stageInfo=stageInfo
    this.onDone=()=>{}
    this.updateStatus=()=>{}
    this.initParticipant()
  }
  setParticipant(p){
    this.participant = p
  }
  initParticipant(){
    this.participant = this.participant.map((v,i)=>{
      return {...v,justChangedStage:true,selfNumber:i+1}
    })
    this.onDone(this.participant)
    
  }
  setStatus(obj){
    this.participant=this.participant.map((v1,i)=>{
        Object.keys(obj).forEach(v2=>{
          v1[v2] = obj[v2]
        })
        return v1
      })
    this.onDone(this.participant)
  }
  match(id1, id2) {
    
  }
  getPosibleChildren({number,stage}){
      return blockToNumber({...this.stageInfo,stage,number})
  }
  populateParticipant(){

  }
  getOpponent(){

  }
  getBeatenOpponent(){

  }
  resetStagePassed(){
    this.participant.forEach((v,i)=>{
      v.stagePassed=1
      v.justChangedStage=true
    })
    this.onDone(this.participant)
    this.updateStatus()
  }
  setStagePassed({id,selfNumber, stagePassed}){
    let solo=this.setStage({id,selfNumber, stagePassed})
    if(solo)this.stageUpdate({solo,id,selfNumber, stagePassed})
  }
  setStage({id,selfNumber, stagePassed}){
        let o
    if(selfNumber){
      o=this.participant[selfNumber-1]    }
    else if(id){
      o=this.participant.find((o,i,a)=>o.id==id)}
    if(o){
      o.stagePassed = stagePassed
      o.justChangedStage = true
      
    }
    console.log(o)
    return o
  }
  stageUpdate({solo,id,selfNumber, stagePassed}){
    let p=parentMatch({number:solo.selfNumber,stagePassed})
    let l=blockToNumber2({...this.stageInfo,stagePassed,number:p})
    let dl=solo.selfNumber<l[l.length/2-1]?l.length/2:0
    let x=l.slice(0+dl,l.length/2+dl)
    console.log("sliced stage update",solo,l,x,p)
      x.forEach((v,i)=>{
      this.participant.forEach((o,i)=>{
  
        if(o.selfNumber == v && o != solo)
          if(o.stagePassed>=stagePassed)
          o.stagePassed=stagePassed-1
      })
    })
    this.onDone(this.participant)
    this.updateStatus()
  }
  decStagePassed({id,selfNumber}){
    let p=1
    if(this.selfNumber) p = this.participant[selfNumber-1].stagePassed
    if(this.id) p = this.paticipant.find((o,i,a)=>o.id==id).stagePassed
    this.setStage({id,selfNumber,stagePassed:p-1})
    this.onDone(this.participant)
    
  }
  incStagePassed(id){
    let p=1
    if(this.selfNumber) p = this.participant[selfNumber-1].stagePassed
    if(this.id) p = this.paticipant.find((o,i,a)=>o.id==id).stagePassed
    this.setStage({id,selfNumber, stagePassed})
    this.stageUpdate({id,selfNumber, stagePassed})
  }
  setOnDone(f){this.onDone=f}
  
}

function randomMatching(){

}