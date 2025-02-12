import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { io } from "socket.io-client";

export const TasksContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const socket = io(backendUrl, { autoConnect: false }); // Prevent immediate connection

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    const toast = useToast();

    // Fetch User-Specific Tasks
    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/tasks/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });

            if (response.data.success) {
                setTasks(response.data.data);
            } else {
                throw new Error(response.data.message || "Failed to fetch tasks");
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            toast({
                title: "Error",
                description: "Failed to fetch tasks.",
                status: "error",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Fetch All Tasks (For Admin)
    const fetchAllTasks = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/tasks/all`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });

            if (response.data.success) {
                setAllTasks(response.data.data);
            } else {
                throw new Error(response.data.message || "Failed to fetch all tasks");
            }
        } catch (error) {
            console.error("Error fetching all tasks:", error);
            toast({
                title: "Error",
                description: "Failed to fetch all tasks.",
                status: "error",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        socket.connect(); // Manually connect

        fetchTasks(); // Fetch tasks on mount
        fetchAllTasks();

        // Listen for task updates from the server
        socket.on("tasksUpdated", fetchTasks);
        socket.on("taskDeleted", fetchTasks);
        socket.on("taskUpdated", fetchTasks);

        return () => {
            socket.off("tasksUpdated", fetchTasks);
            socket.off("taskDeleted", fetchTasks);
            socket.off("taskUpdated", fetchTasks);
            socket.disconnect(); // Cleanup on unmount
        };
    }, []);

    // Delete Task
    const deleteTask = async (id, title) => {
        try {
            await axios.delete(`${backendUrl}/api/tasks/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });

            socket.emit("taskDeleted", id); // Notify server of deletion

            toast({
                title: "Task Deleted",
                description: `Task "${title}" has been successfully removed.`,
                status: "success",
                position: "top",
                duration: 3000,
                isClosable: true,
            });

        } catch (error) {
            console.error("Error deleting task:", error);
            toast({
                title: "Error",
                description: "Failed to delete task.",
                status: "error",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Update Task Status (e.g., On Drag-Drop)
    const updateTaskStatus = async (id, newStatus) => {
        try {
            await axios.put(
                `${backendUrl}/api/tasks/${id}`,
                { status: newStatus },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );

            socket.emit("taskUpdated", { id, newStatus }); // Notify server of update

            toast({
                title: "Task Status Updated",
                description: `Task status updated to "${newStatus}".`,
                status: "success",
                position: "top",
                duration: 3000,
                isClosable: true,
            });

        } catch (error) {
            console.error("Error updating task status:", error);
            toast({
                title: "Error",
                description: "Failed to update task status.",
                status: "error",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <TasksContext.Provider value={{ tasks, fetchTasks, deleteTask, fetchAllTasks, allTasks, updateTaskStatus }}>
            {children}
        </TasksContext.Provider>
    );
};
