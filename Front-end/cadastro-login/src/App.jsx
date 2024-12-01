import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Cadastro from "./pages/register/register"
import Login from "./pages/login/login"
import ListUsers from "./pages/list/index"

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={< Cadastro/>} />
      <Route path="/login" element={< Login />}/>
      <Route path="/list-users" element={< ListUsers />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App