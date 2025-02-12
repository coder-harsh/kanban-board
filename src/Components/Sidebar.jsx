import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import { Chip } from "@material-tailwind/react";
import { FaPowerOff } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { Logout } from "../.utils/Logout";
export function SideBar() {
    const handlelogout = () => {
        Logout();
    };

    return (
        <Card className="w-full h-screen max-w-[18rem] px-6 shadow-none rounded-none py-16 bg-white border-r-[1px] overflow-hidden">
            <div className="mb-2 px-4">
                <Typography variant="h5" className="text-lg flex">
                    <p>Kanban Board</p>
                    <Chip size="sm" value="v1.0.0.1" className="ml-2" variant="ghost" color="blue" />
                </Typography>
            </div>
            <List className="overflow-y-auto h-full">
                {/* Home Link */}
                <Link to={"/dashboard"}>
                    <ListItem>
                        <ListItemPrefix>
                            <MdDashboard className="h-5 w-5" />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                </Link>

                <Link onClick={handlelogout} to={"/login"}>
                    <ListItem>
                        <ListItemPrefix>
                            <FaPowerOff className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </Link>
            </List>
        </Card>

    );
}