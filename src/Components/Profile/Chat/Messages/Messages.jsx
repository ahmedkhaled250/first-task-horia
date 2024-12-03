import React, { useState } from "react";
import { useChatContext } from "../../../../Context/ChatContext";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
// import { useNavigate, useParams } from "react-router-dom";

const Message = () => {
  const { selectedFriend, messagesData, friendsData } = useChatContext();
  const [newMessage, setNewMessage] = useState("");
  const { friendId } = useParams();

  const friend =
    selectedFriend || friendsData.find((obj) => obj.id == friendId);

  if (!friend) {
    return (
      <div className="hidden text-center text-xl size-full lg:flex items-center justify-center">
        Select a friend to chat with
      </div>
    );
  }
  const messages = messagesData[friend.id] || [];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add new message (In a real app, send it to the server)
      messages.push({
        sender: "me",
        content: newMessage,
        date: new Date().toISOString(),
        senderImage: "https://randomuser.me/api/portraits/men/4.jpg",
      });
      setNewMessage("");
    }
  };

  return (
    <div
      className={` ${
        !friendId ? "hidden lg:flex" : "flex"
      } flex-col h-full border-2 py-4 rounded-md overflow-y-auto`}
    >
      <div className="flex items-center justify-between px-4 pb-4  border-b-2">
        <div className="flex items-center gap-4">
          <Link to="/profile/chat" className="">
            <FaArrowLeft />
          </Link>
          <img
            src={friend.image}
            alt={friend.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-xl font-semibold">{friend.name}</p>
            <p className="text-sm text-gray-500">
              Last active: {friend.lastMessageDate}
            </p>
          </div>
        </div>
        <div className="bg-product p-2">
          <BsThreeDots />
        </div>
      </div>

      {/* Messages Section (Scrollable) */}
      <div className="flex-1 overflow-y-auto space-y-4 p-2 max-h-80 px-4 scrollbar-thin scrollbar-webkit">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div className={`flex flex-col justify-center gap-2`}>
              {msg.sender === "me" ? (
                ""
              ) : (
                <div className="flex items-center gap-2">
                  <img
                    src={msg.senderImage}
                    alt={msg.sender}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <p className="font-medium">{friend.name}</p>
                </div>
              )}

              <div
                className={`py-2 px-4 rounded-lg ${
                  msg.sender === "me" ? "bg-main text-white" : "bg-profileColor"
                }`}
              >
                <p>{msg.content}</p>
                <span
                  className={`text-xs ${
                    msg.sender === "me"
                      ? "text-right block text-white"
                      : "text-profileColorText"
                  }`}
                >
                  {new Date(msg.date).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input Section */}
      <div className="flex items-center gap-2 p-4 pb-0 border-t">
        <label
          htmlFor="message"
          className="  w-full flex items-center gap-3 border px-2"
        >
          <PiPencilSimpleLineLight className="text-main text-2xl" />

          <input
            type="text"
            className="w-full py-2 outline-none"
            value={newMessage}
            id="message"
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
        </label>
        <button
          onClick={handleSendMessage}
          className=" px-4 py-2 bg-main flex items-center gap-1 text-white "
        >
          Send <IoIosSend />
        </button>
      </div>
    </div>
  );
};

export default Message;
