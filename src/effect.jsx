import React,{useEffect, useState,Fragment,createContext} from "react"


const Context =createContext()
const {DataContextProv,DataContextCon} = Context
export const EffectState={Partial:0,Complete:1}
export const EffectStateCss={0:"-partial",1:"-complete"}
Object.freeze(EffectState)
Object.freeze(EffectStateCss)
export function Data(props){
  const [data,setData] = useState(false)
  useEffect(()=>{
    
    props.anim((animname)=>{
      if(animname==props.animname)return props.signature 
    },(result)=>{
      setData(props.stateManipulator(result))
    })
  },[props.stateManipulator])

  
  return (<Context.Provider  value={data}>
      {props.children}
  </Context.Provider>)
} 
export function WithData(Com,signature,animname){
  return (props)=>(
       <Data {...props} signature={signature} animname={animname}>
   <Context.Consumer>
      {value=><Com active={value}>
        { props.children}
      </Com>}
      </Context.Consumer>
      </Data>
    )
      
  
}

export const DataBorderGrad=WithData(BorderGrad,'main','borderFlare')
export const DataBorderGradTop=WithData(BorderGradTop,'combiner','borderFlare')
export const DataBorderGradBottom=WithData(BorderGradBottom,'combiner','borderFlare')
export const DataFlare=WithData(Flare,'flare','borderFlare')
console.log('DataBorderGrad',DataBorderGrad)

export function BorderGrad(props){

  return(<div className={"b-grad-wrap  p-w grad-wrap"+(EffectStateCss[props.active] || " ")}>       
          <div className={"grad p"}>
            
            {props.children}
            </div>
    </div>
            )
}
export function BorderGradTop(props){
  return(<div className={"b-grad-wrap2 s-w "+(props.active?"grad-combiner-active":"grad-combiner")}>       
          <div className={"grad-ver" }></div>
          <div className={"grad-hor"}></div>
            {props.children}
            
    </div>
            )
}
export function BorderGradBottom(props){
  return(<div className={"b-grad-wrap2 flip-ver s-w "+(props.active?"grad-combiner-active":"grad-combiner")}>       
          <div className={"grad-ver"}></div>
          <div className={"grad-hor"}></div>
            {props.children}

    </div>
            )
}
export function Flare({active}){       
  return(<div className="combiner-flare">
          
     
            <div className={active?"combiner-f":""}>
              </div>
            </div>)
}