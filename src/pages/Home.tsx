import { useMemo, useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import type { Filter } from '@/types/todo';
import TodoInput from '@/components/TodoInput';
import FilterBar from '@/components/FilterBar';
import TodoList from '@/components/TodoList';

export default function Home() {
  const { todos, add, toggle, remove, edit, clearCompleted, toggleAll } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done);
    if (filter === 'completed') return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  const remaining = todos.filter((t) => !t.done).length;
  const completed = todos.length - remaining;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        {/* Header */}
        <header className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Tasks
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {todos.length === 0
                ? 'Nothing here yet — add your first task below.'
                : `${remaining} to do · ${completed} done`}
            </p>
          </div>
          {todos.length > 0 && (
            <button
              type="button"
              onClick={toggleAll}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
              title="Toggle all"
            >
              {remaining === 0 ? 'Uncheck all' : 'Check all'}
            </button>
          )}
        </header>

        {/* Input */}
        <TodoInput onAdd={add} />

        {/* Filter */}
        {todos.length > 0 && (
          <FilterBar
            filter={filter}
            onChange={setFilter}
            remaining={remaining}
            completed={completed}
            onClearCompleted={clearCompleted}
          />
        )}

        {/* List */}
        <TodoList
          todos={visible}
          filter={filter}
          totalCount={todos.length}
          onToggle={toggle}
          onRemove={remove}
          onEdit={edit}
        />

        <footer className="mt-12 text-center text-xs text-slate-400">
          Your tasks are saved on this device.
        </footer>
      </div>
    </div>
  );
}
