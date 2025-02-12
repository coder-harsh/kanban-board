import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Avtar from './Avatar';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa6";
import { Logout } from '../.utils/Logout';
import { useNavigate } from 'react-router-dom';
// Adjust the path if necessary
const Profile = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        Logout();
        navigate("/login")
    }
    return (
        <Menu className="hover:cursor-pointer">
            <MenuButton as={Button} rightIcon={<MdOutlineArrowDropDown className='text-txtgray' />} backgroundColor={'transparent'}>
                <Avtar />
            </MenuButton>
            <MenuList>
                <MenuItem as={Link} to="/dashboard" icon={< IoMdHome size={20} className='text-txtgray' />}>Dashboard</MenuItem>
                <MenuItem icon={<FaPowerOff size={20} className='text-txtgray' />} onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default Profile;