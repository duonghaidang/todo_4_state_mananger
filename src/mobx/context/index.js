import React, {createContext, useContext} from 'react';
import createTodoStore from '../store';

const TodoListContext = createContext(null);

export const TodoListProvider = ({children}) => {
  const todoStore = createTodoStore();

  return (
    <TodoListContext.Provider value={todoStore}>
      {children}
    </TodoListContext.Provider>
  );
};
export const useTodoStore = () => {
  return useContext(TodoListContext);
};
