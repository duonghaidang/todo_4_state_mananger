import {REDUX} from '../store/types';
const initialState = {
  todoList: {},
  searchList: [],
};
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case REDUX.CLEAR_USER_DATA: {
      return initialState;
    }
    case REDUX.ADD_TODO: {
      let todoListTemp = {...state.todoList};
      todoListTemp[action.payload.id] = action.payload;
      return {
        ...state,
        todoList: todoListTemp,
      };
    }
    case REDUX.UPDATE_CHECKED: {
      let todoListTemp = {...state.todoList};
      todoListTemp[action.payload.id] = {
        ...todoListTemp[action.payload.id],
        checked: !todoListTemp[action.payload.id].checked,
      };
      return {
        ...state,
        todoList: todoListTemp,
      };
    }
    case REDUX.DELETE_TODO: {
      let todoListTemp = {...state.todoList};
      delete todoListTemp[action.payload.id];
      return {
        ...state,
        todoList: todoListTemp,
      };
    }
    case REDUX.ADD_SEARCH: {
      return {
        ...state,
        searchList: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default todoReducer;
