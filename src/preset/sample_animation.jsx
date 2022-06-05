import React from 'react'

export const AnimBorderFlare=({id,group,data,dataOrder,...props})=>{return{
      value:{main:false, combiner:false, flare:false },
      setValue:function(time,group,reverse){
        this.value.main=group({400:true}) 
        this.value.combiner=group({100:true})  
        this.value.flare=group({100:true,800:false})
      },
      group:group,
      name: "borderFlare",
      autoStart:true,
      timeout: 800,
      getOrder: function(other){
        if(other.number < dataOrder.number)return-1
        return 1
      },
      dataOrder: dataOrder,
      posibleSubs: 3,
      id:id,
      getValue:function(signature){
        return this.value[signature]
      },
      reverse:false
    }}
