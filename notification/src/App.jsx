import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import React from 'react'

function App() {
  const [count, setCount] = useState(0)
  React.useEffect(() => {
  
    const a = window.location.href
    const index = a.indexOf('/sse/')
    const b=a.slice(index, a.length)
    const eventSource = new EventSource('http://localhost:4000/notification'+b);
   
    console.log(b);
    eventSource.onmessage = ({ data }) => {
      console.log(data);
    }
  }, [])
  return (
    <div className="App">
      hello world
    </div>
  )
}

export default App
