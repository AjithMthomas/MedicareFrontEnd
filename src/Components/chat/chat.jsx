import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatComponent = ({ userId, doctorId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch chat messages from the backend API
    const fetchChatMessages = async () => {
      try {
        const response = await axios.get(`/api/chat/rooms/${userId}/${doctorId}/messages/`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    };

    fetchChatMessages();
  }, [userId, doctorId]);

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-800 text-white p-4">
        <h1 className="text-lg font-bold">Chat</h1>
      </div>
      <div className="flex-1 bg-gray-200 p-4 overflow-y-scroll">
        {messages.map((message) => (
          <div key={message.id} className="flex flex-col mb-4">
            <div className={`rounded-lg p-2 ${message.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-white text-gray-800 self-start'}`}>
              <p>{message.text}</p>
            </div>
            <p className={`text-xs ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>{message.sender}</p>
          </div>
        ))}
      </div>
      {/* Add input field and send button for sending new messages */}
    </div>
  );
};

export default ChatComponent;
