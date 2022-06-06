import React,{createContext} from 'react'
import {AnimBorderFlare} from './../preset/sample_animation'
export  const AnimSettContext = createContext()
export default AnimSettContext
export const AnimSett=(props)=>{
  return(
    <AnimSettContext.Provider value={props.settings}>
      {props.children}
    </AnimSettContext.Provider>
  )
}
const defaultAnimSett=[{anim:AnimBorderFlare,triggerAddData:({status,data})=>{
   
    if((data()|| {justChangedStage:false}).justChangedStage){
      return true
    }
  },doneTriggerAdd:({status,data,anim})=>{
   // data().justChangedStage=false
  },collectId:({status,data,anim})=>{
    return data().id
  }},{anim:AnimBorderFlare,triggerAddData:({status,data})=>{
   
    if((data()|| {reverse:false}).reverse){
      return true
    }
  },doneTriggerAdd:({status,data,anim})=>{
   // data().justChangedStage=false
    anim.reverse = true
  
  },collectId:({status,data,anim})=>{
    return data().id
  }}]

export const WithPreset=(preset)=>{
  return(props)=>{
    return(
      <AnimSett settings={preset}>
        {props.children}
        </AnimSett>
    )
  }
}
export const AnimSettDefault=WithPreset(defaultAnimSett)
