import Sidebar from "../../components/sidebar/Sidebar";
import AddTask from "../../components/taskmanager/AddTask";
import TaskList from "../../components/taskmanager/TaskList";

const TaskManager = () => {
  return (
    <div className="taskmanager">
      <div className="taskmanager__left">
        <Sidebar />
      </div>
      <div className="taskmanager__right">
        <div className="taskmanager__addtask bg-gray-100 p-4">
          <AddTask />
        </div>
        <div className="taskmanager__tasklist bg-gray-100 p-4">
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default TaskManager;