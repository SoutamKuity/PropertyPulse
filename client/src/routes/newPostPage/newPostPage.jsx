import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      navigate("/"+res.data.id)
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  return (
<div className="flex h-full">
  <div className="flex-3 overflow-scroll">
    <div className="mx-[50px] my-[30px] mb-[100px]">
      <form onSubmit={handleSubmit} className="flex justify-between flex-wrap gap-[20px]">
        <div className="w-[30%] flex flex-col gap-[5px]">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            className="p-[20px] border border-gray-300 rounded-[5px]"
          />
        </div>
        <div className="w-[30%] flex flex-col gap-[5px]">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            className="p-[20px] border border-gray-300 rounded-[5px]"
          />
        </div>
        <div className="w-[30%] flex flex-col gap-[5px]">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            className="p-[20px] border border-gray-300 rounded-[5px]"
          />
        </div>
        <div className="w-full flex flex-col gap-[5px] mb-8">
          <label htmlFor="desc">Description</label>
          <ReactQuill theme="snow" onChange={setValue} value={value} />
        </div>
        <div className="w-[30%] flex flex-col gap-[5px]">
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            type="text"
            className="p-[20px] border border-gray-300 rounded-[5px]"
          />
        </div>
        <div className="w-[30%] flex flex-col gap-[5px]">
          <label htmlFor="bedroom">Bedroom Number</label>
          <input
            min={1}
            id="bedroom"
            name="bedroom"
            type="number"
            className="p-[20px] border border-gray-300 rounded-[5px]"
          />
        </div>
        <div className="w-[30%] flex flex-col gap-[5px]">
          <label htmlFor="bathroom">Bathroom Number</label>
          <input
            min={1}
            id="bathroom"
            name="bathroom"
            type="number"
            className="p-[20px] border border-gray-300 rounded-[5px]"
          />
        </div>
        <div className="w-[30%] flex flex-col gap-[5px]">
          <label htmlFor="latitude">Latitude</label>
          <input
            id="latitude"
            name="latitude"
            type="text"
            className="p-[20px] border border-gray-300 rounded-[5px]"
          />
        </div>
        <div className="w-[30%] flex flex-col gap-[5px]">
          <label htmlFor="longitude">Longitude</label>
          <input
            id="longitude"
            name="longitude"
            type="text"
            className="p-[20px] border border-gray-300 rounded-[5px]"
          />
        </div>
        <div className="w-[30%] flex flex-col gap-[5px]">
          <label htmlFor="type">Type</label>
          <select name="type" className="p-[19px] border border-gray-300 rounded-[5px]">
            <option value="rent" defaultChecked>
              Rent
            </option>
            <option value="buy">Buy</option>
          </select>
        </div>
        <div className="w-[30%] flex flex-col gap-[5px]">
          <label htmlFor="property">Property</label>
          <select name="property" className="p-[19px] border border-gray-300 rounded-[5px]">
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="w-[30%] flex flex-col gap-[5px]">
          <label htmlFor="utilities">Utilities Policy</label>
          <select name="utilities" className="p-[19px] border border-gray-300 rounded-[5px]">
            <option value="owner">Owner is responsible</option>
            <option value="tenant">Tenant is responsible</option>
            <option value="shared">Shared</option>
          </select>
        </div>
        <div className="w-[30%] flex flex-col gap-[5px]">
          <label htmlFor="pet">Pet Policy</label>
          <select name="pet" className="p-[19px] border border-gray-300 rounded-[5px]">
            <option value="allowed">Allowed</option>
            <option value="not-allowed">Not Allowed</option>
          </select>
        </div>
        <div className="w-[30%] flex flex-col gap-[5px]">
          <label htmlFor="income">Income Policy</label>
          <input
            id="income"
            name="income"
            type="text"
            placeholder="Income Policy"
            className="p-[20px] border border-gray-300 rounded-[5px]"
          />
        </div>
        <div className="w-[30%] flex flex-col gap-[5px]">
          <label htmlFor="size">Total Size (sqft)</label>
          <input
            min={0}
            id="size"
            name="size"
            type="number"
            className="p-[20px] border border-gray-300 rounded-[5px]"
          />
        </div>
        <div className="w-[30%] flex flex-col gap-[5px]">
          <label htmlFor="school">School</label>
          <input
            min={0}
            id="school"
            name="school"
            type="number"
            className="p-[20px] border border-gray-300 rounded-[5px]"
          />
        </div>
        <div className="w-[30%] flex flex-col gap-[5px]">
          <label htmlFor="bus">Bus</label>
          <input
            min={0}
            id="bus"
            name="bus"
            type="number"
            className="p-[20px] border border-gray-300 rounded-[5px]"
          />
        </div>
        <div className="w-[30%] flex flex-col gap-[5px]">
          <label htmlFor="restaurant">Restaurant</label>
          <input
            min={0}
            id="restaurant"
            name="restaurant"
            type="number"
            className="p-[20px] border border-gray-300 rounded-[5px]"
          />
        </div>
        <button
          type="submit"
          className="w-[30%] rounded-[5px] border-none bg-teal-500 text-white font-bold cursor-pointer"
        >
          Add
        </button>
        {error && <span className="text-red-500">error</span>}
      </form>
    </div>
  </div>
  <div className="flex-2 bg-[#fcf5f3] flex flex-col gap-[20px] items-center justify-center">
    {images.map((image, index) => (
      <img
        key={index}
        src={image}
        alt=""
        className="w-[50%] h-[180px] object-cover rounded-[5px]"
      />
    ))}
    <UploadWidget
      uwConfig={{
        multiple: true,
        cloudName: "dhekhbihn",
        uploadPreset: "estate",
        folder: "posts",
      }}
      setState={setImages}
    />
  </div>
</div>
  );
}

export default NewPostPage;
