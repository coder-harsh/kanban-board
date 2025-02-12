import axios from "axios";
import { createContext, useState } from "react";
import { useToast } from "@chakra-ui/react";

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const toast = useToast();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Fetch Tasks from API
    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/tasks/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"), // Secure API call
                },
            });

            if (response.data.success) {
                setTasks(response.data.data);
            } else {
                throw new Error(response.data.message || "Failed to fetch tasks");
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Delete Task
    const deleteTask = async (id, title) => {
        try {
            const response = await axios.delete(`${backendUrl}/api/tasks/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });

            if (response.data.success) {
                fetchTasks(); // Refresh task list
                toast({
                    title: "Task Deleted",
                    description: `Task "${title}" has been successfully removed.`,
                    status: "success",
                    position: "top",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                throw new Error(response.data.message || "Failed to delete task");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Update Task Status
    const updateTaskStatus = async (id, newStatus) => {
        try {
            const response = await axios.put(`${backendUrl}/api/tasks/${id}`,
                { status: newStatus },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );

            if (response.data.success) {
                fetchTasks();
                toast({
                    title: "Task Status Updated",
                    description: `Task status has been updated to "${newStatus}".`,
                    status: "success",
                    position: "top",
                    duration: 3000,
                    isClosable: true,
                })
            } else {
                throw new Error(response.data.message || "Failed to update task status");
            }
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    return (
        <TasksContext.Provider value={{ tasks, fetchTasks, deleteTask, updateTaskStatus }}>
            {children}
        </TasksContext.Provider>
    );
};
