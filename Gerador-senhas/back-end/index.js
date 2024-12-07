import express from "express";
import publicRoute from "./routers/public.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", publicRoute);

app.listen(3000, () => console.log("Servidor rodando na 3000"));

//juelsonjunior27
//JGJZwKnryQPAocTW
