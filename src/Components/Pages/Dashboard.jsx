import { Modal } from "../Modal/Modal"
import AddTask from "./AddTask"
const Dashboard = () => {
    return (
        <div className="">
            <div className="bg-secbg py-4 px-6 rounded-md">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xl">Kanban Board</h3>
                    <Modal header={"Please add new task"} btn={"Add Task"} Component={AddTask} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
