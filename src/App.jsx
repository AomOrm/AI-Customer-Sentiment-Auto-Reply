// Coordinates application state and selects the active page.
import { useState } from 'react';
import AppLayout from './layouts/AppLayout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import InboxPage from './pages/InboxPage.jsx';
import PastePage from './pages/PastePage.jsx';
import SetupPage from './pages/SetupPage.jsx';
import { APPROVED_DEMO } from './mocks/demoData.js';

export default function App() {
  const [page, setPage] = useState('setup');
  const [brand, setBrand] = useState({
    name: 'พิมพ์มาดี เบเกอรี่',
    persona: 'cute',
    category: 'cafe',
    voice: 'พูดน่ารักสดใส ลงท้าย "ค่าาา" "น้าาา" เรียกลูกค้าว่า "คุณลูกค้า" ตอบเร็ว ใส่อีโมจิดอกไม้/หัวใจ เน้นเชิญชวนให้กลับมาซื้อซ้ำ'
  });
  const [saved, setSaved] = useState(true);
  const [analyzed, setAnalyzed] = useState([]);
  const [approved, setApproved] = useState(APPROVED_DEMO);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const approveItem = (item) => {
    setApproved((prev) => [{
      id: 'n_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      date: new Date().toLocaleString('th-TH', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }),
      comment: item.comment,
      sentiment: item.sentiment,
      reply: item.reply,
    }, ...prev]);
    showToast('ส่งคำตอบแล้ว — บันทึกในแดชบอร์ด');
  };

  return (
    <AppLayout page={page} setPage={setPage} saved={saved} analyzed={analyzed} toast={toast}>
      {page === 'setup' && (
        <SetupPage
          brand={brand}
          setBrand={setBrand}
          saved={saved}
          setSaved={setSaved}
          onSave={() => {
            setSaved(true);
            showToast('บันทึกโปรไฟล์แบรนด์แล้ว');
            setPage('inbox');
          }}
        />
      )}
      {page === 'inbox' && (
        <InboxPage brand={brand} analyzed={analyzed} setAnalyzed={setAnalyzed} onApprove={approveItem} />
      )}
      {page === 'paste' && (
        <PastePage brand={brand} analyzed={analyzed} setAnalyzed={setAnalyzed} onApprove={approveItem} />
      )}
      {page === 'dashboard' && (
        <DashboardPage approved={approved} setApproved={setApproved} onExport={() => showToast('ดาวน์โหลด replies.csv แล้ว')} />
      )}
    </AppLayout>
  );
}
