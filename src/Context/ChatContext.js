import React, { createContext, useState, useContext } from 'react';

// Fake Data (more friends and messages)
const friendsData = [
    {
        id: 1,
        name: 'John Doe',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        lastMessage: 'Hey, how are you?',
        lastMessageDate: '2024-11-28',
        isActive: true,
    },
    {
        id: 2,
        name: 'Jane Smith',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        lastMessage: 'Let\'s catch up soon!',
        lastMessageDate: '2024-11-27',
        isActive: false

    },
    {
        id: 3,
        name: 'Mike Johnson',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
        lastMessage: 'How\'s the project going?',
        lastMessageDate: '2024-11-25',
        isActive: true

    },
    {
        id: 4,
        name: 'Emily Clark',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        lastMessage: 'We should plan a trip!',
        lastMessageDate: '2024-11-24',
        isActive: true

    },
    {
        id: 5,
        name: 'Chris Brown',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        lastMessage: 'Let\'s meet up this weekend!',
        lastMessageDate: '2024-11-23',
        isActive: false

    },
    // More friends...
];

const messagesData = {
    1: [
        { sender: 'me', content: 'Hey, John!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'Hey, how are you?', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
    ],
    2: [
        { sender: 'me', content: 'Hey, John!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'Hey, how are you?', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
    ],
    3: [
        { sender: 'me', content: 'Hey, John!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'Hey, how are you?', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
    ],
    4: [
        { sender: 'me', content: 'Hey, John!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'Hey, how are you?', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { sender: 'me', content: 'I\'m doing great!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { sender: 'John', content: 'That\'s awesome to hear!', date: '2024-11-28', senderImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
    ],
    // Add more messages for each friend...
};

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFriends = friendsData.filter(friend =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ChatContext.Provider value={{ friendsData, messagesData, selectedFriend, setSelectedFriend, searchQuery, setSearchQuery, filteredFriends }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => useContext(ChatContext);
