import { Modal } from "../Modal/Modal"
import AddTask from "./AddTask"
import { useContext, useEffect } from "react"
import { TasksContext } from "../../Context/TasksContext.jsx"
import { Spinner } from "@material-tailwind/react"
import { MdOutlineSync } from "react-icons/md";
import { useToast } from "@chakra-ui/react"
const Dashboard = () => {
    const { tasks, fetchTasks } = useContext(TasksContext);
    const toast = useToast();
    useEffect(() => {
        fetchTasks();
    }, []);
    const handleSync = async () => {
        // Implement syncing logic here
        fetchTasks();
        toast({
            position: "top",
            status: "success",
            variant: "solid",
            isClosable: true,
            duration: 3000,
            title: "Tasks fetched successfully.",
        })
    }
    if (!tasks) {
        return <Spinner size="xl" className="mx-auto my-10" />
    }
    return (
        <div className="">
            <div className="bg-secbg py-4 px-6 rounded-md">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xl">Task Management</h3>
                    <div className="flex justify-center items-center">
                        <MdOutlineSync size={28} className="text-gray-900 mr-6 cursor-pointer" onClick={handleSync} />
                        <Modal header={"Please add new task"} btn={"Add Task"} Component={AddTask} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
