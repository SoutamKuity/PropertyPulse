import { useContext, useState ,useEffect} from "react";
import { Link , NavLink} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  //if(currentUser) fetch(); //previous

  useEffect(() => {
    if (currentUser) fetch();//suggested by gpt
  }, [currentUser]);

  return (
    <nav className="h-[100px] flex justify-between items-center px-4">
  <div className="flex flex-1 max-[1366px]:flex-[3] items-center gap-[50px]">
    <Link to="/" className="font-bold text-[20px] flex items-center gap-[10px]">
      <img src="/logo.png" alt="logo" className="w-[28px]" />
      <span className="max-[738px]:hidden">PropertyPulse</span>
    </Link>
    <Link to="/" className="max-[738px]:hidden hover:scale-105 transition-all duration-400">Home</Link>
    <Link to="/" className="max-[738px]:hidden hover:scale-105 transition-all duration-400">About</Link>
    <Link to="/" className="max-[738px]:hidden hover:scale-105 transition-all duration-400">Contact</Link>
    <Link to="/" className="max-[738px]:hidden hover:scale-105 transition-all duration-400">Agents</Link>
  </div>

  <div className="flex flex-1 max-[1366px]:flex-[2] items-center justify-end h-full bg-[#fcf5f3] max-[1024px]:bg-transparent relative">
    {currentUser ? (
      <div className="flex items-center font-bold">
        <img
          src={currentUser.avatar || "/noavatar.jpg"}
          alt=""
          className="w-[40px] h-[40px] rounded-full object-cover mr-[20px]"
        />
        <span className="max-[738px]:hidden">{currentUser.username}</span>
        <Link
          to="/profile"
          className="relative px-[24px] py-[12px] bg-[#fece51] cursor-pointer border-none"
        >
          {number > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-600 text-white w-[26px] h-[26px] flex items-center justify-center rounded-full text-sm">
              {number}
            </div>
          )}
          <span>Profile</span>
        </Link>
      </div>
    ) : (
      <>
        <a href="/login" className="px-[24px] py-[12px] mx-[20px]">Sign in</a>
        <a href="/register" className="px-[24px] py-[12px] mx-[20px] bg-[#fece51]">Sign up</a>
      </>
    )}

    {/* Menu Icon - visible only on screens ≤738px */}
    <div className="max-[738px]:inline hidden z-[999]">
      <img
        src="/menu.png"
        alt=""
        onClick={() => setOpen((prev) => !prev)}
        className="w-[36px] h-[36px] cursor-pointer"
      />
    </div>

    {/* Mobile Menu - Slide In */}
    <div
      className={`absolute top-0 ${
        open ? 'right-0' : 'right-[-50%]'
      } bg-black text-white h-screen w-1/2 transition-all duration-1000 flex flex-col items-center justify-center text-[24px] max-[738px]:flex hidden`}
    >
      <a href="/">Home</a>
      <a href="/">About</a>
      <a href="/">Contact</a>
      <a href="/">Agents</a>
      <a href="/login">Sign in</a>
      <a href="/register">Sign up</a>
    </div>
  </div>
</nav>
  );
}

export default Navbar;
