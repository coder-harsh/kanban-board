import { MdDragIndicator, MdModeEdit, MdDelete } from "react-icons/md";
import BtnAlert from "../Components/Modal/BtnAlert"
import { useContext } from "react";
import { TasksContext } from "../Context/TasksContext";
const Task = ({ task }) => {
    const { deleteTask } = useContext(TasksContext);
    return (
        <div className="flex justify-center hover:cursor-move my-2">
            <div className="flex bg-white py-4 px-2 justify-between items-center border-[1px] w-[30rem] rounded-md">
                <div className="mr-2">
                    <MdDragIndicator size={28} className="text-gray-500" />
                </div>
                <div>
                    <h3 className="font-bold">
                        {task.title} {/* Display Task Title */}
                    </h3>
                    <p title={task.description} className="text-gray-500 text-wrap">
                        {task.description.length > 30 ? task.description.slice(0, 30) + "..." : task.description}
                    </p>

                </div>
                <div className="flex justify-center items-center">
                    <MdModeEdit size={24} className="mx-1 cursor-pointer" />
                    <BtnAlert btntxt={"Delete Task"} headertxt={"Delete the task"} bodytxt={"Do you really want to delete the teask?"} fun={() => deleteTask(task._id, task.title)} />
                </div>
            </div>
        </div>
    )
}

export default Task;
