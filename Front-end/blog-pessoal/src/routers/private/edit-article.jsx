export function EditArticle() {
    return (
        <div className="flex justify-center w-lvw">
            <div className="flex gap-3 flex-col w-1/2 mt-5">
                <h3 className="text-slate-800 text-3xl">Editar artigo</h3>
                <input
                    type="text"
                    className="bg-slate-100 rounded-sm py-2 px-1 text-slate-800 outline-none"
                    placeholder="Titulo do artigo"
                />
                <textarea
                    className="bg-slate-100 rounded-sm  py-2 px-1 text-slate-800 outline-none h-64"
                    placeholder="Conteudo do artigo"
                ></textarea>
                <div className="flex  justify-center w-full">
                    <button className="bg-slate-800 text-white mt-6 w-40 p-2 rounded-full hover:bg-slate-800">
                        Actualizar
                    </button>
                </div>
            </div>
        </div>
    );
}
