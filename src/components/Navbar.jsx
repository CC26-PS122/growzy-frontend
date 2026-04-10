import { useNavigate, useLocation } from "react-router-dom";
import { Home, Calendar, User } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { path: "/dashboard", icon: Home, label: "Home" },
    { path: "/calendar", icon: Calendar, label: "Calendar" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <>
      
      <div className="hidden md:flex fixed top-0 left-0 w-full bg-white shadow px-8 py-4 justify-between items-center z-50">
        <h1 className="font-semibold text-[#004A78]">Growzy</h1>

        <div className="flex gap-6">
          {menu.map((item, i) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={i}
                onClick={() => navigate(item.path)}
                className={`transition
                  ${isActive
                    ? "text-[#004A78]"
                    : "text-gray-400 hover:text-[#004A78]"}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-lg flex justify-evenly items-center py-3 z-50 md:hidden">
        {menu.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center justify-center transition-all
                ${isActive
                  ? "bg-[#004A78] text-white w-11 h-11 rounded-full"
                  : "text-gray-400 w-10 h-10"}`}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Navbar;