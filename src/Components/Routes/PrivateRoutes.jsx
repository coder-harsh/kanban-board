import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner, Center } from "@chakra-ui/react";
import { SideBar } from "../Sidebar";
import Navbar from "../Header/Navbar";

const PrivateRoutes = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            navigate("/login");
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <Center minH="100vh">
                <Spinner size="xl" color="purple.500" />
            </Center>
        );
    }

    return isAuthenticated ? (
        <div className="flex h-screen">
            {/* Sidebar - Fixed Position, No Scroll */}
            <div className="w-[18rem] h-full">
                <SideBar />
            </div>

            {/* Main Content - Scrollable */}
            <div className="flex flex-col flex-grow overflow-y-auto">
                <Navbar />
                <div className="p-4 bg-bodybg h-screen">
                    <Outlet />
                </div>
            </div>
        </div>
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoutes;
