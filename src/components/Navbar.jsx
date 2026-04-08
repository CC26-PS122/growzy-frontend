import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { path: "/dashboard", icon: "🏠" },
    { path: "/calendar", icon: "📅" },
    { path: "/profile", icon: "👤" },
  ];

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="bg-white rounded-full px-10 py-4 flex gap-10 shadow-md">

        {menu.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`text-2xl transition ${
                isActive
                  ? "bg-blue-500 text-white p-3 rounded-full"
                  : "text-gray-400"
              }`}
            >
              {item.icon}
            </button>
          );
        })}

      </div>
    </div>
  );
}

export default Navbar;