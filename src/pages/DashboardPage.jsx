// Shows approved reply history and sentiment summary metrics.
import { useState } from 'react';
import { I } from '../components/icons/Icons.jsx';
import DistRow from '../components/common/DistRow.jsx';
import StatCard from '../components/common/StatCard.jsx';

export default function DashboardPage({ approved, setApproved, onExport }) {
  const [range, setRange] = useState('7d');

  const total = approved.length;
  const counts = approved.reduce((acc, it) => {acc[it.sentiment]++;return acc;}, { positive: 0, negative: 0, neutral: 0 });
  const pct = (n) => total ? Math.round(n / total * 100) : 0;

  // mock weekly chart data
  const weekly = [
  { d: 'จ', pos: 4, neu: 1, neg: 1 },
  { d: 'อ', pos: 6, neu: 2, neg: 0 },
  { d: 'พ', pos: 3, neu: 2, neg: 2 },
  { d: 'พฤ', pos: 7, neu: 3, neg: 1 },
  { d: 'ศ', pos: 9, neu: 1, neg: 3 },
  { d: 'ส', pos: 12, neu: 2, neg: 2 },
  { d: 'อา', pos: 8, neu: 4, neg: 1 }];

  const maxBar = Math.max(...weekly.map((w) => w.pos + w.neu + w.neg));

  const removeRow = (id) => setApproved((prev) => prev.filter((a) => a.id !== id));

  const exportCsv = () => {
    const escapeCell = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
    const headers = ['date', 'comment', 'sentiment', 'reply'];
    const rows = approved.map((row) => [
      row.date,
      row.comment,
      row.sentiment,
      row.reply,
    ]);
    const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(',')).join('\r\n');
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `siamreply-approved-replies-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onExport?.();
  };

  return (
    <div className="flex flex-col gap-6 fadeUp">
      {/* Range selector */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="seg">
          {['24h', '7d', '30d', 'ทั้งหมด'].map((r, i) => {
            const id = ['24h', '7d', '30d', 'all'][i];
            return <button key={id} className={range === id ? 'active' : ''} onClick={() => setRange(id)}>{r}</button>;
          })}
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-primary flex items-center gap-2 text-[13px]" onClick={exportCsv} disabled={!approved.length}><I.Download className="w-4 h-4" /> Export CSV</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="คอมเมนต์ทั้งหมด" value={total} sub="+12% จากสัปดาห์ที่แล้ว" />
        <StatCard label="บวก" value={`${pct(counts.positive)}%`} sub={`${counts.positive} ข้อความ`} dot="var(--green)" />
        <StatCard label="ลบ" value={`${pct(counts.negative)}%`} sub={`${counts.negative} ข้อความ`} dot="var(--red)" />
        <StatCard label="กลาง" value={`${pct(counts.neutral)}%`} sub={`${counts.neutral} ข้อความ`} dot="var(--amber)" />
      </div>

      {/* Sentiment distribution + chart */}
      <div className="grid lg:grid-cols-[1fr_1fr] gap-3">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[11px] font-mono text-[var(--ink-muted)] uppercase tracking-widest">distribution</div>
              <div className="font-semibold text-[15px] mt-0.5">สัดส่วน Sentiment</div>
            </div>
            <span className="chip">7 วันล่าสุด</span>
          </div>
          {/* stacked bar */}
          <div className="flex h-3 rounded-full overflow-hidden mb-4">
            <div style={{ width: `${pct(counts.positive)}%`, background: 'var(--green)' }} />
            <div style={{ width: `${pct(counts.neutral)}%`, background: 'var(--amber)' }} />
            <div style={{ width: `${pct(counts.negative)}%`, background: 'var(--red)' }} />
          </div>
          <div className="grid grid-cols-3 gap-3 text-[13px]">
            <DistRow color="var(--green)" label="บวก" pct={pct(counts.positive)} n={counts.positive} />
            <DistRow color="var(--amber)" label="กลาง" pct={pct(counts.neutral)} n={counts.neutral} />
            <DistRow color="var(--red)" label="ลบ" pct={pct(counts.negative)} n={counts.negative} />
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[11px] font-mono text-[var(--ink-muted)] uppercase tracking-widest">activity</div>
              <div className="font-semibold text-[15px] mt-0.5">ปริมาณคอมเมนต์รายวัน</div>
            </div>
            <div className="flex items-center gap-3 text-[12px] text-[var(--ink-muted)]">
              <span className="flex items-center gap-1"><span className="dot bg-[var(--green)]" />บวก</span>
              <span className="flex items-center gap-1"><span className="dot bg-[var(--amber)]" />กลาง</span>
              <span className="flex items-center gap-1"><span className="dot bg-[var(--red)]" />ลบ</span>
            </div>
          </div>
          <div className="flex items-end gap-3 h-[160px]">
            {weekly.map((w, i) => {
              const tot = w.pos + w.neu + w.neg;
              const h = tot / maxBar * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full max-w-[36px] flex flex-col-reverse rounded-md overflow-hidden bg-[var(--line-soft)]" style={{ height: `${h}%`, minHeight: 6 }}>
                    <div style={{ height: `${w.pos / tot * 100}%`, background: 'var(--green)' }} />
                    <div style={{ height: `${w.neu / tot * 100}%`, background: 'var(--amber)' }} />
                    <div style={{ height: `${w.neg / tot * 100}%`, background: 'var(--red)' }} />
                  </div>
                  <div className="text-[11px] font-mono text-[var(--ink-muted)]">{w.d}</div>
                </div>);

            })}
          </div>
        </div>
      </div>

      {/* Approved replies table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-[var(--line)] gap-3 flex-wrap">
          <div>
            <div className="text-[11px] font-mono text-[var(--ink-muted)] uppercase tracking-widest">approved replies</div>
            <div className="font-semibold text-[15px] mt-0.5">คำตอบที่ส่งไปแล้ว</div>
          </div>
        </div>
        <div className="overflow-x-auto nice-scroll">
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: 130 }}>เวลา</th>
                <th>คอมเมนต์</th>
                <th style={{ width: 110 }}>Sentiment</th>
                <th>คำตอบที่ส่ง</th>
                <th style={{ width: 60 }}></th>
              </tr>
            </thead>
            <tbody>
              {approved.map((row) => {
                const sm = { positive: { c: 'badge-pos', l: 'บวก' }, negative: { c: 'badge-neg', l: 'ลบ' }, neutral: { c: 'badge-neu', l: 'กลาง' } }[row.sentiment];
                return (
                  <tr key={row.id}>
                    <td className="font-mono text-[12px] text-[var(--ink-muted)] whitespace-nowrap">{row.date}</td>
                    <td className="max-w-[280px]"><div className="line-clamp-2">{row.comment}</div></td>
                    <td><span className={`badge ${sm.c}`}>{sm.l}</span></td>
                    <td className="max-w-[420px]"><div className="line-clamp-2 text-[var(--ink-soft)]">{row.reply}</div></td>
                    <td>
                      <button onClick={() => removeRow(row.id)} className="text-[var(--ink-muted)] hover:text-[var(--red)] p-1.5"><I.Trash className="w-4 h-4" /></button>
                    </td>
                  </tr>);

              })}
              {approved.length === 0 &&
              <tr><td colSpan="5" className="text-center text-[var(--ink-muted)] py-12">ยังไม่มีข้อมูล</td></tr>
              }
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--line)] text-[12px] text-[var(--ink-muted)]">
          <div>แสดง {approved.length} รายการ</div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost text-[12px] py-1.5">ก่อนหน้า</button>
            <span className="font-mono">1 / 1</span>
            <button className="btn-ghost text-[12px] py-1.5">ถัดไป</button>
          </div>
        </div>
      </div>
    </div>);

}
