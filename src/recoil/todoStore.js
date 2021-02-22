import {atom, selector} from 'recoil';
import {asyncStorageEffect} from './asyncStorageEffect';
import {TYPE_RECOIL} from './type';

export const todoList = atom({
  key: TYPE_RECOIL.TODO_LIST,
  default: {},
  effects_UNSTABLE: [asyncStorageEffect(TYPE_RECOIL.TODO_LIST)],
});

export const addTodo = selector({
  key: TYPE_RECOIL.ADD_LIST,
  get: ({get}) => {
    const listTodo = get(todoList);
    return listTodo;
  },
  set: ({set, get}, newValue) => {
    let objectTemp = {...get(todoList)};
    objectTemp[newValue.id] = newValue;
    set(todoList, objectTemp);
  },
});

export const updateCheckedTodo = selector({
  key: TYPE_RECOIL.UPDATE_CHECKED_TODO,
  get: ({get}) => {
    const listTodoTemp = get(todoList);
    return listTodoTemp;
  },
  set: ({set, get}, id) => {
    let objectTemp = {...get(todoList)};
    objectTemp[id] = {
      ...objectTemp[id],
      checked: !objectTemp[id].checked,
    };
    set(todoList, objectTemp);
  },
});

export const deleteTodoRecoil = selector({
  key: TYPE_RECOIL.DELETE_TODO,
  get: ({get}) => {
    const listTodoTemp = get(todoList);
    return listTodoTemp;
  },
  set: ({set, get}, id) => {
    let objectTemp = {...get(todoList)};
    delete objectTemp[id];
    set(todoList, objectTemp);
  },
});
