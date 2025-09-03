import { Link,useNavigate } from "react-router-dom";
import {useState} from 'react'
import apiRequest from "../../lib/apiRequest";
function Card({ item }) {
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const handleSavePost = async () => {//later modified
    try {
      const res = await apiRequest.post("/users/save",{postId:item.id});
      setSaved((prev) => !prev);
    } catch (err) {
      console.error("Failed to save post:", err);
    }
  };

  const handleOpenChat = async () => {//changed by me later
    try {
      const res = await apiRequest.get("/chats");
      const existingChat = res.data.find((chat) =>
        chat.userIDs.includes(item.userId) 
      );

      if (existingChat) {
        navigate("/profile", { state: { chat: existingChat } });
      } else {
        
        const newChat = await apiRequest.post("/chats", {
          receiverId: item.userId,
        });
        navigate("/profile", { state: { chat: newChat.data } });
      }
    } catch (err) {
      console.error("Failed to open chat:", err);
    }
  };

  return (
    <div className="flex gap-5 max-[738px]:flex-col">
  {/* Image container - hidden on md and below */}
  <Link to={`/${item.id}`} className="flex-2 h-[200px] max-[1024px]:hidden">
    <img
      src={item.images[0]}
      alt=""
      className="w-full h-full object-cover rounded-[10px]"
    />
  </Link>

  {/* Text container */}
  <div className="flex-3 flex flex-col justify-between gap-2.5">
    <h2 className="text-lg font-semibold text-gray-700 hover:text-black hover:scale-[1.01] transition-all duration-300 ease-in-out">
      <Link to={`/${item.id}`}>{item.title}</Link>
    </h2>

    <p className="text-sm flex items-center gap-1 text-gray-500">
      <img src="/pin.png" alt="" className="w-4 h-4" />
      <span>{item.address}</span>
    </p>

    <p className="text-lg font-light px-2 py-1 rounded bg-yellow-200 bg-opacity-60 w-max">
      $ {item.price}
    </p>

    <div className="flex justify-between gap-2.5 max-[738px]:flex-col max-[738px]:gap-4">
      {/* Features */}
      <div className="flex gap-5 text-sm max-[738px]:justify-between">
        <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
          <img src="/bed.png" alt="" className="w-6 h-4" />
          <span>{item.bedroom} bedroom</span>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
          <img src="/bath.png" alt="" className="w-6 h-4" />
          <span>{item.bathroom} bathroom</span>
        </div>
      </div>

      {/* Icons */}
      <div className="flex gap-5">
        <div
          className="border border-gray-400 px-1.5 py-0.5 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300"
          onClick={handleSavePost}
        >
          <img src={saved ? "/saved.png" : "/save.png"} alt="" className="w-4 h-4"/>
        </div>
        <div
          className="border border-gray-400 px-1.5 py-0.5 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300"
          onClick={handleOpenChat}
        >
          <img src="/chat.png" alt="" className="w-4 h-4"/>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default Card;
