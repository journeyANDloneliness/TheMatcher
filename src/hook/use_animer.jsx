import React, {  useState,  useEffect, useContext} from "react";
import {AnimerContext} from './../animer'
import AnimSettContext from './../context/anim_settings'
  

const useAnimer=({dependency,id,group, dataOrder, data, ...props})=>{
  const animerContext = useContext(AnimerContext)
  const animSettContext = useContext(AnimSettContext)
  const [animList, setAnimList] = useState(()=>{
    return {  
      list:{},
      subscribeData:function(signature,callback){
        this.subscriber.push({signature,callback})
      },
      subscriber:[]
    }
  })

  useEffect(()=>{
    
  },[])
  
  
  useEffect(()=>{
    let status={status:'onMount'}
    runAnim(status)
    
  },[dependency()])
  
  const runAnim=(status)=>{
 
    animSettContext.forEach((v,i)=>{
      if(v.triggerAddData({status, props,data})){
        let anim=animerContext.subscribe(v.anim({props,data,id,group, dataOrder}))
        anim.onDone=function(){
          animList.subscriber.forEach(v2=>{
            v2.callback(this.getValue(v2.signature(this.name)),anim)
          })
        }
        v.doneTriggerAdd({status, data,anim})
        
        if(anim){
          if(anim.autoStart){
            anim.start(anim)
          }
          anim.finish = ()=>setAnimList((a)=>{
            a.subscriber = []
            return {...a}
          })
          setAnimList((a)=>{
            console.log("anim list updating...")
            
            a.list[anim.name]=anim
            return {...a}
          })
        }
      }
    })
  }
  return [animList,setAnimList]
  
}

export default useAnimer