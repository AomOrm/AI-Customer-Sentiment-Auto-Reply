// Displays a compact metric card for dashboard totals.
export default function StatCard({ label, value, sub, dot }) {
  return (
    <div className="stat">
      <div className="text-[12px] text-[var(--ink-muted)] flex items-center gap-2">
        {dot && <span className="dot" style={{ background: dot }} />}
        {label}
      </div>
      <div className="text-[28px] font-semibold tracking-tight leading-none mt-1">{value}</div>
      <div className="text-[11px] text-[var(--ink-muted)] font-mono">{sub}</div>
    </div>);

}
