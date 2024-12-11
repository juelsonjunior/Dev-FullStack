import { Link } from "react-router-dom"

function Navbar(){
    return(
        <div className="bg-slate-900 text-white h-14">
            <ul className="flex items-center justify-center w-full h-full gap-5">
                <li className="link-navbar"><Link to="/">Encurtar</Link></li>
                <li className="link-navbar"><Link to="/estatistica">Estátistica URL</Link></li>
                <li className="link-navbar"><Link to="/contacto">Contacto</Link></li>
            </ul>
        </div>
    )
}

export default Navbar