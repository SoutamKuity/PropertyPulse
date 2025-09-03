import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar:avatar[0]
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="profileUpdatePage h-full flex">
    <div className="formContainer flex-3 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold">Update Profile</h1>
        <div className="item flex flex-col gap-1">
          <label htmlFor="username" className="text-sm">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            defaultValue={currentUser.username}
            className="p-5 rounded-lg border border-gray-300"
          />
        </div>
        <div className="item flex flex-col gap-1">
          <label htmlFor="email" className="text-sm">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={currentUser.email}
            className="p-5 rounded-lg border border-gray-300"
          />
        </div>
        <div className="item flex flex-col gap-1">
          <label htmlFor="password" className="text-sm">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="p-5 rounded-lg border border-gray-300"
          />
        </div>
        <button className="p-5 rounded-lg border-none bg-teal-500 text-white font-bold cursor-pointer">
          Update
        </button>
        {error && <span className="text-red-500">Error</span>}
      </form>
    </div>
  
    <div className="sideContainer flex-2 bg-[#fcf5f3] flex flex-col gap-5 items-center justify-center">
      <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar w-1/2 object-cover" />
      <UploadWidget
        uwConfig={{
          cloudName: "dbtabfdhj",
          uploadPreset: "picture",
          multiple: false,
          maxImageFileSize: 2000000,
          folder: "avatars",
        }}
        setState={setAvatar}
      />
    </div>
  </div>  
  );
}

export default ProfileUpdatePage;
