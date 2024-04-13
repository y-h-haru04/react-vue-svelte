const fs = require("fs").promises;

const DATA_PATH = "./src/data.json";

const uniqid = () => {
  return (
    new Date().getTime().toString(16) +
    Math.floor(1000 * Math.random()).toString(16)
  );
};

const getJsonData = async () => {
  const content = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(content);
};

const putJsonData = async data => {
  const strData = JSON.stringify(data);
  await fs.writeFile(DATA_PATH, strData);
  return true;
};

const handleAsync = asyncFunction => {
  try {
    return asyncFunction;
  } catch (e) {
    console.error(e);
    res.json({ data: null, msg: JSON.stringify(e) });
  }
};

const getAllTodo = handleAsync(async (_, res) => {
  const data = await getJsonData();
  res.json({ data });
});

const updateSingleTodo = handleAsync(async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const content = await getJsonData();
  const newContent = content.map(data => {
    if (data.id === id) {
      return {
        ...data,
        ...newData,
      };
    }
    return data;
  });
  await putJsonData(newContent);
  res.json({ data: newData });
});

const addTodo = handleAsync(async (req, res) => {
  const _newData = req.body;
  const newData = {
    ..._newData,
    id: uniqid(),
    status: 0,
  };
  const content = await getJsonData();
  const newContent = [...content, newData];
  await putJsonData(newContent);
  res.json({ data: newData });
});

const deleteTodo = handleAsync(async (req, res) => {
  const id = req.params.id;
  const content = await getJsonData();
  const newContent = content.filter(data => data.id !== id);
  putJsonData(newContent);
  res.json({ data: null });
});

module.exports = function (app) {
  app.route("/todos").get(getAllTodo).post(addTodo).delete(deleteTodo);
  app.route("/todos/:id").put(updateSingleTodo).delete(deleteTodo);
};
