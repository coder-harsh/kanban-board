import { MdDragIndicator, MdModeEdit, MdDelete } from "react-icons/md";

const Task = ({ task }) => {
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
                    <p title={task.description} className="text-gray-500 text-wrap">{task.description.slice(0, 30) + "..."}</p> {/* Display Task Description */}
                </div>
                <div className="flex justify-center items-center">
                    <MdModeEdit size={24} className="mx-1 cursor-pointer" />
                    <MdDelete size={24} className="mx-1 text-red-500 cursor-pointer" />
                </div>
            </div>
        </div>
    )
}

export default Task;
