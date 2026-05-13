// Provides local sentiment classification and demo reply generation.
import { getReplyTemplates } from '../mocks/replyTemplates.js';

export function classify(comment) {
  const c = comment.toLowerCase();
  const pos = ['อร่อย', 'น่ารัก', 'ชอบ', 'ดี', 'คุ้ม', 'สวย', 'เร็ว', 'ประทับใจ', 'รัก', 'ขอบคุณ', 'พอใจ', 'สุดยอด'];
  const neg = ['ช้า', 'นาน', 'แย่ง', 'แย่', 'ผิดหวัง', 'ไม่ได้', 'ขาด', 'พัง', 'โกง', 'โกรธ', 'ไม่ดี', 'ไม่ตรง', 'แพง', 'เสีย'];
  let p = 0,n = 0;
  pos.forEach((w) => {if (c.includes(w)) p++;});
  neg.forEach((w) => {if (c.includes(w)) n++;});
  if (p > n && p > 0) return 'positive';
  if (n > p && n > 0) return 'negative';
  return 'neutral';
}

export function craftReply(comment, persona, brand, category) {
  const sentiment = classify(comment);
  const brandTag = brand ? `\u0e17\u0e35\u0e21${brand}` : '\u0e17\u0e32\u0e07\u0e23\u0e49\u0e32\u0e19';
  const templates = getReplyTemplates(brandTag);
  const options = templates[persona]?.[sentiment] || templates.friendly[sentiment];

  return options[Math.floor(Math.random() * options.length)];
}
