import { Outlet } from 'react-router-dom';

function App() {
    return (
        <div className='w-lvw h-lvh bg-gray-300'>
            <Outlet/>
        </div>
    );
}

export default App;
