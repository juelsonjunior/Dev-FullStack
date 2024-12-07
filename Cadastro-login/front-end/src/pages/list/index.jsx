import { useEffect, useState } from "react";
import api from "../services/api";
function ListUsers() {
  const [allUsers, setAllUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      const token = localStorage.getItem("token");

      try {
        setIsLoading(true);
        const {
          data: { users },
        } = await api.get("/list-users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAllUsers(users);
      } catch (error) {
        console.log(`Erro ao buscar usuarios: ${error}`);
      } finally {
        setIsLoading(false);
      }

      // console.log(allUsers);
    }

    loadUsers();
  }, []);

  return (
    <div>
      <h4 className="text-2xl font-bold text-center">Lista de usuarios</h4>
      {isLoading ? (
        <p>Carregando usuarios...</p>
      ) : (
        <ul className="flex flex-col gap-5">
          {allUsers.map((user) => (
            <li key={user.id} className="bg-slate-500 p-8">
              <p><span className="font-bold">Id: </span>{user.id}</p>
              <p><span className="font-bold">Nome: </span> {user.name}</p>
              <p><span className="font-bold">Email: </span> {user.email}</p>
            </li>
          ))
          }
        </ul>
      )
      }
    </div>
  );
}

export default ListUsers;
