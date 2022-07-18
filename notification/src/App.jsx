import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import React from 'react'
import axios from "axios";
const client = axios.create({
  baseURL: "http://localhost:4000/notification" 
});
function App() {
  const [count, setCount] = useState(0)
  const [body, setBody] = useState(null)
  async function RejectButton()
  {
    let response = await client.post('/rejectClient', {
      rejectorId:'123',
      callerId:"1"
      // data:data
    });
  }
  async function AcceptButton()
  {
    console.log(JSON.parse(body).roomId,"body2");
    let response = await client.post('/clientConnected', {
      roomId:JSON.parse(body).roomId,
      userId:"123"
      // data:data
    });
  }
  React.useEffect(() => {
  
    const a = window.location.href
    const index = a.indexOf('/sse/')
    const b=a.slice(index, a.length)
    const eventSource = new EventSource('http://localhost:4000/notification'+b);
    const clientId=b.split('/')[2]
    // console.log(b.split('/')[2]);
    // const evtsrc=new EventSource('http://localhost:3000/notification'+b);
    // evtsrc.addEventListener(`forUser${clientId}`,(e) => {
    //   console.log("hello")
    // },false)

    eventSource.onmessage = async({ data }) => {
      if (data !="Hello Client u r not allowed")
      {
        let response = await client.post('/receiveClient', {
          id:clientId,
          // data:data
        });
      }
      console.log(data);
      setBody(data)
    }
  }, [])
  React.useEffect(()=>
  {
    console.log(body,"body");
  },[body])
  return (
    <div className="App">
      <br />
      <button id='accept' onClick={AcceptButton}>Accept</button>
      <button id='reject'onClick={RejectButton}>Reject</button>
    </div>
  )
}

export default App
