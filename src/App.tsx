import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import TodoList from "./TodoList";

interface iState {
  todos: any[];
}

const initialState: iState = {
  todos: []
};

interface setTodo {
  type: "SET_TODO";
  payload: any;
}

type appDispatch = setTodo;

const appReducer = (state: iState, action: appDispatch): iState => {
  switch (action.type) {
    case "SET_TODO":
      return {
        ...state,
        todos: [...state.todos, ...action.payload]
      };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  initialState: iState;
  dispatch: React.Dispatch<appDispatch>;
}>({ initialState, dispatch: () => null });

const App: React.FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data)
      .then((todos) => dispatch({ type: "SET_TODO", payload: todos }));
  }, []);

  return (
    <AppContext.Provider value={{ initialState: state, dispatch }}>
      <TodoList />
    </AppContext.Provider>
  );
};

export default App;
