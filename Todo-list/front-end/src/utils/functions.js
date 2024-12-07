import api from "../service/api";

export const formatData = (dataString) => {
  const convertData = new Date(dataString);
  const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const diaDaSemana = diasDaSemana[convertData.getUTCDay()];
  const dia = convertData.getUTCDate();
  const mes = meses[convertData.getUTCMonth()];

  const dataFormated = `Criado na ${diaDaSemana}, ${dia} de ${mes}`;

  return dataFormated;
};

export const getAllTasks = async (url, stateData, stateLoading) => {
  stateLoading(true);
  try {
    const dataTask = await api.get(`/${url}/`);

    stateData(dataTask.data);
  } catch (error) {
    console.log(`Erro: ${error.message}`);
  } finally {
    stateLoading(false);
  }
};

export const searchTasks = async (url, search, stateData, stateLoading) => {
  stateLoading(true);
  try {
    const searchTask = await api.get(`/${url}/${search}`);

    stateData(searchTask.data);
  } catch (error) {
    console.log(`Erro: ${error.message}`);
  } finally {
    stateLoading(false);
  }
};

export const getDetailsTask = async (url, stateData, id, stateLoading) => {
  stateLoading(true);
  try {
    const dataTask = await api.get(`/${url}/${id}`);

    stateData([dataTask.data]);
  } catch (error) {
    console.log(`Erro: ${error.message}`);
  } finally {
    stateLoading(false);
  }
};

export const insertTask = async (url, taskInfo, stateLoading) => {
  stateLoading(true);
  try {
    const insertTask = await api.post(`/${url}/`, {
      task: taskInfo,
    });
  } catch (error) {
    console.log(`Erro: ${error.message}`);
  } finally {
    stateLoading(false);
  }
};

export const delTask = async (url, id, stateMessage) => {
  try {
    const delTask = await api.delete(`/${url}/${id}`);

    stateMessage(delTask.data.message);
  } catch (error) {
    console.log(`Erro: ${error.message}`);
  }
};

export const editTask = async (url, id, task, isDone, stateLoading) => {
  stateLoading(true);
  try {
    const update = await api.put(`/${url}/`, {
      id,
      task,
      isDone,
    });
  } catch (error) {
    console.log(`Erro: ${error.message}`);
  } finally {
    stateLoading(false);
  }
};

export const countTask = async (url, stateDate) => {
  try {
    const counts = await api.get(`/${url}/`);

    stateDate(counts.data)
  } catch (error) {
    console.log(`Erro: ${error.message}`);
  }
};
