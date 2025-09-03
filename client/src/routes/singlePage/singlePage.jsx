import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="singlePage flex h-full flex-col md:flex-row md:overflow-scroll">
    <div className="details flex-3 h-full overflow-y-scroll md:flex-none md:h-max md:mb-12">
      <div className="wrapper pr-12 lg:pr-5 md:pr-0">
        <Slider images={post.images} />
        <div className="info mt-12">
          <div className="top flex justify-between sm:flex-col sm:gap-5">
            <div className="post flex flex-col gap-5">
              <h1 className="font-normal">{post.title}</h1>
              <div className="address flex gap-1 items-center text-gray-500 text-sm">
                <img src="/pin.png" alt="" className="w-4 h-4" />
                <span>{post.address}</span>
              </div>
              <div className="price p-2 rounded-lg bg-yellow-100 text-lg font-light">
                $ {post.price}
              </div>
            </div>
            <div className="user flex flex-col items-center justify-center gap-5 p-12 bg-yellow-100 rounded-lg font-semibold sm:p-5">
              <img
                src={post.user.avatar}
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />
              <span>{post.user.username}</span>
            </div>
          </div>
          <div
            className="bottom mt-12 text-gray-600 leading-6"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.postDetail.desc),
            }}
          ></div>
        </div>
      </div>
    </div>
    <div className="features flex-2 bg-[#fcf5f3] h-full overflow-y-scroll md:flex-none md:h-max md:mb-12">
      <div className="wrapper px-5 sm:px-10 flex flex-col gap-5">
        <p className="title font-bold text-lg mb-2">General</p>
        <div className="listVertical flex flex-col gap-5 p-5 bg-white rounded-lg">
          <div className="feature flex items-center gap-2">
            <img src="/utility.png" alt="" className="w-6 h-6 bg-yellow-100 p-1 rounded-md" />
            <div className="featureText">
              <span className="font-bold">Utilities</span>
              {post.postDetail.utilities === "owner" ? (
                <p>Owner is responsible</p>
              ) : (
                <p>Tenant is responsible</p>
              )}
            </div>
          </div>
          <div className="feature flex items-center gap-2">
            <img src="/pet.png" alt="" className="w-6 h-6 bg-yellow-100 p-1 rounded-md" />
            <div className="featureText">
              <span className="font-bold">Pet Policy</span>
              {post.postDetail.pet === "allowed" ? (
                <p>Pets Allowed</p>
              ) : (
                <p>Pets not Allowed</p>
              )}
            </div>
          </div>
          <div className="feature flex items-center gap-2">
            <img src="/fee.png" alt="" className="w-6 h-6 bg-yellow-100 p-1 rounded-md" />
            <div className="featureText">
              <span className="font-bold">Income Policy</span>
              <p>{post.postDetail.income}</p>
            </div>
          </div>
        </div>
        <p className="title font-bold text-lg mb-2">Sizes</p>
        <div className="sizes flex justify-between">
          <div className="size flex items-center gap-2 bg-white p-2 rounded-md">
            <img src="/size.png" alt="" className="w-6 h-6" />
            <span>{post.postDetail.size} sqft</span>
          </div>
          <div className="size flex items-center gap-2 bg-white p-2 rounded-md">
            <img src="/bed.png" alt="" className="w-6 h-6" />
            <span>{post.bedroom} beds</span>
          </div>
          <div className="size flex items-center gap-2 bg-white p-2 rounded-md">
            <img src="/bath.png" alt="" className="w-6 h-6" />
            <span>{post.bathroom} bathroom</span>
          </div>
        </div>
        <p className="title font-bold text-lg mb-2">Nearby Places</p>
        <div className="listHorizontal flex justify-between p-5 bg-white rounded-lg">
          <div className="feature flex items-center gap-2">
            <img src="/school.png" alt="" className="w-6 h-6" />
            <div className="featureText">
              <span className="font-bold">School</span>
              <p>
                {post.postDetail.school > 999
                  ? post.postDetail.school / 1000 + "km"
                  : post.postDetail.school + "m"}{" "}
                away
              </p>
            </div>
          </div>
          <div className="feature flex items-center gap-2">
            <img src="/bus.png" alt="" className="w-6 h-6" />
            <div className="featureText">
              <span className="font-bold">Bus Stop</span>
              <p>{post.postDetail.bus}m away</p>
            </div>
          </div>
          <div className="feature flex items-center gap-2">
            <img src="/restaurant.png" alt="" className="w-6 h-6" />
            <div className="featureText">
              <span className="font-bold">Restaurant</span>
              <p>{post.postDetail.restaurant}m away</p>
            </div>
          </div>
        </div>
        <p className="title font-bold text-lg mb-2">Location</p>
        <div className="mapContainer w-full h-48">
          <Map items={[post]} />
        </div>
        <div className="buttons flex justify-between">
          <button className="p-5 flex items-center gap-2 bg-white border border-yellow-400 rounded-md cursor-pointer">
            <img src="/chat.png" alt="" className="w-4 h-4" />
            Send a Message
          </button>
          <button
            onClick={handleSave}
            className="p-5 flex items-center gap-2 bg-white border border-yellow-400 rounded-md cursor-pointer"
            style={{
              backgroundColor: saved ? "#fece51" : "white",
            }}
          >
            <img src="/save.png" alt="" className="w-4 h-4" />
            {saved ? "Place Saved" : "Save the Place"}
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default SinglePage;
