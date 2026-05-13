// Fetches demo connected-source comments and turns them into reviewable replies.
import { useMemo, useState } from 'react';
import { I } from '../components/icons/Icons.jsx';
import CommentCard from '../components/common/CommentCard.jsx';
import EmptyResults from '../components/common/EmptyResults.jsx';
import FilterPill from '../components/common/FilterPill.jsx';
import { CONNECTORS, PERSONAS } from '../mocks/demoData.js';
import { classify, craftReply } from '../utils/replyEngine.js';

export default function InboxPage({ brand, analyzed, setAnalyzed, onApprove }) {
  const [sources, setSources] = useState({ facebook: true, instagram: true, tiktok: true, shopee: true, lazada: false, line: false });
  const [range, setRange] = useState('24h'); // 1h|24h|7d|30d
  const [keyword, setKeyword] = useState('');
  const [pulled, setPulled] = useState(null); // null | array of comments fetched from API
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // all|positive|negative|neutral|pending

  const activeConnectors = CONNECTORS.filter((c) => sources[c.id] && c.status === 'connected');
  const totalAvailable = activeConnectors.reduce((a, c) => a + c.count, 0);
  const lineCount = pulled ? pulled.length : 0;

  const fetchFromApi = () => {
    if (!activeConnectors.length) return;
    setFetching(true);
    setPulled(null);
    setTimeout(() => {
      const all = [];
      activeConnectors.forEach((c) => {
        c.sample.forEach((txt, i) => {
          all.push({ source: c.id, sourceName: c.name, color: c.color, icon: c.icon, text: txt, author: ['น้องบี', 'พี่กิ๊ก', 'คุณสน', 'คุณแมว', 'พี่พล', 'คุณวี', 'คุณดาว', 'พี่อ้อย'][(all.length + i) % 8], time: ['2 นาที', '8 นาที', '15 นาที', '32 นาที', '1 ชม.', '2 ชม.'][all.length % 6] });
        });
      });
      setPulled(all);
      setFetching(false);
    }, 1100);
  };

  const togglePulled = (idx) => {
    setPulled((prev) => prev.map((p, i) => i === idx ? { ...p, excluded: !p.excluded } : p));
  };

  const analyze = () => {
    if (!pulled) return;
    const items = pulled.filter((p) => !p.excluded);
    if (!items.length) return;
    setLoading(true);
    setAnalyzed(items.map((it, i) => ({
      id: 'p_' + Date.now() + '_' + i,
      comment: it.text,
      source: it.source,
      sourceName: it.sourceName,
      sourceColor: it.color,
      sourceIcon: it.icon,
      author: it.author,
      time: it.time,
      sentiment: null,
      reply: null,
      status: 'pending', // pending|approved|edited
      loading: true
    })));
    // simulate streaming results
    items.forEach((it, i) => {
      setTimeout(() => {
        setAnalyzed((prev) => prev.map((p, idx) => idx === i ? {
          ...p,
          sentiment: classify(it.text),
          reply: craftReply(it.text, brand.persona, brand.name, brand.category),
          loading: false
        } : p));
        if (i === items.length - 1) setLoading(false);
      }, 350 + i * 280);
    });
  };

  const regenerate = (id) => {
    setAnalyzed((prev) => prev.map((it) => it.id === id ? { ...it, loading: true, status: 'pending' } : it));
    setTimeout(() => {
      setAnalyzed((prev) => prev.map((it) => it.id === id ? {
        ...it,
        loading: false,
        reply: craftReply(it.comment, brand.persona, brand.name, brand.category)
      } : it));
    }, 800);
  };

  const updateReply = (id, reply) => {
    setAnalyzed((prev) => prev.map((it) => it.id === id ? { ...it, reply, status: it.status === 'approved' ? 'approved' : 'edited' } : it));
  };

  const approve = (id) => {
    const item = analyzed.find((it) => it.id === id);
    if (!item) return;
    setAnalyzed((prev) => prev.map((it) => it.id === id ? { ...it, status: 'approved' } : it));
    onApprove(item);
  };

  const removeItem = (id) => setAnalyzed((prev) => prev.filter((it) => it.id !== id));

  const counts = useMemo(() => {
    const c = { all: analyzed.length, positive: 0, negative: 0, neutral: 0, pending: 0, approved: 0 };
    analyzed.forEach((it) => {
      if (it.sentiment) c[it.sentiment]++;
      if (it.status === 'pending' || it.status === 'edited') c.pending++;
      if (it.status === 'approved') c.approved++;
    });
    return c;
  }, [analyzed]);

  const filtered = useMemo(() => {
    if (filter === 'all') return analyzed;
    if (filter === 'pending') return analyzed.filter((it) => it.status !== 'approved');
    return analyzed.filter((it) => it.sentiment === filter);
  }, [analyzed, filter]);

  return (
    <div className="grid lg:grid-cols-[420px_1fr] gap-6">
      {/* Input column — Connected sources */}
      <section className="card p-5 fadeUp self-start lg:sticky lg:top-[88px]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] font-mono text-[var(--ink-muted)] uppercase tracking-widest flex items-center gap-1.5">
              <I.Plug className="w-3 h-3" /> connected sources
            </div>
            <div className="font-semibold text-[15px] mt-0.5">ดึงคอมเมนต์อัตโนมัติ</div>
          </div>
          <span className="chip"><span className="dot bg-[var(--green)] animate-pulse" /> live</span>
        </div>

        {/* Source list */}
        <div className="flex flex-col gap-2">
          {CONNECTORS.map((c) => {
            const on = sources[c.id] && c.status === 'connected';
            const dis = c.status !== 'connected';
            return (
              <div key={c.id}
              className={`source-row ${on ? 'on' : ''} ${dis ? 'dis' : ''}`}
              onClick={() => !dis && setSources((s) => ({ ...s, [c.id]: !s[c.id] }))}>
                <div className="src-icon" style={{ background: c.color }}>{c.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[13px] truncate">{c.name}</span>
                    {c.status === 'syncing' && <span className="chip" style={{ padding: '2px 7px', fontSize: 11 }}><span className="dot bg-[var(--amber)] animate-pulse" />syncing</span>}
                    {c.status === 'disconnected' && <span className="chip" style={{ padding: '2px 7px', fontSize: 11, color: 'var(--ink-muted)' }}>ยังไม่เชื่อม</span>}
                  </div>
                  <div className="text-[11px] text-[var(--ink-muted)] truncate font-mono">{c.sub} · {c.last}</div>
                </div>
                {!dis &&
                <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono text-[var(--ink-muted)]">{c.count} ใหม่</span>
                    <span className={`switch ${on ? 'on' : ''}`}><span className="knob" /></span>
                  </div>
                }
                {dis &&
                <button className="text-[12px] font-medium text-[var(--primary)]" onClick={(e) => e.stopPropagation()}>+ เชื่อม</button>
                }
              </div>);

          })}
        </div>

        {/* Filters */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div>
            <div className="label text-[11px] mb-1.5">ช่วงเวลา</div>
            <div className="seg w-full">
              {[['1h', '1 ชม.'], ['24h', '24 ชม.'], ['7d', '7 วัน'], ['30d', '30 วัน']].map(([k, l]) =>
              <button key={k} className={`flex-1 ${range === k ? 'active' : ''}`} onClick={() => setRange(k)}>{l}</button>
              )}
            </div>
          </div>
          <div>
            <div className="label text-[11px] mb-1.5">คีย์เวิร์ด (ไม่บังคับ)</div>
            <input className="input" style={{ padding: '7px 12px', fontSize: 13 }} placeholder="เช่น ของไม่ตรง, ส่งช้า…" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          </div>
        </div>

        <button className="btn-accent mt-4 w-full flex items-center justify-center gap-2 disabled:opacity-50"
        disabled={fetching || !activeConnectors.length}
        onClick={fetchFromApi}>
          {fetching ?
          <><I.Refresh className="w-4 h-4 animate-spin" /> กำลังดึงข้อมูล…</> :

          <><I.Download className="w-4 h-4" /> ดึงคอมเมนต์ {totalAvailable > 0 && `(${totalAvailable})`}</>
          }
        </button>

        {/* Pulled preview */}
        {pulled &&
        <div className="mt-4 pt-4 border-t border-[var(--line)] fadeUp">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] font-mono text-[var(--ink-muted)] uppercase">{pulled.length} ดึงสำเร็จ</div>
              <button className="text-[11px] font-medium text-[var(--primary)]" onClick={() => setPulled(null)}>ล้าง</button>
            </div>
            <div className="flex flex-col gap-1.5 max-h-[180px] overflow-auto nice-scroll pr-1">
              {pulled.map((p, i) =>
            <label key={i} className={`flex items-start gap-2 p-2 rounded-lg cursor-pointer text-[12px] ${p.excluded ? 'opacity-40' : ''} hover:bg-[var(--line-soft)]`}>
                  <input type="checkbox" checked={!p.excluded} onChange={() => togglePulled(i)} className="mt-0.5 accent-[var(--primary)]" />
                  <span className="src-icon shrink-0" style={{ background: p.color, width: 18, height: 18, fontSize: 9 }}>{p.icon}</span>
                  <span className="line-clamp-1 flex-1">{p.text}</span>
                </label>
            )}
            </div>
            <button className="btn-primary mt-3 w-full flex items-center justify-center gap-2 disabled:opacity-50"
          disabled={loading || !pulled.filter((p) => !p.excluded).length}
          onClick={analyze}>
              <I.Sparkles className="w-4 h-4" />
              {loading ? 'กำลังวิเคราะห์…' : `วิเคราะห์ด้วย AI (${pulled.filter((p) => !p.excluded).length})`}
            </button>
          </div>
        }

        <div className="mt-5 pt-5 border-t border-[var(--line)]">
          <div className="text-[11px] font-mono text-[var(--ink-muted)] uppercase mb-2">ใช้บุคลิก</div>
          <div className="flex items-center gap-3">
            <div className="persona-emoji">{PERSONAS.find((p) => p.id === brand.persona)?.emoji}</div>
            <div className="text-[13px]">
              <div className="font-medium">{PERSONAS.find((p) => p.id === brand.persona)?.label}</div>
              <div className="text-[var(--ink-muted)] text-[12px]">{brand.name}</div>
            </div>
            <button className="ml-auto text-[12px] text-[var(--primary)] font-medium">เปลี่ยน →</button>
          </div>
        </div>
      </section>

      {/* Results column */}
      <section className="min-w-0 fadeUp">
        {/* Filter bar */}
        {analyzed.length > 0 &&
        <div className="mb-4 flex items-center gap-2 flex-wrap">
            <FilterPill active={filter === 'all'} onClick={() => setFilter('all')} label="ทั้งหมด" count={counts.all} />
            <FilterPill active={filter === 'positive'} onClick={() => setFilter('positive')} label="บวก" count={counts.positive} dot="var(--green)" />
            <FilterPill active={filter === 'negative'} onClick={() => setFilter('negative')} label="ลบ" count={counts.negative} dot="var(--red)" />
            <FilterPill active={filter === 'neutral'} onClick={() => setFilter('neutral')} label="กลาง" count={counts.neutral} dot="var(--amber)" />
            <FilterPill active={filter === 'pending'} onClick={() => setFilter('pending')} label="รออนุมัติ" count={counts.pending} />
            <div className="ml-auto text-[12px] text-[var(--ink-muted)] flex items-center gap-2">
              อนุมัติแล้ว <span className="font-mono text-[var(--ink)]">{counts.approved}/{counts.all}</span>
            </div>
          </div>
        }

        {analyzed.length === 0 ?
        <EmptyResults /> :

        <div className="flex flex-col gap-3">
            {filtered.map((item, idx) =>
          <CommentCard key={item.id} item={item} idx={idx}
          onRegenerate={() => regenerate(item.id)}
          onUpdate={(r) => updateReply(item.id, r)}
          onApprove={() => approve(item.id)}
          onRemove={() => removeItem(item.id)} />
          )}
            {filtered.length === 0 &&
          <div className="card p-8 text-center text-[var(--ink-muted)] text-[13px]">
                ไม่พบคอมเมนต์ในตัวกรองนี้
              </div>
          }
          </div>
        }
      </section>
    </div>);

}
