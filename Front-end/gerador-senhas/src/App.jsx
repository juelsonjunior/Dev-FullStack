import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/home";
import ListPass from "./pages/list-pass/list";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list-pass" element={<ListPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
