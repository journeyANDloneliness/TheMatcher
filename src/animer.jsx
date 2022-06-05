import React, {
  useState,
  useEffect,
  Fragment,
  useRef,
  createRef,
  forwardRef,
  Children,
  createContext
} from "react";
export const AnimerContext = createContext();
const {Provider, Consumer} = AnimerContext

export const AnimerConsumer = Consumer
const Anim={PLAY:0,STOP:1}
Object.freeze(Anim)
const defaultAnim = {start:false, frames:[],timeout:300,groups:{},interval:null,timepassed:0,status:Anim.STOP, name:'default_anim'}
export default function Animer(props){

  const animPools=useRef({x:1})

  const subscribe=({name="default_anim",group,value,timeout=300,
                    animSettings,dataOrder,getOrder,posibleSubs,id,onDone,getValue,setValue,value2,autoStart,reverse})=>{
    let frame ={timeout,value,group,
                animIt, start, dataOrder,getOrder,posibleSubs,name,id,onDone,getValue,setValue, value2,autoStart,reverse}
    
    
    
    
    animPools.current.x+=1
    let anim= animPools.current[name] || {...defaultAnim}
    let found
    anim.frames.find((c,i,a)=>{
      if(c[0].group != group)return false
      else
      return c.find((c2,i2,a2)=>{
      if(c2.id === id){
        found=c2
        return true
      }else return false})
    })
    if(found)return found
    console.log(id)
    
    if(animSettings)anim={...anim,...animSettings}
    anim.name=name
    let f=true
    anim.frames.forEach((v,i)=>{
      if(v[0].group == group){
        v.push(frame)
        f=false
      } 
    });
    if(f)anim.frames.push([frame])

    anim.frames.sort((f1, f2)=>{
      return f1[0].getOrder(f2[0].dataOrder)
    })
    let timelineGrp=0
    anim.frames.forEach((v,i)=>{  
      anim.groups[v[0].group]=timelineGrp
      timelineGrp+=v[0].timeout
    })
    anim.groups["last"] = timelineGrp
    
    
    animPools.current[name]=anim
    frame.pools=animPools.current[name]

   // console.log(animPools)
    
    return frame
  }


  const animIt = async (frame)=>{
    function reverse(fr){
      return (v)=>{
        if(fr.reverse) return !v
        return v
      }
    }
    function group(grp,time,reverse){
      let x=(frm)=>{
        let k=Object.keys(frm)
        if(time>=grp)
          for(let i=0;i<k.length;i++){
            
            
            if(time>=Number.parseInt(k[i]) && time<=(Number.parseInt(k[i+1])+grp || animPools.current[ frame.name].groups["last"])){ 
              return reverse(frm[k[i]])
            }
          
          }
        return false
      }
      return x
    }
    while(animPools.current[ frame.name].timepassed < animPools.current[ frame.name].groups["last"]+100){

      //setAnimPools((v)=>{return{...v}})
      
    


      animPools.current[ frame.name].frames.forEach((a)=>{
        a.forEach((a2)=>{
          console.log("animname inside:",a2.id)
          let time=animPools.current[ a2.name].timepassed
          let r=reverse(a2)
          let v=group(animPools.current[ a2.name].groups[a2.group],time,r)
          
          a2.setValue(time,v,r)

          console.log("anim start.. inside:",time)
          console.log("anim start.. inside:",a2.pools)
          a2.onDone(a2)
        })
      })
       await new Promise(resolve=>
        setTimeout(()=>{
          resolve()
        },100))
      animPools.current[ frame.name].timepassed+=100
    
    }
    
  }
  
  const start=(frame)=>{
      console.log(frame.name+"..........") 
      if(animPools.current[ frame.name].status == Anim.PLAY) return
      console.log("done...")
      animPools.current[ frame.name].status=Anim.PLAY
      frame.animIt(frame).then(ok=>{
        clearInterval(animPools.current[ frame.name].interval)
        animPools.current[ frame.name].timepassed=0
        animPools.current[ frame.name].status=Anim.STOP
        animPools.current[ frame.name].frames=[]
        animPools.current[ frame.name].groups={}
        if(frame.finish)
          frame.finish()
      })

  }
  useEffect(()=>{
     
    
    console.log("animpools",animPools)
     
    
  },[animPools])
    
 
  return(
    <Fragment>
      <Provider value={{subscribe}}>
        {props.children}
      </Provider>
    </Fragment>
  )
}
