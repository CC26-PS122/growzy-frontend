import { useNavigate, useLocation } from "react-router-dom";
import { Home, Calendar, User } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { path: "/dashboard", icon: Home },
    { path: "/calendar", icon: Calendar },
    { path: "/profile", icon: User },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full bg-white rounded-full px-2 py-2 flex justify-evenly items-center gap-3 shadow-md sm:gap-4 sm:px-3">

        {menu.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center justify-center transition-all duration-200
                ${isActive
                  ? "bg-[#004A78] text-white w-10 h-10 rounded-full shadow"
                  : "text-gray-400 w-10 h-10"
                }`}
            >
              <Icon size={18} />
            </button>
          );
        })}

      </div>
    </div>
  );
}

export default Navbar;