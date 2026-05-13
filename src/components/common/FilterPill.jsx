// Renders a reusable count filter button for result lists.
export default function FilterPill({ active, onClick, label, count, dot }) {
  return (
    <button onClick={onClick}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-medium border transition
        ${active ? 'bg-[var(--ink)] text-white border-[var(--ink)]' : 'bg-white text-[var(--ink-soft)] border-[var(--line)] hover:border-[var(--ink-muted)]'}`}>
      {dot && <span className="dot" style={{ background: dot }} />}
      <span>{label}</span>
      <span className={`font-mono text-[11px] ${active ? 'opacity-80' : 'text-[var(--ink-muted)]'}`}>{count}</span>
    </button>);

}
