import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@material-tailwind/react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


import { FaVideo } from 'react-icons/fa'

import { useSocket } from '../SocketContext/SocketProvider';



function VideocallModal({doctor,setShow}) {
 
    const socket = useSocket()
  

    const Email = 'patient@gmail.com'
    const navigate = useNavigate()
  
    const handleSubmitForm = useCallback(() => {
      
      console.log('hj')
      // e.preventDefault()
      socket.emit("room:join", { Email, doctor })
  
    }, [Email, doctor, socket])
  
   
  
    const handleJoinRoom = useCallback((data) => {
      const { Email, doctor } = data
      console.log(doctor,'adipoli')
      navigate(`/room/${doctor}`)
    }, [navigate])
  
  useEffect(() => {
    socket.on("room:join", handleJoinRoom)
    return () => {
      socket.off("room:join", handleJoinRoom)
    }
   },[socket])
  
  


    return (
            <div className="w-full">
            <div className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
                <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
                <img className="w-32 mx-auto rounded-full -mt-20 border-8 border-white" src="https://avatars.githubusercontent.com/u/67946056?v=4" alt />
                <div className="text-center mt-2 text-3xl font-medium">{doctor?.user?.username}</div>
                <div className="text-center mt-2 font-light text-sm">@devpenzil</div>
                <div className="text-center font-normal text-lg">Kerala</div>
                <div className="px-6 text-center mt-2 font-light text-sm">
                    <p>
                    Front end Developer, avid reader. Love to take a long walk, swim
                    </p>
                </div>
                <hr className="mt-8" />
                <div className="flex p-4">
                    <div className="w-1/2 text-center">
                    <Button color="green" className="bg-red-500" onClick={()=>setShow(false)}>Back</Button>
                    </div>
                    <div className="w-0 border border-gray-300">
                    </div>
                    <div className="w-1/2 text-center" onClick={()=> handleSubmitForm()}>
                    <Button color="green">Start</Button>
                    </div>
                </div>
                </div>
            </div>
            </div>
    )
}

export default VideocallModal