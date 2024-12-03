import React, { useState } from "react";
import FriendsList from "./FriendsList/FriendsList";
import Message from "./Messages/Messages";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { friendId } = useParams();
 console.log(friendId);
 
  return (
    <div className="flex flex-col text-black gap-5 lg:flex-row w-full max-h-[80vh] overflow-hidden">
      {/* Left side: Friends List */}
      <div
        className={`lg:w-1/3 w-full ${friendId ? "hidden lg:block" : "block"}`}
      >
        <FriendsList />
      </div>

      {/* Right side: Chat View */}
      <div className="lg:w-2/3 w-full">
        <Message />
      </div>
    </div>
  );
};

export default Chat;
