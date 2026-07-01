import { useCallback, useEffect, useState } from 'react';
import type { Todo } from '@/types/todo';

const STORAGE_KEY = 'todos.v1';

function load(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function newId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => load());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      /* ignore quota errors */
    }
  }, [todos]);

  const add = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      { id: newId(), text: trimmed, done: false, createdAt: Date.now() },
      ...prev,
    ]);
  }, []);

  const toggle = useCallback((id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }, []);

  const remove = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const edit = useCallback((id: string, text: string) => {
    const trimmed = text.trim();
    setTodos((prev) =>
      prev.flatMap((t) => {
        if (t.id !== id) return [t];
        if (!trimmed) return [];
        return [{ ...t, text: trimmed }];
      })
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.done));
  }, []);

  const toggleAll = useCallback(() => {
    setTodos((prev) => {
      const allDone = prev.length > 0 && prev.every((t) => t.done);
      return prev.map((t) => ({ ...t, done: !allDone }));
    });
  }, []);

  return { todos, add, toggle, remove, edit, clearCompleted, toggleAll };
}
