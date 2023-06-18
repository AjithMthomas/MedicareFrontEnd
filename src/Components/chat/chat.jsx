import React, { useState, useEffect, useRef } from 'react';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../Contexts/auth';
import axios from 'axios';
import ChatSidebar from './chatSideBar';
import { Avatar } from "@material-tailwind/react";

const ChatComponent = () => {
  const [author, setAuthor] = useState('');
  const [rooms, setRooms] = useState([]);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const scroll = useRef()


  const socketRef = useRef(null);
  
 

  useEffect(() => {
    const localResponse = getLocal('authToken');
    const decodedToken = jwtDecode(localResponse);
    setAuthor(decodedToken.user_id);

    axios
      .get('rooms/')
      .then((response) => {
        setRooms(response.data);
        setActiveRoomId(response.data[0]?.id);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);



  useEffect(() => {
    if (activeRoomId) {

      socketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${activeRoomId}/`);

      socketRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      axios
        .get(`rooms/${activeRoomId}/messages/`)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [activeRoomId]);



  const sendMessage = () => {
    const message = {
      content: newMessage,
      author: author,
      room_id: activeRoomId,
    };

    axios
      .post(`rooms/${activeRoomId}/messages/`, message)
      .then((response) => {
        const newMessage = response.data;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    if (socketRef.current) {
      socketRef.current.send(JSON.stringify(message));
    }
   
    setNewMessage('');
  };


  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:'smooth'})
  },[messages])


  return (
    <div className="flex h-screen m-5 rounded-md" >
      <ChatSidebar
        rooms={rooms}
        activeRoomId={activeRoomId}
        setActiveRoomId={setActiveRoomId}
      />
      <div className="flex-grow">
        {/* Chat component */}
        <div className="flex flex-col h-screen">
          <div className="py-4 px-6 bg-gray-900 text-white">
            <h2 className="text-xl font-bold">Chat with Doctor</h2>
          </div>
          <div className="flex-grow p-6 overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  ref={scroll}
                  className={`flex ${
                    message.author === author ? 'justify-end' : 'justify-start'
                  } mb-2`}
                >
                  <div
                    className={`${
                      message.author === author
                        ? 'bg-green-500 text-white self-end'
                        : 'bg-blue-500 text-white self-start'
                    } py-2 px-4 rounded-lg max-w-md`}
                  >
                   {message.author === author ? (
                  <>
                    {message.content}
                    <Avatar src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt="avatar" size="xs" className='ms-3'/>
                    
                  </>
                ) : (
                  <>
                    <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU" alt="avatar" size="xs" className='me-3' />
                    {message.content}
                  </>
                )}
                </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No messages yet</div>
            )}
          </div>
          <div className="py-4 px-6 bg-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex space-x-2 "
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg "
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
