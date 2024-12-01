import { Navbar } from "../../components/navBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import api from "../../service/api";
function ListPass() {
  const [passwords, setpasswords] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const listPassWords = async () => {
    try {
      setIsLoading(true);
      const dataPass = await api.get("/list-passwords");

      setpasswords(dataPass.data);
    } catch (error) {
      console.log(`Houve um problema ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePass = async (id) => {

    const delConfirm = window.confirm("Tem certeza de que eseja excluir essa senha")

    if(!delConfirm) return;
    try {
      const del = await api.delete(`/del-passwords/:${id}`);
      console.log(del);
      listPassWords()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listPassWords();
  }, []);
  return (
    <div className="flex items-center mx-auto max-w-7xl h-lvh flex-col gap-5">
      <Navbar />
      <div className="w-full flex flex-col">
        <div className="w-full max-w-2xl mx-auto shadow-lg rounded-lg p-5">
          <table className="min-w-full flex flex-col gap-3">
            <thead className="bg-slate-900 p-5 rounded-md">
              <tr className="flex items-center justify-between">
                <th
                  scope="col"
                  className="text-xs font-medium text-slate-50 uppercase tracking-wider"
                >
                  Senha
                </th>
                <th
                  scope="col"
                  className="text-xs font-medium text-slate-50 uppercase tracking-wider"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="flex flex-col gap-2">
              {isLoading ? (
                <tr className="flex items-center justify-center bg-slate-900 rounded-md p-5">
                  <td className="whitespace-nowrap">Carregando dados...</td>
                </tr>
              ) : (
                passwords.map((pass) => (
                  <tr
                    className="flex items-center justify-between bg-slate-900 rounded-md p-5"
                    key={pass.id}
                  >
                    <td className="whitespace-nowrap">{pass.senha}</td>
                    <td className="whitespace-nowrap">
                      <button className="bg-slate-50 transition duration-200 ease-in-out w-6 scale-105 rounded-sm">
                        <span
                          onClick={() => deletePass(pass.id)}
                          className="text-purple-500 hover:text-purple-600"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListPass;
