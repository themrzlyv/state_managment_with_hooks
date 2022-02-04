import { useContext } from "react";
import { AppContext } from "./App";

const TodoList: React.FC = () => {
  const { initialState } = useContext(AppContext);
  console.log(initialState);
  return (
    <>
      <ul>
        {initialState.todos.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
