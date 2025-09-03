import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="flex flex-col gap-2.5">
    <h1 className="font-light text-[24px]">Search results for <b>{searchParams.get("city")}</b></h1>
  
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-xs">Location</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="City Location"
          onChange={handleChange}
          defaultValue={query.city}
          className="w-full p-2.5 border border-[#e0e0e0] rounded-md text-sm"
        />
      </div>
    </div>
  
    <div className="flex flex-wrap justify-between gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="type" className="text-xs">Type</label>
        <select
          name="type"
          id="type"
          onChange={handleChange}
          defaultValue={query.type}
          className="p-2.5 border border-[#e0e0e0] rounded-md text-sm"
        >
          <option value="">any</option>
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </select>
      </div>
  
      <div className="flex flex-col gap-1">
        <label htmlFor="property" className="text-xs">Property</label>
        <select
          name="property"
          id="property"
          onChange={handleChange}
          defaultValue={query.property}
          className="p-2.5 border border-[#e0e0e0] rounded-md text-sm"
        >
          <option value="">any</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="land">Land</option>
        </select>
      </div>
  
      <div className="flex flex-col gap-1">
        <label htmlFor="minPrice" className="text-xs">Min Price</label>
        <input
          type="number"
          id="minPrice"
          name="minPrice"
          placeholder="any"
          onChange={handleChange}
          defaultValue={query.minPrice}
          className="p-2.5 border border-[#e0e0e0] rounded-md text-sm"
        />
      </div>
  
      <div className="flex flex-col gap-1">
        <label htmlFor="maxPrice" className="text-xs">Max Price</label>
        <input
          type="text"
          id="maxPrice"
          name="maxPrice"
          placeholder="any"
          onChange={handleChange}
          defaultValue={query.maxPrice}
          className="p-2.5 border border-[#e0e0e0] rounded-md text-sm"
        />
      </div>
  
      <div className="flex flex-col gap-1">
        <label htmlFor="bedroom" className="text-xs">Bedroom</label>
        <input
          type="text"
          id="bedroom"
          name="bedroom"
          placeholder="any"
          onChange={handleChange}
          defaultValue={query.bedroom}
          className="p-2.5 border border-[#e0e0e0] rounded-md text-sm"
        />
      </div>
  
      <button
        onClick={handleFilter}
        className="w-[100px] p-2.5 bg-[#fecd51] border-none cursor-pointer flex justify-center items-center"
      >
        <img src="/search.png" alt="" className="w-[24px] h-[24px]" />
      </button>
    </div>
  </div>  
  );
}

export default Filter;
