import axios from "axios";
import { createContext, useState } from "react";
export const TasksContext = createContext();
import { useToast } from "@chakra-ui/react";
export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/tasks/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"), // Secure the API
                },
            });
            console.log(response)
            if (response.data.success) {
                setTasks(response.data.data);
            } else {
                throw new Error(response.data.message || "Failed to fetch tasks");
            }
        } catch (error) {
            console.log(error)
        }
    }
    const toast = useToast();
    const deleteTask = async (id, title) => {
        const response = await axios.delete(`${backendUrl}/api/tasks/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"), // Secure the API
            },
        })
        if (response.data.success) {
            fetchTasks(); // Fetch updated tasks list after deletion.
            toast({
                title: response.data.message,
                description: `Your task "${title}" has been successfully deleted.`,
                status: "success",
                position: "top",
                duration: 3000,
                isClosable: true,
            })
        } else {
            throw new Error(response.data.message || "Failed to delete task");
        }
    }
    const value = {
        tasks, fetchTasks, deleteTask
    }
    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    )
}