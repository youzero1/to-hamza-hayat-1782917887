import type { Filter, Todo } from '@/types/todo';
import TodoItem from '@/components/TodoItem';

interface Props {
  todos: Todo[];
  filter: Filter;
  totalCount: number;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export default function TodoList({ todos, filter, totalCount, onToggle, onRemove, onEdit }: Props) {
  if (totalCount === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white/50 p-10 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-700">No tasks yet</p>
        <p className="mt-1 text-xs text-slate-500">Type a task above and press Add to get started.</p>
      </div>
    );
  }

  if (todos.length === 0) {
    const msg =
      filter === 'active'
        ? "You're all caught up! No active tasks."
        : filter === 'completed'
          ? 'Nothing completed yet.'
          : 'No tasks to show.';
    return (
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
        {msg}
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
