import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className="flex h-full">
  <div className="flex-[3]">
    <div className="flex flex-col justify-center gap-[50px] h-full pr-[100px] lg:pr-[50px] md:p-0 sm:justify-start">
      <h1 className="text-[64px] lg:text-[48px] font-bold">
        Find Real Estate & Get Your Dream Place
      </h1>
      <p className="text-base text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
        explicabo suscipit cum eius, iure est nulla animi consequatur
        facilis id pariatur fugit quos laudantium temporibus dolor ea
        repellat provident impedit!
      </p>

      <SearchBar />

      <div className="flex justify-between sm:hidden">
        <div className="text-center">
          <h1 className="text-[36px] lg:text-[32px] font-bold">16+</h1>
          <h2 className="text-[20px] font-light">Years of Experience</h2>
        </div>
        <div className="text-center">
          <h1 className="text-[36px] lg:text-[32px] font-bold">200</h1>
          <h2 className="text-[20px] font-light">Award Gained</h2>
        </div>
        <div className="text-center">
          <h1 className="text-[36px] lg:text-[32px] font-bold">2000+</h1>
          <h2 className="text-[20px] font-light">Property Ready</h2>
        </div>
      </div>
    </div>
  </div>

  <div className="flex-[2] bg-[#fcf5f3] relative items-center hidden md:flex">
    <img
      src="/bg.png"
      alt=""
      className="w-[115%] lg:w-[105%] absolute right-0"
    />
  </div>
</div>
  );
}

export default HomePage;
