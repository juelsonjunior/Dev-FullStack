import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let users = [{ name: "Juelson", age: 10 }];

app.listen(3000, () => console.log("Servidor rodando🚀"));

app.get("/list-users", (req, res) => {
  res.json(users);
});

app.post("/insert-users", (req, res) => {
  users = req.body;

  res.json({ message: "Usuario cadastrado com sucesso", users });
});

app.delete("/delete-users/:id", (req, res) => {
  const id = req.params.id;

  res.send("usuario deletado");
  users.splice(id, 1);
});
