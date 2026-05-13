// Supports manual pasted comments when API fetching is unavailable.
import { useMemo, useState } from 'react';
import { I } from '../components/icons/Icons.jsx';
import CommentCard from '../components/common/CommentCard.jsx';
import FilterPill from '../components/common/FilterPill.jsx';
import { PASTE_SAMPLE, PERSONAS } from '../mocks/demoData.js';
import { classify, craftReply } from '../utils/replyEngine.js';

export default function PastePage({ brand, analyzed, setAnalyzed, onApprove }) {
  const [text, setText] = useState(PASTE_SAMPLE.join('\n'));
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const lineCount = text.split('\n').filter((l) => l.trim()).length;

  const analyze = () => {
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    if (!lines.length) return;
    setLoading(true);
    setAnalyzed(lines.map((c, i) => ({
      id: 'm_' + Date.now() + '_' + i,
      comment: c,
      sourceName: 'วางเอง',
      sourceIcon: '✎',
      sourceColor: '#7c5cff',
      author: ['ลูกค้า A', 'ลูกค้า B', 'ลูกค้า C', 'ลูกค้า D', 'ลูกค้า E', 'ลูกค้า F'][i % 6],
      time: 'manual',
      sentiment: null,
      reply: null,
      status: 'pending',
      loading: true,
    })));
    lines.forEach((c, i) => {
      setTimeout(() => {
        setAnalyzed((prev) => prev.map((it, idx) => idx === i ? {
          ...it,
          sentiment: classify(c),
          reply: craftReply(c, brand.persona, brand.name, brand.category),
          loading: false,
        } : it));
        if (i === lines.length - 1) setLoading(false);
      }, 350 + i * 280);
    });
  };

  const regenerate = (id) => {
    setAnalyzed((prev) => prev.map((it) => it.id === id ? { ...it, loading: true, status: 'pending' } : it));
    setTimeout(() => {
      setAnalyzed((prev) => prev.map((it) => it.id === id ? {
        ...it,
        loading: false,
        reply: craftReply(it.comment, brand.persona, brand.name, brand.category),
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
      <section className="card p-5 fadeUp self-start lg:sticky lg:top-[88px]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[11px] font-mono text-[var(--ink-muted)] uppercase tracking-widest flex items-center gap-1.5">
              <I.Edit className="w-3 h-3" /> paste comments
            </div>
            <div className="font-semibold text-[15px] mt-0.5">วางคอมเมนต์เอง</div>
          </div>
          <span className="chip"><span className="dot bg-[var(--primary)]" /> {lineCount} รายการ</span>
        </div>

        <div className="text-[12px] text-[var(--ink-muted)] mb-3 leading-relaxed">
          ใช้สำหรับคอมเมนต์ที่ดึงผ่าน API ไม่ได้ — ก๊อปจากที่อื่นมาวาง บรรทัดละ 1 คอมเมนต์
        </div>

        <div className="relative">
          <textarea
            className="textarea h-[300px] nice-scroll leading-relaxed"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="วางคอมเมนต์ลูกค้า บรรทัดละ 1 คอมเมนต์..." />
          <div className="absolute bottom-3 right-3 text-[11px] font-mono text-[var(--ink-muted)] bg-white px-2 py-0.5 rounded">
            {text.length} ตัวอักษร
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button className="btn-ghost text-[13px]" onClick={() => setText(PASTE_SAMPLE.join('\n'))}>โหลดตัวอย่าง</button>
          <button className="btn-ghost text-[13px]" onClick={() => setText('')}>ล้าง</button>
          <button className="btn-accent ml-auto flex items-center gap-2 disabled:opacity-50" disabled={loading || !lineCount} onClick={analyze}>
            <I.Sparkles className="w-4 h-4" />
            {loading ? 'กำลังวิเคราะห์…' : 'วิเคราะห์ด้วย AI'}
          </button>
        </div>

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

      <section className="min-w-0 fadeUp">
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
          <div className="card p-10 text-center grid-bg">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-white border border-[var(--line)] grid place-items-center mb-4">
              <I.Edit className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div className="font-semibold text-[16px]">วางคอมเมนต์ทางซ้ายเพื่อเริ่ม</div>
            <div className="text-[13px] text-[var(--ink-muted)] mt-1 max-w-md mx-auto">
              ก๊อปคอมเมนต์จากที่ไหนก็ได้มาวาง บรรทัดละ 1 คอมเมนต์ แล้วกด "วิเคราะห์ด้วย AI"
            </div>
          </div> :

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
    </div>
  );
}
