import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListTask from "./pages/listTasks/listTasks";
import ListDone from "./pages/listDone/listDone";
import Search from "./pages/search/serach";
import { TaskProvider } from "./contexts/taskContext";

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/list-done" element={<ListDone />} />
          <Route path="/" element={<ListTask />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;
