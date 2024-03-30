import { OPTIONS, Status, TABLE_HEADER, Todo } from "common";
import { MouseEvent, useMemo } from "react";

type StatusBadgeProps = {
  todo: Todo;
};

const StatusBadge = ({ todo }: StatusBadgeProps) => {
  const [className, text] = useMemo<[string, string]>(() => {
    switch (todo.status) {
      case Status.BeforeStart:
        return ["badge-before-start", OPTIONS[0].text];
      case Status.Working:
        return ["badge-working", OPTIONS[1].text];
      case Status.Hold:
        return ["badge-hold", OPTIONS[2].text];
      default:
        return ["badge-completed", OPTIONS[3].text];
    }
  }, [todo.status]);
  return <div className={className}>{text}</div>;
};

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
                    <StatusBadge todo={row} />
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
