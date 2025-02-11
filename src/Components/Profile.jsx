import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Avtar from './Avatar';
import { IoPerson, IoSettings } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa6";
import { Logout } from '../.utils/Logout';
// Adjust the path if necessary
const Profile = () => {
    const handleLogout = () => {
        Logout();
    }
    return (
        <Menu className="hover:cursor-pointer">
            <MenuButton as={Button} rightIcon={<MdOutlineArrowDropDown className='text-txtgray' />} backgroundColor={'transparent'}>
                <Avtar />
            </MenuButton>
            <MenuList>
                <MenuItem as={Link} to="/" icon={< IoMdHome size={20} className='text-txtgray' />}>Home</MenuItem>
                <>
                    <MenuItem as={Link} to="/profile" icon={<IoPerson size={20} className='text-txtgray' />}>Profile</MenuItem>
                    <MenuItem as={Link} to="/settings" icon={<IoSettings size={20} className='text-txtgray' />}>Settings</MenuItem>
                    <MenuItem as={Link} to="/login" icon={<FaPowerOff size={20} className='text-txtgray' />} onClick={handleLogout}>Logout</MenuItem>
                </>
            </MenuList>
        </Menu>
    );
};

export default Profile;