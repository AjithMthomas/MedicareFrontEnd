import React from 'react';

const ChatSidebar = ({ rooms, activeRoomId, setActiveRoomId }) => {
  return (
    <div className="flex flex-col bg-gray-200 h-screen w-1/4">
      <h2 className="text-xl font-bold p-4 bg-gray-900 text-white">Communities</h2>
      <ul className="flex-grow overflow-y-auto">
        {rooms.map((room) => (
          <li
            key={room.id}
            className={`flex items-center py-3 px-4 cursor-pointer ${
              room.id === activeRoomId ? 'bg-gray-300' : 'hover:bg-gray-300'
            }`}
            onClick={() => setActiveRoomId(room.id)}
          >
            <div className="flex-shrink-0 mr-3  mt-1">
              <img
                // src={room.avatar}
                src='https://media.istockphoto.com/id/1368965646/photo/multi-ethnic-guys-and-girls-taking-selfie-outdoors-with-backlight-happy-life-style-friendship.jpg?s=612x612&w=0&k=20&c=qYST1TAGoQGV_QnB_vMd4E8jdaQUUo95Sa2JaKSl_-4='
                alt="Room Avatar"
                className="rounded-full w-11 h-11"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-start ms-3 text-lg font-semibold">{room.name}</h3>
              <p className="text-gray-500 truncate">{room.lastMessage}</p>
            </div>
            {room.unreadCount > 0 && (
              <div className="bg-green-500 rounded-full w-4 h-4 flex items-center justify-center">
                <span className="text-white text-xs">{room.unreadCount}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
