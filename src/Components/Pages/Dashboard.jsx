import { DragDropContext } from "@hello-pangea/dnd";
import { Modal } from "../Modal/Modal";
import AddTask from "./AddTask";
import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../../Context/TasksContext.jsx";
import { Spinner } from "@material-tailwind/react";
import { MdOutlineSync } from "react-icons/md";
import { useToast } from "@chakra-ui/react";
import Column from "../Column.jsx";

const Dashboard = () => {
    const { tasks, fetchTasks, updateTaskStatus } = useContext(TasksContext);
    const toast = useToast();
    const [taskData, setTaskData] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        setTaskData(tasks);
    }, [tasks]);

    const handleSync = async () => {
        fetchTasks();
        toast({
            position: "top",
            status: "success",
            variant: "solid",
            isClosable: true,
            duration: 3000,
            title: "Tasks fetched successfully.",
        });
    };

    if (!taskData) {
        return <Spinner size="xl" className="mx-auto my-10" />;
    }

    const todoTasks = taskData.filter((task) => task.status === "To Do");
    const inProgressTasks = taskData.filter((task) => task.status === "In Progress");
    const doneTasks = taskData.filter((task) => task.status === "Done");

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const updatedTasks = [...taskData];
        const movedTask = updatedTasks.find((task) => task._id === result.draggableId);

        if (movedTask) {
            movedTask.status = destination.droppableId;
            setTaskData(updatedTasks);
            updateTaskStatus(movedTask._id, movedTask.status); // API call to update task status
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <title>Dashboard - Kanban board</title>
            <meta name="author" content="Josh" />
            <meta name="keywords" content="Kanban Board" />

            <div className="bg-white w-[80vw] md:w-[70rem] border-[1px] py-4 px-6 rounded-md">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xl">Task Management</h3>
                    <div className="flex justify-center items-center">
                        <MdOutlineSync size={28} className="text-gray-900 mr-6 cursor-pointer" onClick={handleSync} />
                        <Modal header={"Please add new task"} btn={"Add Task"} Component={AddTask} />
                    </div>
                </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="mt-4 flex justify-center flex-col md:flex-row">
                    <Column header={"To Do"} color="bg-blue-500" tasks={todoTasks} status="To Do" />
                    <Column header={"In Progress"} color="bg-yellow-700" tasks={inProgressTasks} status="In Progress" />
                    <Column header={"Done"} color="bg-green-500" tasks={doneTasks} status="Done" />
                </div>
            </DragDropContext>
        </div>
    );
};

export default Dashboard;
