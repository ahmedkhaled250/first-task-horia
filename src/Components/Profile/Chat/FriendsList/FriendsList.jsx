import React from "react";
import { useChatContext } from "../../../../Context/ChatContext";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const FriendsList = () => {
  const { filteredFriends, setSelectedFriend, searchQuery, setSearchQuery } =
    useChatContext();

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
  };

  return (
    <div className="flex flex-col rounded-md border-2 h-full overflow-y-auto">
      <h2 className="text-lg font-bold mt-4 text-center">Message</h2>
      <div className="px-4">
        <input
          type="text"
          className="w-full p-2 my-4 rounded-lg border-2  focus:border-main outline-none"
          placeholder="Search for a friend..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-y-auto space-y-1 p-2 px-4 scrollbar-thin scrollbar-webkit">
        {filteredFriends.map((friend) => (
          <Link
            to={`/profile/chat/messages/${friend.id}`}
            key={friend.id}
            className="flex items-center p-2 hover:bg-profileColor cursor-pointer px-6"
            onClick={() => handleSelectFriend(friend)}
          >
            <img
              src={friend.image}
              alt={friend.name}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="w-full">
              <div className="flex items-center justify-between">
                <p className="font-semibold">
                  {" "}
                  {friend.name.length > 15
                    ? `${friend.name.slice(0, 15)}....`
                    : friend.name}
                </p>
                <span className=" text-sm text-gray-400">
                  {friend.lastMessageDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {friend.lastMessage.length > 20
                    ? `${friend.lastMessage.slice(0, 20)}....`
                    : friend.lastMessage}
                </p>
                <div
                  className={`size-2 ${
                    friend.isActive ? "bg-main" : ""
                  }  rounded-full`}
                ></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
