// Lets users configure brand identity and reply tone.
import { useMemo } from 'react';
import { I } from '../components/icons/Icons.jsx';
import { CATEGORIES, PERSONAS } from '../mocks/demoData.js';
import { craftReply } from '../utils/replyEngine.js';

export default function SetupPage({ brand, setBrand, saved, setSaved, onSave }) {
  const update = (k, v) => {setBrand({ ...brand, [k]: v });setSaved(false);};
  const personaObj = PERSONAS.find((p) => p.id === brand.persona);
  const catObj = CATEGORIES.find((c) => c.id === brand.category);

  const samplePreview = useMemo(() => craftReply(
    'ขนมอร่อยมากค่ะ จะกลับมาซื้ออีกแน่นอน',
    brand.persona,
    brand.name,
    brand.category
  ), [brand.persona, brand.name, brand.category]);

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6">
      <div className="card p-6 md:p-8 fadeUp">
        <div className="flex items-center gap-2 mb-6">
          <span className="chip"><I.Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" /> ขั้นตอนที่ 1 จาก 3</span>
          <span className="text-[12px] text-[var(--ink-muted)]">ตั้งค่าครั้งเดียว ใช้ตอบคอมเมนต์ได้ตลอด</span>
        </div>

        {/* Brand name */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <div className="label"><span className="num">01</span> ชื่อแบรนด์ <span className="text-[var(--red)]">*</span></div>
            <input className="input" placeholder="เช่น พิมพ์มาดี เบเกอรี่"
            value={brand.name} onChange={(e) => update('name', e.target.value)} />
          </div>
          <div>
            <div className="label"><span className="num">02</span> ประเภทธุรกิจ</div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) =>
              <button key={c.id}
              className={`cat-chip ${brand.category === c.id ? 'active' : ''}`}
              onClick={() => update('category', c.id)}>
                  <span>{c.emoji}</span><span>{c.label}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Personality */}
        <div className="mt-7">
          <div className="label"><span className="num">03</span> บุคลิกแบรนด์ <span className="text-[var(--ink-muted)] font-normal">— เลือกโทนที่อยากให้ AI ใช้ตอบ</span></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PERSONAS.map((p) =>
            <div key={p.id}
            className={`persona ${brand.persona === p.id ? 'active' : ''}`}
            onClick={() => update('persona', p.id)}>
                <div className="flex items-center justify-between">
                  <div className="persona-emoji">{p.emoji}</div>
                  {brand.persona === p.id && <I.Check className="w-4 h-4 text-[var(--primary)]" />}
                </div>
                <div className="font-medium text-[14px]">{p.label}</div>
                <div className="text-[12px] text-[var(--ink-muted)] leading-snug">{p.sub}</div>
              </div>
            )}
          </div>
        </div>

        {/* Voice */}
        <div className="mt-7">
          <div className="label">
            <span className="num">04</span> ตัวอย่างน้ำเสียง / สไตล์การตอบ
            <span className="text-[var(--ink-muted)] font-normal">— เขียนเป็นบุลเลตหรือยกตัวอย่างประโยค</span>
          </div>
          <textarea className="textarea h-32 nice-scroll" placeholder="• คำเรียกลูกค้า เช่น 'คุณลูกค้า' หรือ 'พี่'&#10;• คำลงท้ายที่ใช้บ่อย 'ค่ะ' / 'น้า' / 'ค้าาา'&#10;• ห้ามใช้คำว่า…&#10;• ตอบสั้น 1-2 ประโยค"
          value={brand.voice} onChange={(e) => update('voice', e.target.value)} />
          <div className="flex flex-wrap gap-2 mt-3">
            {['ตอบสั้น 1-2 ประโยค', 'ใส่อีโมจิเล็กน้อย', 'เน้น call-to-action', 'ห้ามตอบเรื่องราคาส่ง'].map((t) =>
            <button key={t} className="chip hover:border-[var(--primary)] hover:text-[var(--primary)]" onClick={() => update('voice', (brand.voice ? brand.voice + '\n' : '') + '• ' + t)}>
                <I.Plus className="w-3 h-3" /> {t}
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--line)] flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-[12px] text-[var(--ink-muted)] flex items-center gap-2">
            <span className={`dot ${saved ? 'bg-[var(--green)]' : 'bg-[var(--amber)]'}`} />
            {saved ? 'บันทึกล่าสุด · 2 นาทีที่แล้ว' : 'ยังไม่ได้บันทึกการเปลี่ยนแปลง'}
          </div>
          <div className="flex gap-2">
            <button className="btn-ghost">ทดลองตอบ</button>
            <button className="btn-accent flex items-center gap-2" onClick={onSave}>
              <I.Check className="w-4 h-4" />
              บันทึกและไปต่อ
            </button>
          </div>
        </div>
      </div>

      {/* Live preview card */}
      <aside className="card p-5 fadeUp self-start lg:sticky lg:top-[88px]">
        <div className="text-[11px] font-mono text-[var(--ink-muted)] uppercase tracking-widest mb-3">live preview</div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--pink)] grid place-items-center text-white font-semibold">
            {(brand.name?.[0] || 'B').toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="font-medium truncate">{brand.name || 'ชื่อแบรนด์'}</div>
            <div className="text-[12px] text-[var(--ink-muted)] truncate">{catObj?.emoji} {catObj?.label} · {personaObj?.label}</div>
          </div>
        </div>

        <div className="rounded-xl bg-[var(--line-soft)] p-3 mb-3">
          <div className="text-[11px] font-mono text-[var(--ink-muted)] mb-1">CUSTOMER</div>
          <div className="text-[13px]">"ขนมอร่อยมากค่ะ จะกลับมาซื้ออีกแน่นอน"</div>
        </div>
        <div className="rounded-xl border border-[var(--primary)] bg-[var(--primary-soft)] p-3">
          <div className="text-[11px] font-mono text-[var(--primary-deep)] mb-1 flex items-center gap-1">
            <I.Sparkles className="w-3 h-3" /> AI REPLY
          </div>
          <div className="text-[13px] leading-relaxed">{samplePreview}</div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="card-flat py-2 px-1">
            <div className="text-[16px] font-semibold">~3 วิ</div>
            <div className="text-[10px] text-[var(--ink-muted)]">เวลาตอบ</div>
          </div>
          <div className="card-flat py-2 px-1">
            <div className="text-[16px] font-semibold">94%</div>
            <div className="text-[10px] text-[var(--ink-muted)]">ความแม่นยำ</div>
          </div>
          <div className="card-flat py-2 px-1">
            <div className="text-[16px] font-semibold">TH</div>
            <div className="text-[10px] text-[var(--ink-muted)]">ภาษา</div>
          </div>
        </div>
      </aside>
    </div>);

}
