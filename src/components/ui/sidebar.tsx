import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  MdOutlineSpaceDashboard,
  MdOutlineArticle,
  MdOutlineCategory,
  MdOutlineAccountCircle,
  MdOutlineLogout,
  MdOutlineTravelExplore,
} from "react-icons/md";
import { logout } from "../../features/auth/authSlice";

const menus = [
  {
    id: 0,
    title: "Explore",
    path: "/explore",
    icon: <MdOutlineTravelExplore size={20} />,
  },
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdOutlineSpaceDashboard size={20} />,
  },
  {
    id: 2,
    title: "Articles",
    path: "/articles",
    icon: <MdOutlineArticle size={20} />,
  },
  {
    id: 3,
    title: "Categories",
    path: "/category",
    icon: <MdOutlineCategory size={20} />,
  },
  {
    id: 4,
    title: "Profile",
    path: "/profile",
    icon: <MdOutlineAccountCircle size={20} />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="fixed top-0 left-0 z-50 w-1/6 bg-black h-dvh text-black-foreground">
      <div className="flex flex-col w-full h-full gap-4 p-4 lg:p-8">
        <span className="text-3xl tracking-widest uppercase font-jost-semibold">
          travel+
        </span>

        <ul className="flex flex-col w-full gap-4">
          {menus.map((menu) => (
            <Link to={menu.path} key={menu.id}>
              <li
                className={`flex items-center justify-center w-full h-12 gap-2 md:justify-start ${
                  location.pathname === menu.path ? "text-secondary" : ""
                }`}
              >
                {menu.icon}
                <span className="hidden md:block font-outfit-regular">
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
        <div
          onClick={handleLogout}
          className="flex items-center justify-center w-full h-12 gap-2 mt-auto text-red-700 cursor-pointer md:justify-start"
        >
          <MdOutlineLogout size={20} />
          <span className="hidden md:block font-outfit-regular">Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
