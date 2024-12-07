import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { TaskContext } from "../../contexts/taskContext";
import MessageWarning from "../messages/messageError";

function InsertTask() {
  const [valueTask, setValueTask] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { addTask, countTasks } = useContext(TaskContext);

  const handleInsertTask = (e) => {
    e.preventDefault();
    if (valueTask != "") {
      addTask(valueTask, setIsLoading);
      countTasks();
      setValueTask("");
      setMessage("");
    } else {
      setMessage("Precisa escrever uma tarefa ");
    }
  };

  return (
    <>
      {message && <MessageWarning text={message} />}
      <form onSubmit={handleInsertTask}>
        <div className="flex justify-between items-center gap-3 bg-slate-900 rounded-md p-1 hover:bg-slate-800 duration-300 ease-in-out">
          <input
            type="text"
            placeholder="Adicionar tarefa"
            value={valueTask}
            className="bg-transparent w-full h-full py-3 placeholder-white text-white outline-none"
            onChange={(e) => setValueTask(e.target.value)}
          />
          <button
            type="submit"
            className="hover:bg-gray-700 p-1 text-xs rounded-md duration-300 ease-in-out cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-2 h-2 rounded-full border-t-2 border-blue-200 animate-spin"></div>
            ) : (
              <FontAwesomeIcon icon={faPlus} className="text-white text-lg" />
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default InsertTask;
