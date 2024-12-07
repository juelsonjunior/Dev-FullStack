import { useEffect, useState } from "react";
import Task from "../../components/tasks/task";
import Sidebar from "../../components/sidebar/sidebar";
import { useLocation } from "react-router-dom";
import { searchTasks } from "../../utils/functions";

function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchTasks("search", query, setSearchData, setLoading);
  }, [query]);

  return (
    <div className="flex">
      <div className="bg-slate-900 py-8 h-lvh p-2 text-white w-11 md:w-96">
        <Sidebar />
      </div>

      <div className="bg-searchImg w-lvw h-lvh p-7 flex flex-col justify-between gap-5">
        <div className="w-full h-full overflow-y-scroll no-scrollbar scroll-smooth flex flex-col gap-1">
          {searchData == "" ? (
            <div className="bg-slate-900 px-4  py-2  rounded-md flex items-center justify-center"><span className="text-sm text-red-500">Não foi encontrada nenhuma tarefa</span></div>
          ) : (
            searchData.map((task, index) => (
              <Task
                key={index}
                isDone={task.isDone}
                text={task.task}
                idTask={task.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
