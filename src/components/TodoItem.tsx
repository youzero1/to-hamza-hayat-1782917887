import { useEffect, useRef, useState } from 'react';
import type { Todo } from '@/types/todo';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onRemove, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const commit = () => {
    onEdit(todo.id, draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(todo.text);
    setEditing(false);
  };

  return (
    <li className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-slate-300 hover:shadow">
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.done ? 'Mark as not done' : 'Mark as done'}
        className={
          'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition ' +
          (todo.done
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-300 bg-white hover:border-indigo-400')
        }
      >
        {todo.done && (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>

      {editing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit();
            if (e.key === 'Escape') cancel();
          }}
          className="flex-1 rounded-md border border-indigo-300 bg-white px-2 py-1 text-slate-900 outline-none ring-2 ring-indigo-100"
        />
      ) : (
        <button
          type="button"
          onDoubleClick={() => setEditing(true)}
          onClick={() => onToggle(todo.id)}
          className={
            'flex-1 truncate text-left text-sm transition ' +
            (todo.done ? 'text-slate-400 line-through' : 'text-slate-800')
          }
          title="Click to toggle, double-click to edit"
        >
          {todo.text}
        </button>
      )}

      <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
        {!editing && (
          <button
            type="button"
            onClick={() => setEditing(true)}
            aria-label="Edit task"
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </button>
        )}
        <button
          type="button"
          onClick={() => onRemove(todo.id)}
          aria-label="Delete task"
          className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>
    </li>
  );
}
