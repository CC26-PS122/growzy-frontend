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
    <div className="w-full flex justify-center mt-4">
      <div className="bg-white shadow rounded-full px-6 py-3 flex gap-8">

        {menu.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`text-2xl ${
              location.pathname === item.path
                ? "text-blue-500"
                : "text-gray-400"
            }`}
          >
            {item.icon}
          </button>
        ))}

      </div>
    </div>
  );
}

export default Navbar;