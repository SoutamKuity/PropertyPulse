import { useState } from "react";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
  {/* <div className="type flex">
    {types.map((type, index) => (
      <button
        key={type}
        onClick={() => switchType(type)}
        className={`
          px-9 py-4 border border-[#999] border-b-0 bg-white capitalize cursor-pointer 
          ${query.type === type ? 'bg-black text-white' : ''} 
          ${index === 0 ? 'rounded-tl-[5px] border-r-0' : ''}
          ${index === types.length - 1 ? 'rounded-tr-[5px] border-l-0' : ''}
        `}
      >
        {type}
      </button>
    ))}
  </div> */}
    <div className="type flex border border-[#999] w-max">
  {types.map((type, index) => (
    <button
      key={type}
      onClick={() => switchType(type)}
      className={`
        px-9 py-4 capitalize cursor-pointer 
        ${query.type === type 
          ? 'bg-black text-white' 
          : 'bg-white text-black'}
        ${index === 0 ? 'rounded-tl-[5px]' : ''}
        ${index === types.length - 1 ? 'rounded-tr-[5px]' : ''}
        ${index === 0 ? 'border-r border-[#999]' : 'border-l border-[#999]'}
      `}
    >
      {type}
    </button>
  ))}
</div>
  <form
    className="flex justify-between h-16 gap-[5px] border border-[#999]  max-sm:flex-col max-sm:border-none">
    <input
      type="text"
      name="city"
      placeholder="City"
      onChange={handleChange}
      className="border-none px-[10px] w-[200px] 
                max-lg:px-[5px] max-lg:nth-child-2:w-[140px] max-lg:nth-child-3:w-[140px]
                max-md:w-[200px] max-md:nth-child-2:w-[200px] max-md:nth-child-3:w-[200px]
                max-sm:w-auto max-sm:px-[20px] max-sm:py-[20px] max-sm:border max-sm:border-[#999]"
    />
    <input
      type="number"
      name="minPrice"
      min={0}
      max={10000000}
      placeholder="Min Price"
      onChange={handleChange}
      className="border-none px-[10px] w-[200px] 
                max-lg:px-[5px] max-lg:w-[140px]
                max-md:w-[200px]
                max-sm:w-auto max-sm:px-[20px] max-sm:py-[20px] max-sm:border max-sm:border-[#999]"
    />
    <input
      type="number"
      name="maxPrice"
      min={0}
      max={10000000}
      placeholder="Max Price"
      onChange={handleChange}
      className="border-none px-[10px] w-[200px] 
                max-lg:px-[5px] max-lg:w-[140px]
                max-md:w-[200px]
                max-sm:w-auto max-sm:px-[20px] max-sm:py-[20px] max-sm:border max-sm:border-[#999]"
    />
    <Link
      to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
      className="flex-1 bg-[#fece51] flex items-center justify-center"
    >
      <button className="border-none cursor-pointer bg-[#fece51] max-sm:p-[10px]">
        <img src="/search.png" alt="" className="w-6 h-6" />
      </button>
    </Link>
  </form>
</div>
  );
}

export default SearchBar;
