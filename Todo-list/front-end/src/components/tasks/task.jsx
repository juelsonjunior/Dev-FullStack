import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DetailsTasks from "../details-task/details-task";
import { useContext, useState } from "react";
import { delTask } from "../../utils/functions";
import { TaskContext } from "../../contexts/taskContext";
import MessageError from "../messages/message";
import { faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons";

function Task({ text, idTask, isDone }) {
  const [selectId, setSelectId] = useState(null);
  const { listTaks, countTasks } = useContext(TaskContext);
  const [message, setMessage] = useState("");

  const delTasks = async (id) => {
    await delTask("del-task", id, setMessage);
    setTimeout(() => {
      listTaks();
      countTasks();
    }, 1000);
  };

  const showDetails = (id) => {
    if (selectId === id) {
      setSelectId(null);
    } else {
      setSelectId(id);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between w-full bg-slate-900 p-2 py-3 rounded-md">
        {message && <MessageError text={message} />}
        <div className="flex items-center gap-3">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className={`${
              isDone ? "text-blue-500" : "text-gray-500"
            } cursor-pointer`}
          />
          <span
            className="text-white cursor-pointer"
            onClick={() => showDetails(idTask)}
          >
            {text}
          </span>
        </div>
        <FontAwesomeIcon
          icon={faTrash}
          className="bg-slate-50 p-1 text-xs rounded-sm cursor-pointer text-slate-950"
          onClick={() => delTasks(idTask)}
        />

        {selectId !== null && (
          <DetailsTasks id={selectId} onClose={() => setSelectId(null)} />
        )}
      </div>
    </>
  );
}

export default Task;
