import React,{useEffect,useState} from 'react'
let c=0
export default function useOneTime(count,callback,dependency){
  const [lock, setLock] = useState(true)
  useEffect(()=>{
    if(lock){
        callback()
       // setTimeout(callback,1000)
        setLock(false)

      
    }
  },dependency)

  return [lock,setLock]
}