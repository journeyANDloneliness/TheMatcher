import React from 'react';
import './App.css';

function App() {
  let a=Array(16).fill(0).map((v,i)=>{
    return (props)=>{
      return <div>{props.i}</div>
    }
  })
  let a2=a.map((V,i)=>{
    return <V i={i}/>
  })
  return (
    <main>
      {a2}
      React⚛️ + Vite⚡ + Replit🌀asd
    </main>
  );
}

export default App;