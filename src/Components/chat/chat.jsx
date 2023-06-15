import React, { useState, useEffect, useRef } from 'react';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../Contexts/auth';
import axios from 'axios';

const ChatComponent = () => {
  const [author, setAuthor] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const room_id = 1; // Replace with the appropriate room identifier

  const socketRef = useRef(null);

  useEffect(() => {
    const localResponse = getLocal('authToken');
    const decodedToken = jwtDecode(localResponse);
    setAuthor(decodedToken.user_id);

    socketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${room_id}/`);

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    axios
      .get(`/chat/rooms/${room_id}/messages/`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    return () => {
      socketRef.current.close();
    };
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.onopen = () => {
        console.log('WebSocket connection established.');
      };

      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socketRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };
    }
  }, [newMessage]);

  const sendMessage = () => {
    const message = {
      content: newMessage,
      author: author,
      room_id: room_id,
    };

    axios
      .post(`/chat/rooms/${room_id}/messages/`, message)
      .then((response) => {
        const newMessage = response.data;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    socketRef.current.send(JSON.stringify(message));

    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="py-4 px-6 bg-gray-900 text-white">
        <h2 className="text-xl font-bold">Chat with Doctor</h2>
      </div>
      <div className="flex-grow p-6 overflow-y-auto">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
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
                {message.content}
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
          className="flex space-x-2"
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
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;
