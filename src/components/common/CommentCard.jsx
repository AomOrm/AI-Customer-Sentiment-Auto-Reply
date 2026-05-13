// Renders one analyzed customer comment and its editable AI reply.
import { useEffect, useState } from 'react';
import { I } from '../icons/Icons.jsx';

export default function CommentCard({ item, idx, onRegenerate, onUpdate, onApprove, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item.reply || '');
  useEffect(() => {setDraft(item.reply || '');}, [item.reply]);

  const sentMap = {
    positive: { cls: 'badge-pos', dot: 'var(--green)', label: 'บวก', emoji: '🟢' },
    negative: { cls: 'badge-neg', dot: 'var(--red)', label: 'ลบ', emoji: '🔴' },
    neutral: { cls: 'badge-neu', dot: 'var(--amber)', label: 'กลาง', emoji: '🟡' }
  };
  const sm = item.sentiment ? sentMap[item.sentiment] : null;

  return (
    <div className="card p-5 fadeUp">
      <div className="flex items-start gap-3">
        <div className="font-mono text-[11px] text-[var(--ink-muted)] mt-0.5 w-7 shrink-0">#{String(idx + 1).padStart(2, '0')}</div>

        <div className="flex-1 min-w-0">
          {/* original comment */}
          <div className="flex items-start gap-3">
            <div className="avatar shrink-0" style={{ width: 32, height: 32, fontSize: 12 }}>{['น', 'ก', 'ส', 'ม', 'พ', 'ว'][idx % 6]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-[13px]">ลูกค้า{item.author || ['น้องบี', 'พี่กิ๊ก', 'คุณสน', 'คุณแมว', 'พี่พล', 'คุณวี'][idx % 6]}</span>
                {item.sourceIcon &&
                <span className="chip" style={{ padding: '2px 8px', fontSize: 11, gap: 4 }}>
                    <span className="src-icon" style={{ background: item.sourceColor, width: 14, height: 14, fontSize: 8, borderRadius: 4 }}>{item.sourceIcon}</span>
                    {item.sourceName}
                  </span>
                }
                <span className="text-[11px] text-[var(--ink-muted)] font-mono">· {item.time || 2 + idx + ' นาทีที่แล้ว'}</span>
                {sm && <span className={`badge ${sm.cls} ml-auto`}><span className="dot" style={{ background: sm.dot }} />{sm.label}</span>}
                {item.loading && <span className="badge badge-neu ml-auto"><span className="dot bg-[var(--amber)] animate-pulse" />กำลังวิเคราะห์</span>}
              </div>
              <div className="mt-1 text-[14px] leading-relaxed">{item.comment}</div>
            </div>
          </div>

          {/* divider */}
          <div className="my-4 flex items-center gap-3 text-[var(--ink-muted)]">
            <div className="flex-1 h-px bg-[var(--line)]" />
            <span className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-1">
              <I.Sparkles className="w-3 h-3 text-[var(--primary)]" /> AI suggested reply
            </span>
            <div className="flex-1 h-px bg-[var(--line)]" />
          </div>

          {/* AI reply */}
          {item.loading ?
          <div className="space-y-2">
              <div className="skel h-3 w-3/4" />
              <div className="skel h-3 w-1/2" />
              <div className="skel h-3 w-2/3" />
            </div> :

          <>
              {editing ?
            <textarea
              autoFocus
              className="textarea min-h-[90px]"
              value={draft}
              onChange={(e) => setDraft(e.target.value)} /> :

            <div className="rounded-xl bg-[var(--primary-soft)] border border-[var(--line-soft)] p-4 text-[14px] leading-relaxed">
                  {item.reply}
                </div>
            }

              <div className="mt-3 flex items-center gap-2 flex-wrap">
                {item.status === 'edited' && !editing &&
              <span className="chip"><span className="dot bg-[var(--amber)]" /> แก้ไขแล้ว</span>
              }
                {item.status === 'approved' &&
              <span className="chip" style={{ background: 'var(--green-soft)', color: 'var(--green)', borderColor: 'transparent' }}>
                    <I.Check className="w-3 h-3" /> ส่งคำตอบแล้ว
                  </span>
              }

                <div className="ml-auto flex items-center gap-2">
                  {editing ?
                <>
                      <button className="btn-ghost text-[13px]" onClick={() => {setDraft(item.reply);setEditing(false);}}>ยกเลิก</button>
                      <button className="btn-primary text-[13px]" onClick={() => {onUpdate(draft);setEditing(false);}}>บันทึก</button>
                    </> :

                <>
                      <button className="text-[var(--ink-muted)] hover:text-[var(--ink)] p-2" title="ลบ" onClick={onRemove}><I.Trash className="w-4 h-4" /></button>
                      <button className="text-[var(--ink-muted)] hover:text-[var(--ink)] p-2" title="คัดลอก" onClick={() => navigator.clipboard?.writeText(item.reply || '')}><I.Copy className="w-4 h-4" /></button>
                      <button className="btn-ghost text-[13px] flex items-center gap-1.5" onClick={onRegenerate}><I.Refresh className="w-4 h-4" /> สร้างใหม่</button>
                      <button className="btn-ghost text-[13px] flex items-center gap-1.5" onClick={() => setEditing(true)}><I.Edit className="w-4 h-4" /> แก้ไข</button>
                      {item.status !== 'approved' &&
                  <button className="btn-accent text-[13px] flex items-center gap-1.5" onClick={onApprove}>
                          <I.Check className="w-4 h-4" /> อนุมัติ &amp; ส่ง
                        </button>
                  }
                    </>
                }
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </div>);

}
