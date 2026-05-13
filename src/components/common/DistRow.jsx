// Displays one sentiment distribution value in the dashboard.
export default function DistRow({ color, label, pct, n }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-[12px] text-[var(--ink-muted)]">
        <span className="dot" style={{ background: color }} /> {label}
      </div>
      <div className="text-[18px] font-semibold mt-1">{pct}%</div>
      <div className="text-[11px] font-mono text-[var(--ink-muted)]">{n} ข้อความ</div>
    </div>);

}
