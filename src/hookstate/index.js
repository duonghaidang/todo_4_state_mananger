import {createState, useState} from '@hookstate/core';
export const todoListHook = createState({});
export const useTodoHookState = () => {
  return useState(todoListHook);
};
