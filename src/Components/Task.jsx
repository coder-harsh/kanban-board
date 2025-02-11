import { MdDragIndicator } from "react-icons/md";

const Task = () => {
    return (
        <div className="flex justify-center hover:cursor-move">
            <div className="flex bg-white py-4 px-2 items-center border-[1px] w-[30rem] rounded-md">
                <div className="mr-4">
                    <MdDragIndicator size={28} className="text-gray-500" />
                </div>
                <div>
                    <h3 className="font-bold">
                        Task Name
                    </h3>
                    <p className="text-gray-500 text-wrap">Task Description</p>
                </div>
            </div>
        </div>
    )
}

export default Task
