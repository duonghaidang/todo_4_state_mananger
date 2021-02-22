export default function createTodoStore() {
  return {
    todoList: {},
    addTodo(payload, onSuccess) {
      let listTodoTemp = this.todoList;
      listTodoTemp[payload.id] = payload;
      onSuccess(false);
      this.todoList = listTodoTemp;
      return true;
    },
    updateCheckedTodo(id) {
      let listTodoTemp = this.todoList;
      listTodoTemp[id] = {
        ...listTodoTemp[id],
        checked: !listTodoTemp[id].checked,
      };
      this.todoList = listTodoTemp;
    },
    deleteTodo(id) {
      let listTodoTemp = this.todoList;
      delete listTodoTemp[id];
      this.todoList = listTodoTemp;
    },
  };
}
