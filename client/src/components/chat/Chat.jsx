import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const messageEndRef = useRef();

  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  return (
    <div className="h-full flex flex-col">
    <div className="flex-1 flex flex-col gap-5 overflow-y-scroll">
      <h1 className="font-light">Messages</h1>
      {chats?.map((c) => (
        <div
          key={c.id}
          className={`bg-white p-5 rounded-[10px] flex items-center gap-5 cursor-pointer ${
            c.seenBy.includes(currentUser.id) || chat?.id === c.id
              ? "bg-white"
              : "bg-yellow-200" // Custom color for unseen messages (using Tailwind's yellow-200)
          }`}
          onClick={() => handleOpenChat(c.id, c.receiver)}
        >
          <img
            src={c.receiver.avatar || "/noavatar.jpg"}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-bold">{c.receiver.username}</span>
          <p>{c.lastMessage}</p>
        </div>
      ))}
    </div>
  
    {chat && (
      <div className="flex-1 bg-white flex flex-col justify-between">
        <div className="bg-yellow-100 p-5 font-bold flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              src={chat.receiver.avatar || "noavatar.jpg"}
              alt=""
              className="w-[30px] h-[30px] rounded-full object-cover"
            />
            {chat.receiver.username}
          </div>
          <span
            className="cursor-pointer"
            onClick={() => setChat(null)}
          >
            X
          </span>
        </div>
  
        <div className="h-[350px] overflow-y-scroll p-5 flex flex-col gap-5">
          {chat.messages.map((message) => (
            <div
              key={message.id}
              className={`w-1/2 ${
                message.userId === currentUser.id
                  ? "self-end text-right"
                  : "self-start text-left"
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs bg-yellow-100 p-0.5 rounded">
                {format(message.createdAt)}
              </span>
            </div>
          ))}
          <div ref={messageEndRef}></div>
        </div>
  
        <form onSubmit={handleSubmit} className="border-t-2 border-yellow-100 h-[60px] flex items-center justify-between">
          <textarea
            name="text"
            className="flex-[3] h-full border-none p-5 resize-none outline-none"
          ></textarea>
          <button
            type="submit"
            className="flex-[1] bg-yellow-100 h-full border-none cursor-pointer"
          >
            Send
          </button>
        </form>
      </div>
    )}
  </div>
  );
}

export default Chat;
