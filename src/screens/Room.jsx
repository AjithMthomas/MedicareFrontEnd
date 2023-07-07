import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../Components/SocketContext/SocketProvider'
import ReactPlayer from 'react-player'
import peer from '../Components/Service/peer'
import Footer from '../Components/UserSide/Footer'
import logoImage from '../images/logo.png'



import { IoIosCall } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom'

function Room() {
    const socket = useSocket()
    const [RemoteSocketId,setRemoteSocketId] = useState(null)
    const [Mystream,setMystream] = useState()
    const [RemoteStream,setRemoteStream] = useState()

    const handleUserJoined = useCallback(({Email,id})=>{

        console.log(`Email ${Email} joined room`)
        setRemoteSocketId(id)
        
    },[])

    const handleCallUser = useCallback(async()=>{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true
        })
        const offer = await peer.getOffer()
        socket.emit("user:call",{to:RemoteSocketId,offer})
        setMystream(stream)
    },[RemoteSocketId,socket])


    const handleIncommingCall = useCallback(async({from,offer})=>{
        setRemoteSocketId(from)
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true, 
            video:true
        })
        setMystream(stream)
        
 
        const ans = await peer.getAnswer(offer)
        socket.emit("call:accepted",{to:from,ans})
    },[socket])

    // const sendStreams = useCallback(()=>{
    //     for (const track of Mystream.getTracks()){
    //         peer.peer.addTrack(track,Mystream)
    //     }

    // },[Mystream])
    const sendStreams = useCallback(() => {
        if (Mystream && peer.peer) {
          const senders = peer.peer.getSenders();
      
          for (const track of Mystream.getTracks()) {
            let sender = senders.find((s) => s.track === track);
      
            if (!sender) {
              sender = peer.peer.addTrack(track, Mystream);
            }
          }
        }
      }, [Mystream]);
   

    const handleCallAccepted = useCallback(({from,ans})=>{
        peer.setLocalDescription(ans)
        sendStreams()

    },[sendStreams])
    
    const handleNegoNeeded = useCallback(async ()=>{
        const offer = await peer.getOffer()
        socket.emit("peer:nego:needed",{offer,to:RemoteSocketId})
    },[RemoteSocketId,socket])
     

    useEffect(()=>{
        peer.peer.addEventListener('negotiationneeded',handleNegoNeeded)
        return ()=>{
            peer.peer.removeEventListener('negotiationneeded',handleNegoNeeded)
        }
    },[handleNegoNeeded])

    const handleNegoNeedIncoming = useCallback(async({from,offer})=>{
        const ans = await peer.getAnswer(offer)
        socket.emit("peer:nego:done",{to:from,ans})
    },[socket])

    const handleNegoNeedFinal = useCallback(async({ans})=>{
        await peer.setLocalDescription(ans)
    },[])

    useEffect(()=>{
        peer.peer.addEventListener('track',async ev=>{
            const remoteStream = ev.streams
            // console.log("GOT TRACKS")
            setRemoteStream(remoteStream[0])
        })
    },[])


    useEffect(()=>{
        socket.on("user:joined",handleUserJoined)
        socket.on("incoming:call",handleIncommingCall)
        socket.on("call:accepted",handleCallAccepted)
        socket.on("peer:nego:needed",handleNegoNeedIncoming)
        socket.on("peer:nego:final",handleNegoNeedFinal)
        return ()=>{
            socket.off("user:joined",handleUserJoined)
            socket.off("incoming:call",handleIncommingCall)
            socket.off("call:accepted",handleCallAccepted)
            socket.off("peer:nego:needed",handleNegoNeedIncoming)
            socket.off("peer:nego:final",handleNegoNeedFinal)
        }
    },[socket,handleUserJoined,handleIncommingCall,handleCallAccepted,handleNegoNeedIncoming,handleNegoNeedFinal])

    const navigate = useNavigate()
     // call end handling
     const handleEndCall =()=>{
        peer.peer.close() //close connection
        setMystream(null)
        setRemoteStream(null)
        window.location.reload();
        if(Mystream){
            Mystream.getTracks().forEach(track => {
            track.stop()
            
          });
        }
       
       navigator.mediaDevices.getUserMedia({audio:true,video:false})
       navigate(-1) 
       }

  return (
    <>
    <div className='bg-gray-200 h-28 pt-9'>
        <div className="div flex justify-center">
         <img src={logoImage} alt="Logo" className="mr-2 h-10 w-10" />
         <div className="flex items-center text-lg">MEDIcare</div>
        </div>
    <h1 className='text-center text-black  font-extrabold  font-serif text-2xl uppercase'> Video Room</h1>
    </div>
    <div className='h-full bg-black p-1'>
    
    
    <h4 className='text-center font-semibold text-white text-2xl'>{RemoteSocketId ? 'Connected' : 'No one in room!'}</h4>
    { (Mystream) && <div className='flex justify-center'><button className='bg-blue-600 p-2 mt-3 h-11 w-28 rounded-lg' onClick={sendStreams}>Send Stream</button></div> }
     <div>
     
    
     </div>
    
    <div className=' flex justify-center gap-4  p-7 mt-2 flex-wrap'>
    
        <div className=' h-44 w-60 md:h-[25rem] md:w-[630px] rounded-lg'>
        {Mystream && (
            <>
            <h1 className='text-center text-xl font-medium mb-1 text-white'>Patient</h1>
            <ReactPlayer playing muted className="h-full w-full rounded-lg" url={Mystream}/>
            </>
            )}
        </div>

        <div className=' h-44 md:h-[25rem] w-60 md:w-[630px] rounded-lg'>
        {RemoteStream && (
            <>
            <h1 className='text-center text-xl font-medium mb-1 text-white'>Doctor</h1>
            <ReactPlayer playing muted className="h-full w-full rounded-lg" url={RemoteStream}/>
            </>
            )}
        </div>
       
    </div>
    <div className="h-full w-full flex justify-center"> <div className=''>
    {RemoteStream && <button className='rounded-lg p-2 h-16 w-24 mb-6 bg-red-500' onClick={handleEndCall}><IoIosCall className='h-11 w-20' /></button> }
    {!Mystream && !RemoteStream && RemoteSocketId && <button className='rounded-lg p-2 h-16 w-24 mb-6 bg-green-500' onClick={handleCallUser}><IoIosCall className='h-11 w-20' /></button>}
    </div></div>
   
   
    
     
     </div>
     <Footer/>
     </>
  )
}

export default Room