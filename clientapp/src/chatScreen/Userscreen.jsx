import React from "react";
import { useState,useCallback,useEffect} from "react";

import {useNavigate} from 'react-router-dom'

import {useSocket} from '../context/SocketProvider'
import './Userscreen.css'

const Userscreen = () =>{
    const [email,setEmail] = useState('');
    const [room,setRoom] = useState('')

    const socket = useSocket();

    const navigate = useNavigate();

   

    const submitForm = useCallback((e)=>{
            e.preventDefault();
            socket.emit("room:join",{email,room});
            console.log({email,room})
           
    },[email,room,socket]);

    const handleJoinRoom = useCallback((data)=>{
        const{email,room} = data
        navigate(`/room/${room}`);
    },[])

    useEffect(() => {
        socket.on("room:join",handleJoinRoom)
        return () =>{
            socket.off("room:join",handleJoinRoom);
        }
    },[socket,handleJoinRoom]);
    return(
        <div className="mainContainer">
        <h1>User Screen</h1>
        <form onSubmit={submitForm}>
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="room">Room Number</label>
          <input
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <br />
          <button>Join</button>
        </form>
      </div>
    )
}

export default Userscreen