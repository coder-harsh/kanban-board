import axios from "axios";
import { createContext, useState } from "react";
export const TasksContext = createContext();
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
                console.log(response.data.data)
            } else {
                throw new Error(response.data.message || "Failed to fetch tasks");
            }
        } catch (error) {
            console.log(error)
        }
    }
    const value = {
        tasks, fetchTasks
    }
    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    )
}