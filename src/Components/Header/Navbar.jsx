import Profile from "../Profile";
import { Link } from "react-router-dom";
import { FaHandshake } from "react-icons/fa";
import { MdOutlineDarkMode } from "react-icons/md";
const Navbar = () => {
    return (
        <nav className="flex flex-row justify-between items-center px-4 md:px-8 py-4 sticky top-0 z-40 bg-white border-b border-gray-300">
            <div className="flex flex-row items-center">
                <div className="hidden md:flex items-center">
                    <Link className="flex justify-center items-center">
                        <FaHandshake className="text-purple-500 mr-2" size={44} />
                        <h3 className="text-2xl font-bold text-purple-500">Kanban Board</h3>
                    </Link>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center">
                <MdOutlineDarkMode size={28} className="cursor-pointer text-gray-600" />
                <Profile />
            </div>
        </nav>
    );
};

export default Navbar;