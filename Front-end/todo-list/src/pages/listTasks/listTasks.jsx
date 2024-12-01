import { useContext, useEffect, useState } from "react";
import TextAba from "../../components/info-aba/textAba";
import Task from "../../components/tasks/task";
import {
  faHome,
  faCheckCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../components/sidebar/sidebar";
import InsertTask from "../../components/insert-task/insert-task.jsx";
import { TaskContext } from "../../contexts/taskContext.jsx";

function ListTask() {
  const { tasks, isLoading, listTaks } = useContext(TaskContext);

  useEffect(() => {
    listTaks();
  }, []);

  return (
    <div className="flex">
      <div className="bg-slate-900 py-8 h-lvh p-2 text-white w-12 md:w-96">
        <Sidebar />
      </div>

      <div className="bg-homeImg w-lvw h-lvh p-7 flex flex-col justify-between gap-5">
        <div className="flex items-center justify-start">
          <TextAba icon={faHome} text={"Tarefas"} />
        </div>

        <div className="w-full h-full overflow-y-scroll no-scrollbar scroll-smooth flex flex-col gap-1 items-center">
          {isLoading ? (
            <div className="w-9 h-9 border-t-4 border-blue-200 rounded-full animate-spin"></div>
          ) : (
            tasks.map((task, index) => (
              <Task
                key={index}
                isDone={task.isDone}
                text={task.task}
                idTask={task.id}
              />
            ))
          )}
        </div>

        <InsertTask />
      </div>
    </div>
  );
}

export default ListTask;
