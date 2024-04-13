import { TABLE_HEADER, Todo } from "common";
import { MouseEvent } from "react";
import Badge from "./Badge";

type Props = {
  todoList: Todo[];
  onClickRow: (index: number) => void;
  onClickDelete: (index: number) => void;
};

const TodoTable = ({ todoList, onClickRow, onClickDelete }: Props) => {
  const handleClickDelete = (
    e: MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.stopPropagation();
    onClickDelete(index);
  };

  return (
    <div className="table-wrapper">
      {todoList.length > 0 ? (
        <table>
          <thead>
            <tr>
              {TABLE_HEADER.map((col: string) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {todoList.map((row: Todo, index: number) => {
              return (
                <tr key={row.id} onClick={() => onClickRow(index)}>
                  <td>{row.title}</td>
                  <td>{row.deadline}</td>
                  <td>
                    <Badge status={row.status} />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={e => handleClickDelete(e, index)}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="p-lg w-full">There's no TODO.</div>
      )}
    </div>
  );
};

export default TodoTable;
