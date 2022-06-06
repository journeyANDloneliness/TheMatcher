import React,{useState, useEffect, useCallback} from 'react';
import { DataFlare, DataBorderGrad, DataBorderGradTop, DataBorderGradBottom } from "./effect"
import useAnimer from './hook/use_animer'
import AnimSettContext from './context/anim_settings'

export const BlockTop=({style,getData, soloT, animList, children})=>{
  const [animBorderF,setAnimBorderF] = useState({part:{main:false},combiner:{comb:false,flare:false}})
  const [stateChidlren, setStateChildren] = useState()
  const [stateContChildren, setStateConChildren] = useState()
  const [stateCombiner, setStateCombiner] = useState()
  const [stateFlare, setStateFlare] = useState()
  const animSettContext = useContext(AnimSettContext)
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
  const subscribe=useCallback((signature,toSet)=>subscribeData(signature,toSet),[animList])
  
  const [animList, setAnimList] = useAnimer({...props, data:soloT,
                                             animSett:animSettContext, depedency:soloT })
  
  return(<div><div style={style} className="block-participant block-participant-bottom">

          <DataBorderGrad anim={subscribe} active={stateContChildren}>

            {stateChildren ? children: ""}
          </DataBorderGrad>

        </div>

        <div style={style} className="combiner-top ">
          <DataBorderGradTop anim={subscribe}>  
            <DataFlare anim={subscribe} />
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