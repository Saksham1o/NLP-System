import React, { useEffect } from "react";
import { FiPlus, FiMessageSquare, FiTrash2 } from "react-icons/fi";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // 👈 for navigation
import Header from "../Components/Header";
import InputBox from "../Components/InputBox";
import OutputBox from "../Components/OutputBox";

const Sidebar = ({ chats, onNewChat, onSelectChat, onDeleteChat }) => {
  return (
    <div className="mt-16 h-[calc(100vh-0.1rem)] overflow-hidden flex flex-col">
      <div className="p-2 flex flex-col h-full">
        <button
          onClick={onNewChat}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 transition rounded-lg py-2 px-2 mb-4 w-full"
        >
          <FiPlus className="text-lg" />
          <span className="opacity-0 group-hover:opacity-100 transition-all">
            New Chat
          </span>
        </button>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {chats.length > 0 ? (
            chats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center justify-between cursor-pointer p-2 mb-2 rounded-md hover:bg-gray-700 transition group/item"
              >
                <div
                  className="flex items-center gap-2 flex-1"
                  onClick={() => onSelectChat(chat.id)}
                >
                  <FiMessageSquare className="text-lg" />
                  <span className="opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap overflow-hidden text-ellipsis">
                    {chat.title || `Chat ${chat.id}`}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                  className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-all ml-2"
                  title="Delete Chat"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-all">
              No chats yet
            </p>
          )}
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-auto p-4 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all">
        <a
          href="https://www.instagram.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          <FaInstagram className="text-xl" />
        </a>
        <a
          href="https://www.linkedin.com/in/your-username"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          <FaLinkedin className="text-xl" />
        </a>
        <a
          href="https://www.github.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          <FaGithub className="text-xl" />
        </a>
      </div>
    </div>
  );
};

function Home({
  activeChat,
  messages,
  setMessages,
  handleUserInput,
  handleOptionSelect,
  chats,
  setChats,
  setActiveChat,
}) {
  const navigate = useNavigate();

  // 🔹 Check if user is logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/signin"); // redirect to signin if no user
    }
  }, [navigate]);

  const handleNewChat = () => {
    const newChat = { id: Date.now(), title: "New Chat", messages: [] };
    setChats([newChat, ...chats]);
    setActiveChat(newChat.id);
    setMessages([]);
  };

  const handleSelectChat = (id) => {
    setActiveChat(id);
    const chat = chats.find((c) => c.id === id);
    setMessages(chat?.messages || []);
  };

  const handleDeleteChat = (id) => {
    setChats((prev) => prev.filter((chat) => chat.id !== id));
    if (activeChat === id) {
      setActiveChat(null);
      setMessages([]);
    }
  };

  useEffect(() => {
    if (activeChat) {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChat ? { ...chat, messages } : chat
        )
      );
    }
  }, [messages]);

  // 🔹 Show user info from localStorage
  // const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex h-screen text-white relative">
      {/* Sidebar */}
      <div
        className="fixed top-0 left-0 h-[calc(100vh-0.1rem)]
        bg-[#111827] text-white border-r border-gray-700
        transition-all duration-300
        w-12 hover:w-64 flex flex-col relative group
        rounded-tr-lg rounded-br-lg"
      >
        <Sidebar
          chats={chats}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
        />
      </div>

      <div className="flex flex-col flex-1">
        <Header />

    

        <div className="flex-1 overflow-y-auto p-4 relative">
          <OutputBox messages={messages} onOptionSelect={handleOptionSelect} />
        </div>
        <div className="p-3 bg-gray-900">
          <InputBox onSend={handleUserInput} />
          <p className="text-center text-xs text-gray-400 mt-2">
            AutoFlow AI is still in development and may make mistakes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;