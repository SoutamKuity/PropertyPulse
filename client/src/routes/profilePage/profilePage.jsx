import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { Suspense, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();
  const location = useLocation(); 
  const [selectedChat, setSelectedChat] = useState(null);
  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.chat) {
      setSelectedChat(location.state.chat);
    }
  }, [location.state]);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="profilePage flex h-full max-[1024px]:flex-col max-[1024px]:overflow-scroll">
  <div className="details flex-[3] overflow-y-scroll pb-12 max-[1024px]:flex-none max-[1024px]:h-max">
    <div className="wrapper pr-12 flex flex-col gap-12">
      <div className="title flex items-center justify-between">
        <h1 className="font-light">User Information</h1>
        <Link to="/profile/update">
          <button className="px-6 py-3 bg-yellow-400 cursor-pointer border-none">Update Profile</button>
        </Link>
      </div>

      <div className="info flex flex-col gap-5">
        <span className="flex items-center gap-5">
          Avatar:
          <img
            src={currentUser.avatar || "noavatar.jpg"}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
        </span>
        <span>
          Username: <b>{currentUser.username}</b>
        </span>
        <span>
          E-mail: <b>{currentUser.email}</b>
        </span>
        <button
          onClick={handleLogout}
          className="w-24 bg-teal-500 text-white py-2 px-5 cursor-pointer rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* My List */}
      <div className="title flex items-center justify-between">
        <h1 className="font-light">My List</h1>
        <Link to="/add">
          <button className="px-6 py-3 bg-yellow-400 cursor-pointer border-none">Create New Post</button>
        </Link>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
          {(postResponse) => <List posts={postResponse.data.userPosts} />}
        </Await>
      </Suspense>

      {/* Saved List */}
      <div className="title flex items-center justify-between">
        <h1 className="font-light">Saved List</h1>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
          {(postResponse) => <List posts={postResponse.data.savedPosts} />}
        </Await>
      </Suspense>
    </div>
  </div>

  {/* Chat Panel */}
  <div className="chatContainer flex-[2] bg-[#fcf5f3] h-full max-[1024px]:flex-none max-[1024px]:h-max">
    <div className="wrapper px-5 h-full">
      {selectedChat ? (
        <Chat chats={[selectedChat]} />
      ) : (
        <Suspense fallback={<p>Loading...</p>}>
          <Await resolve={data.chatResponse} errorElement={<p>Error loading chats!"</p>}>
            {(chatResponse) => <Chat chats={chatResponse.data} />}
          </Await>
        </Suspense>
      )}
    </div>
  </div>
</div>  
  );
}

export default ProfilePage;
