import React,{useState, useEffect} from 'react';
import { DataFlare, DataBorderGrad, DataBorderGradTop, DataBorderGradBottom } from "./effect"


export const BlockTop=({style,getData, soloT, animList, children})=>{
  const [animBorderF,setAnimBorderF] = useState({part:{main:false},combiner:{comb:false,flare:false}})
  const [stateChidlren, setStateChildren] = useState()
  const [stateContChildren, setStateConChildren] = useState()
  const [stateCombiner, setStateCombiner] = useState()
  const [stateFlare, setStateFlare] = useState()
  useEffect(()=>{
    setStateChildren((v)=>{
      return soloT ? (soloT.stagePassed ? animBorderF.main.active : true): false;
    })
    setStateConChildren((v=>{

      return animBorderF.main.active
    }))

    
  },[animList])
  useEffect(()=>{
    animList['borderFlare'].addSubscriber({signature:'main',callback:(data)=>{
      setStateChildren((v)=>{
        return soloT ? (soloT.stagePassed ? data : true): false;
      })
    }})
  },[])
  
  return(<div><div style={style} className="block-participant block-participant-bottom">

          <DataBorderGrad anim={(signature,toSet)=>subscribeData(signature,toSet))} active={stateContChildren}>

            {stateChildren ? children: ""}
          </DataBorderGrad>

        </div>

        <div style={style} className="combiner-top ">
          <DataBorderGradTop active={animList["borderFlare"].value2.top.combiner.active}>
            {soloTP&&animList["borderFlare"].value2.top.combiner.active?
            <DataFlare active={animList["borderFlare"].value2.top.combiner.animate} />:""}
          </DataBorderGradTop>
        </div>
   </div>)
}

export const BlockBottom=({style,soloB, animList, ...props})=>{
  return(<div>      
    <div style={style} className="combiner-bottom ">
          <DataBorderGradBottom active={animList["borderFlare"].value2.bottom.combiner.active}>
                      {soloBP&&animList["borderFlare"].value2.bottom.combiner.active?
            <DataFlare active={animList["borderFlare"].value2.bottom.combiner.animate} />:""}
          </DataBorderGradBottom >
        </div>
        <div style={style} className="block-participant block-participant-bottom">

          <DataBorderGrad active={animList["borderFlare"].value2.bottom.part.active}>
            {soloB ? <soloB.component
                       position={2} {...props} {...soloB.fields} /> : ""}
          </DataBorderGrad>


        </div>
    </div>)
}