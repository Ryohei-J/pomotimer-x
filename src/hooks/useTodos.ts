"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("pomotimerx:todos", []);

  const addTodo = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const todo: Todo = {
        id: crypto.randomUUID(),
        text: trimmed,
        done: false,
        createdAt: Date.now(),
      };
      setTodos((prev) => [todo, ...prev]);
    },
    [setTodos],
  );

  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
      );
    },
    [setTodos],
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    },
    [setTodos],
  );

  return { todos, addTodo, toggleTodo, deleteTodo };
}
