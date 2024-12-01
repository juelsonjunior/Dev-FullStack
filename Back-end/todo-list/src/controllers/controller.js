import {
  listTaskBD,
  insertTaskBD,
  delTaskBD,
  editTaskBD,
  detailsTaskBD,
  countTaskBD,
  searchTaskBD,
} from "../services/service.js";

export const listTaskFront = async (req, res) => {
  try {
    const tasks = await listTaskBD();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar tarefas", error });
  }
};

export const seachTaskFront = async (req, res) => {
  try {
    const searchData = req.params.q.replace(":", "")
    const search = await searchTaskBD(searchData);

    res.status(200).json(search);
  } catch (error) {
    res.status(500).json({ message: "Erro ao pesquisar tarefas", error });
  }
};

export const insertTaskFront = async (req, res) => {
  try {
    const dateTask = req.body;

    const insert = await insertTaskBD(dateTask.task);
    res.status(200).json({ message: "Tarefa inserida com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao inserir tarefas", error });
  }
};

export const delTaskFront = async (req, res) => {
  try {
    const taskID = req.params.id.replace(":", "");

    const del = await delTaskBD(taskID);

    res.status(200).json({ message: "Mensagem apagada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar tarefa", error });
  }
};

export const editTaskFront = async (req, res) => {
  try {
    const taskInfo = req.body;

    const update = await editTaskBD(
      taskInfo.id,
      taskInfo.task,
      taskInfo.isDone
    );
    res.status(200).json({ message: "Tarefa editada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao editar tarefa", error });
  }
};

export const detailTaskFront = async (req, res) => {
  try {
    const taskID = req.params.id.replace(":", "");

    const details = await detailsTaskBD(taskID);

    if (!details) {
      res.status(404).json({ message: "Tarefa não encontrada" });
    }

    res.status(200).json(details);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao visualizar detalhes da tarefa", error });
  }
};

export const countTaskFront = async (req, res) => {
  try {
    const count = await countTaskBD();
    res.status(200).json(count);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao contar items na banco de dados", error });
  }
};
