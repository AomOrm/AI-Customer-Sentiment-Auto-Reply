// Shows the empty state for fetched comment analysis results.
import { I } from '../icons/Icons.jsx';

export default function EmptyResults() {
  return (
    <div className="card p-10 text-center grid-bg">
      <div className="mx-auto w-14 h-14 rounded-2xl bg-white border border-[var(--line)] grid place-items-center mb-4">
        <I.Sparkles className="w-6 h-6 text-[var(--primary)]" />
      </div>
      <div className="font-semibold text-[16px]">พร้อมดึงคอมเมนต์จาก API</div>
      <div className="text-[13px] text-[var(--ink-muted)] mt-1 max-w-md mx-auto">
        เลือกช่องทางซ้าย แล้วกด "ดึงคอมเมนต์" ระบบจะดึงคอมเมนต์ล่าสุดจาก Facebook, Instagram, TikTok, Shopee และ LINE OA มารวมไว้ที่เดียว จากนั้น AI จะแยกอารมณ์และร่างคำตอบให้ร่างคำตอบในโทนเสียงของแบรนด์ให้
      </div>
      <div className="mt-5 flex gap-2 justify-center text-[12px] text-[var(--ink-muted)]">
        <span className="chip"><span className="dot bg-[var(--green)]" /> ตรวจ sentiment</span>
        <span className="chip"><span className="dot bg-[var(--primary)]" /> ร่างคำตอบ</span>
        <span className="chip"><span className="dot bg-[var(--pink)]" /> แก้ไขก่อนส่ง</span>
      </div>
    </div>);

}
