import { Link } from 'react-router-dom';
export function Article() {
    return (
        <div className="flex justify-center w-lvw">
            <div className="flex flex-col w-1/2 mt-5">
                <h3 className="text-slate-800 text-3xl">Blog Pessoal</h3>
                <p className="text-slate-500">August 1, 2024</p>
                <p className="mt-3 text-justify">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Dignissimos, doloremque nemo delectus omnis odit maxime
                    impedit illum cum dolorem totam possimus voluptates labore
                    deserunt modi, voluptate nulla debitis unde deleniti? Lorem
                    ipsum dolor, sit amet consectetur adipisicing elit.
                    Dignissimos, doloremque nemo delectus omnis odit maxime
                    impedit illum cum dolorem totam possimus voluptates labore
                    deserunt modi, voluptate nulla debitis unde deleniti? Lorem
                    ipsum dolor, sit amet consectetur adipisicing elit.
                    Dignissimos, doloremque nemo delectus omnis odit maxime
                    impedit illum cum dolorem totam possimus voluptates labore
                    deserunt modi, voluptate nulla debitis unde deleniti?
                </p>
                <div className="flex  justify-center w-full">
                    <button className="bg-slate-500 text-white mt-6 w-40 p-2 rounded-full hover:bg-slate-800">
                        <Link to={"/"}>Voltar a Home</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
