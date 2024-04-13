import "style/src/index.css";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  deleteTodo,
  filterTodoList,
  getTodoList,
  OPTIONS,
  postTodo,
  updateTodo,
  type SearchCriteria,
  type Todo,
} from "common";
import Header from "./components/Header";
import FormInput, { FormInputHandle } from "./components/FormInput";
import TodoTable from "./components/TodoTable";
import Modal from "./components/Modal";
import FormSelect from "./components/FormSelect";
import TodoFilter from "./components/TodoFilter";
import { flushSync } from "react-dom";

function App() {
  const editTitleRef = useRef<FormInputHandle>(null);
  const [titleInput, setTitleInput] = useState<string>("");
  const [deadlineInput, setDeadlineInput] = useState<string>("");
  const [editTitleInput, setEditTitleInput] = useState<string>("");
  const [editDeadlineInput, setEditDeadlineInput] = useState<string>("");
  const [editStatusSelect, setEditStatusSelect] = useState<
    (typeof OPTIONS)[number]
  >(OPTIONS[0]);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    title: "",
    deadline: "",
    status: -1,
  });

  const init = async () => {
    const res = await getTodoList();
    setTodoList(res.data);
    setTitleInput("");
    setDeadlineInput("");
  };

  const onDestroyModal = () => {
    setEditTodo(null);
    setEditTitleInput("");
    setEditDeadlineInput("");
    setEditStatusSelect(OPTIONS[0]);
  };

  const onClickTodoRow = async (index: number) => {
    const targetTodo = todoList[index];
    const statusOptions = OPTIONS.find(option => {
      return option.id === targetTodo.status;
    });
    setEditTodo(targetTodo);
    setEditTitleInput(targetTodo.title);
    setEditDeadlineInput(targetTodo.deadline);
    setOpenEditModal(true);
    flushSync(() => {
      if (statusOptions) {
        setEditStatusSelect(statusOptions);
      }
    });

    if (editTitleRef.current) {
      editTitleRef.current.focus();
    }
  };

  const onClickTodoDelete = async (index: number) => {
    const targetTodo = todoList[index];
    if (targetTodo) {
      const deleteId = targetTodo.id;
      await deleteTodo(deleteId);
      setTodoList((prev: Todo[]) => {
        return prev.filter((todo: Todo) => {
          return todo.id !== deleteId;
        });
      });
    }
  };

  const onClickAdd = async () => {
    const result = await postTodo({
      title: titleInput,
      deadline: deadlineInput,
    });
    setTodoList((prev: Todo[]) => [...prev, result.data]);
  };

  const onClickUpdateModal = async () => {
    if (editTodo) {
      const result = await updateTodo({
        ...editTodo,
        deadline: editDeadlineInput,
        title: editTitleInput,
        status: editStatusSelect.id,
      });
      setTodoList((prev: Todo[]) => {
        return prev.map((todo: Todo) => {
          if (todo.id === result.data.id) {
            return result.data;
          }
          return todo;
        });
      });
    }
    setOpenEditModal(false);
  };

  const onClickCancelModal = () => {
    setOpenEditModal(false);
  };

  const onCriteriaChange = (searchCriteria: SearchCriteria) => {
    setSearchCriteria(searchCriteria);
  };

  const filteredTodoList = useMemo<Todo[]>(() => {
    return filterTodoList(todoList, searchCriteria);
  }, [todoList, searchCriteria]);

  const canAdd = useMemo<boolean>(
    () => titleInput.trim().length > 0 && deadlineInput.trim().length > 0,
    [titleInput, deadlineInput],
  );

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <Header />

      <main className="p-md flex flex-col gap-2">
        {/* TodoInputArea */}
        <div className="card">
          <div className="card-header">新しいTODOの追加</div>

          <div className="p-lg flex flex-col gap-2">
            <FormInput
              title="タイトル"
              id="title-input"
              value={titleInput}
              onChange={e => setTitleInput(e.currentTarget.value)}
            />
            <FormInput
              title="期日"
              inputType="date"
              id="deadline-input"
              value={deadlineInput}
              onChange={e => setDeadlineInput(e.currentTarget.value)}
            />
            <div className="mt-2">
              <button
                className="btn btn-primary w-full"
                disabled={!canAdd}
                onClick={onClickAdd}
              >
                追加
              </button>
            </div>
          </div>
        </div>

        {/* TodoDisplayArea */}
        <div className="card">
          <div className="card-header">TODOリスト</div>
          <div className="p-lg">
            <TodoFilter onCriteriaChange={onCriteriaChange} />

            <TodoTable
              onClickRow={onClickTodoRow}
              onClickDelete={onClickTodoDelete}
              todoList={filteredTodoList}
            />
          </div>
        </div>

        {/* EditModalArea  */}
        {openEditModal && (
          <Modal title={"TODOの編集"} onDestroyModal={onDestroyModal}>
            <div className="flex flex-col gap-2">
              <FormInput
                id="edit-title-input"
                title="タイトル"
                ref={editTitleRef}
                value={editTitleInput}
                onChange={e => setEditTitleInput(e.currentTarget.value)}
              />
              <FormInput
                id="edit-deadline-input"
                title="期日"
                inputType="date"
                value={editDeadlineInput}
                onChange={e => setEditDeadlineInput(e.currentTarget.value)}
              />

              <FormSelect<(typeof OPTIONS)[number]>
                id="edit-status-select"
                title="ステータス"
                options={OPTIONS}
                value={editStatusSelect}
                onChange={todo => setEditStatusSelect(todo)}
              />
            </div>
            <div className="flex w-full gap-2">
              <div className="flex-1" />
              <button
                className="btn btn-secondary"
                onClick={onClickCancelModal}
              >
                キャンセル
              </button>
              <button className="btn btn-primary" onClick={onClickUpdateModal}>
                更新
              </button>
            </div>
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;
