import type { Filter } from '@/types/todo';

interface Props {
  filter: Filter;
  onChange: (f: Filter) => void;
  remaining: number;
  completed: number;
  onClearCompleted: () => void;
}

const OPTIONS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

export default function FilterBar({ filter, onChange, remaining, completed, onClearCompleted }: Props) {
  return (
    <div className="mb-4 flex items-center justify-between gap-2 px-1">
      <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
        {OPTIONS.map((opt) => {
          const active = filter === opt.key;
          const count = opt.key === 'active' ? remaining : opt.key === 'completed' ? completed : remaining + completed;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onChange(opt.key)}
              className={
                'rounded-lg px-3 py-1.5 text-xs font-medium transition ' +
                (active
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50')
              }
            >
              {opt.label}
              <span className={'ml-1.5 text-[10px] ' + (active ? 'text-indigo-100' : 'text-slate-400')}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
      {completed > 0 && (
        <button
          type="button"
          onClick={onClearCompleted}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-rose-600 transition"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}
