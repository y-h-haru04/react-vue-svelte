import type {
  GetTodoListRes,
  PostTodoRes,
  SearchCriteria,
  Todo,
  TodoInput,
} from "./@types";

const API_BASE_URL = "http://localhost:8000/todos";

export const getTodoList = async (): Promise<GetTodoListRes> => {
  const res = await fetch(API_BASE_URL);
  return res.json();
};

export const postTodo = async (data: TodoInput): Promise<PostTodoRes> => {
  const res = await fetch(API_BASE_URL, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateTodo = async (data: Todo): Promise<PostTodoRes> => {
  const res = await fetch(`${API_BASE_URL}/${data.id}`, {
    mode: "cors",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTodo = async (id: string) => {
  return fetch(`${API_BASE_URL}/${id}`, {
    mode: "cors",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const filterTodoList = (
  todoList: Todo[],
  searchCriteria: SearchCriteria,
): Todo[] => {
  const result = todoList.filter((todo: Todo) => {
    let isTitleMatch = true;
    let isDeadlineMatch = true;
    let isStatusMatch = true;
    if (searchCriteria.title.length > 0) {
      isTitleMatch = todo.title.includes(searchCriteria.title);
    }
    if (searchCriteria.deadline.trim().length > 0) {
      isDeadlineMatch = todo.deadline === searchCriteria.deadline;
    }
    if (searchCriteria.status !== null) {
      isStatusMatch = todo.status === searchCriteria.status;
    }
    return isTitleMatch && isDeadlineMatch && isStatusMatch;
  });
  return result;
};

export const withTimeout = (
  timeoutId: NodeJS.Timeout | undefined,
  callback: () => void,
) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    callback();
  }, 500);
};
