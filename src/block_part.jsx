import React,{useState, useEffect, useCallback,useRef,Fragment, memo} from 'react';
import { DataFlare, DataBorderGrad, DataBorderGradTop, DataBorderGradBottom, WithData,EffectState } from "./effect"
import useAnimer from './hook/use_animer'


const _BlockTop=({style,is,stylea,id, group,soloT,dataOrder, getOrder, comp, children})=>{
  const [solo,setSolo]=useState(soloT)
  const ChildrenCom  = useRef(WithData(comp,'main','borderflare')) 
  
  useEffect(()=>{
    ChildrenCom.current = WithData(comp,'main','borderflare')
  },[comp])
  useEffect(()=>{
    setSolo(soloT)
  },[soloT])
  
  const stateManipulatorCombiner=(result)=>{
    return soloT.stagePassed > is? result :false
  }
  const stateManipulatorConChild=(result)=>{
     return result? (soloT.stagePassed > is? EffectState.Complete  :EffectState.Partial ):false
  }

  const stateChildren=(result)=>{
    return soloT ? (soloT.stagePassed ? result: true): false;
  }
  
  const [animList, setAnimList] = useAnimer({id,group, data:()=>soloT, dataOrder, dependency:()=>soloT})
  
  const subscribe=useCallback((signature,toSet)=>animList.subscribeData(signature,toSet),[animList])
  
  
  return(<Fragment><div style={stylea} className="block-participant block-participant-bottom">

          <DataBorderGrad anim={subscribe} stateManipulator={stateManipulatorConChild}>

            <ChildrenCom.current anim={subscribe} stateManipulator={stateChildren}/>
          </DataBorderGrad>

        </div>
    {console.log('bp child')}
        <div style={style} className="combiner-top ">
          <DataBorderGradTop anim={subscribe} stateManipulator={stateManipulatorCombiner}>  
            <DataFlare anim={subscribe} stateManipulator={stateManipulatorCombiner}/>
          </DataBorderGradTop>
        </div>
   </Fragment>)
}

const _BlockBottom=({style,is,stylea, group,id,dataOrder, soloB,comp, children})=>{
  
  const ChildrenCom  = useRef(WithData(comp,'main','borderflare')) 

  useEffect(()=>{
    ChildrenCom.current = WithData(comp,'main','borderflare')
  },[comp])
  
  const stateManipulatorCombiner=(result)=>{
    return soloB.stagePassed > is? result :false
  }
  const stateManipulatorConChild=(result)=>{
    return result? (soloB.stagePassed > is? EffectState.Complete  :EffectState.Partial ):false
  }
  const stateChildren=(result)=>{
    return soloB ? (soloB.stagePassed ? result: true): false;
  }
  
  const [animList, setAnimList] = useAnimer({id,group,data:()=>soloB,dataOrder, dependency:()=>soloB })
  
  const subscribe=useCallback((signature,toSet)=>animList.subscribeData(signature,toSet),[animList])
  
  
  return(<Fragment>
     <div style={style} className="combiner-top ">
          <DataBorderGradBottom anim={subscribe} stateManipulator={stateManipulatorCombiner}>  
            <DataFlare anim={subscribe} stateManipulator={stateManipulatorCombiner}/>
          </DataBorderGradBottom>
        </div>
      <div style={stylea} className="block-participant block-participant-bottom">

          <DataBorderGrad anim={subscribe} stateManipulator={stateManipulatorConChild}>

            <ChildrenCom.current anim={subscribe} stateManipulator={stateChildren}/>
          </DataBorderGrad>

      </div>

       
   </Fragment>)
}

export const BlockBottom=memo(_BlockBottom)
export const BlockTop=memo(_BlockTop)