import { useState } from "react";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

  const changeSlide = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };

  return (
    <div className="w-full h-[350px] flex gap-5 max-sm:h-[280px] relative">
  {imageIndex !== null && (
    <div className="fixed inset-0 bg-black z-[9999] flex justify-between items-center">
      <div className="flex-1 flex items-center justify-center cursor-pointer" onClick={() => changeSlide("left")}>
        <img
          src="/arrow.png"
          alt=""
          className="w-[50px] max-md:w-[30px] max-sm:w-[20px]"
        />
      </div>

      <div className="flex-[10]">
        <img
          src={images[imageIndex]}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex items-center justify-center cursor-pointer" onClick={() => changeSlide("right")}>
        <img
          src="/arrow.png"
          alt=""
          className="w-[50px] rotate-180 max-md:w-[30px] max-sm:w-[20px]"
        />
      </div>

      <div
        className="absolute top-0 right-0 text-white text-[36px] font-bold p-[50px] cursor-pointer"
        onClick={() => setImageIndex(null)}
      >
        X
      </div>
    </div>
  )}

  <div className="flex-[3] max-sm:flex-[2]">
    <img
      src={images[0]}
      alt=""
      onClick={() => setImageIndex(0)}
      className="w-full h-full object-cover rounded-[10px] cursor-pointer"
    />
  </div>

  <div className="flex-1 flex flex-col justify-between gap-5">
    {images.slice(1).map((image, index) => (
      <img
        src={image}
        alt=""
        key={index}
        onClick={() => setImageIndex(index + 1)}
        className="w-full h-[100px] max-sm:h-[80px] object-cover rounded-[10px] cursor-pointer"
      />
    ))}
  </div>
</div>
  );
}

export default Slider;
