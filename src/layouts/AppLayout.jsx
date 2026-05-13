// Provides the shared shell with sidebar, top bar, mobile navigation, and toast.
import { I } from '../components/icons/Icons.jsx';

export default function AppLayout({ page, setPage, saved, analyzed, toast, children }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex flex-col w-[260px] shrink-0 border-r border-[var(--line)] bg-white">
        <div className="px-5 py-5 flex items-center gap-3">
          <div className="logo-mark">S</div>
          <div>
            <div className="font-semibold text-[15px] tracking-tight">SiamReply</div>
            <div className="text-[11px] text-[var(--ink-muted)] font-mono">v0.4 · beta</div>
          </div>
        </div>
        <div className="px-3 mt-2 flex flex-col gap-1">
          <div className={`nav-item ${page === 'setup' ? 'active' : ''}`} onClick={() => setPage('setup')}>
            <I.Building className="nav-icon" />
            <span>ตั้งค่าแบรนด์</span>
            {saved && <span className="ml-auto text-[10px] font-mono text-[var(--green)]">●</span>}
          </div>
          <div className={`nav-item ${page === 'inbox' ? 'active' : ''}`} onClick={() => setPage('inbox')}>
            <I.Inbox className="nav-icon" />
            <span>คอมเมนต์ลูกค้า</span>
            {analyzed.length > 0 && <span className="ml-auto text-[11px] font-mono opacity-80">{analyzed.length}</span>}
          </div>
          <div className={`nav-item ${page === 'paste' ? 'active' : ''}`} onClick={() => setPage('paste')}>
            <I.Edit className="nav-icon" />
            <span>วางคอมเมนต์เอง</span>
            <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--pink-soft)] text-[var(--pink)]">manual</span>
          </div>
          <div className={`nav-item ${page === 'dashboard' ? 'active' : ''}`} onClick={() => setPage('dashboard')}>
            <I.Chart className="nav-icon" />
            <span>แดชบอร์ด</span>
          </div>
        </div>

        <div className="mt-auto p-4">
          <div className="card-flat p-4 bg-gradient-to-br from-[#efeaff] to-[#ffeaf4] border-0">
            <div className="text-[12px] font-mono text-[var(--primary-deep)]">QUOTA</div>
            <div className="text-[13px] font-medium mt-1">ตอบไปแล้ว 184 / 500 ครั้ง</div>
            <div className="pbar mt-2"><span style={{ width: '37%', background: 'var(--primary)' }} /></div>
            <div className="text-[11px] text-[var(--ink-muted)] mt-2">รีเซ็ตวันที่ 1 มิ.ย.</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="px-5 md:px-10 py-4 border-b border-[var(--line)] bg-white/80 backdrop-blur sticky top-0 z-30 flex items-center gap-3">
          <div className="md:hidden flex items-center gap-2">
            <div className="logo-mark" style={{ width: 28, height: 28, fontSize: 13 }}>S</div>
            <div className="font-semibold tracking-tight">SiamReply</div>
          </div>
          <div className="hidden md:block">
            <div className="text-[12px] font-mono text-[var(--ink-muted)] uppercase tracking-widest">
              {page === 'setup' && '01 / brand'}
              {page === 'inbox' && '02 / inbox'}
              {page === 'paste' && '02b / paste'}
              {page === 'dashboard' && '03 / dashboard'}
            </div>
            <h1 className="text-[20px] font-semibold tracking-tight">
              {page === 'setup' && 'ตั้งค่าโปรไฟล์แบรนด์'}
              {page === 'inbox' && 'จัดการคอมเมนต์ลูกค้า'}
              {page === 'paste' && 'วางคอมเมนต์เอง'}
              {page === 'dashboard' && 'ภาพรวมการตอบกลับ'}
            </h1>
          </div>
          <div className="ml-auto" />
        </header>

        {/* Pages */}
        <div className="px-5 md:px-10 py-6 md:py-10 pb-24 md:pb-10">
          {children}
        </div>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--line)] flex z-40">
          <button className={`bottom-nav-item ${page === 'setup' ? 'active' : ''}`} onClick={() => setPage('setup')}>
            <I.Building className="w-5 h-5" /><span>แบรนด์</span>
          </button>
          <button className={`bottom-nav-item ${page === 'inbox' ? 'active' : ''}`} onClick={() => setPage('inbox')}>
            <I.Inbox className="w-5 h-5" /><span>อินบ็อกซ์</span>
          </button>
          <button className={`bottom-nav-item ${page === 'paste' ? 'active' : ''}`} onClick={() => setPage('paste')}>
            <I.Edit className="w-5 h-5" /><span>วางเอง</span>
          </button>
          <button className={`bottom-nav-item ${page === 'dashboard' ? 'active' : ''}`} onClick={() => setPage('dashboard')}>
            <I.Chart className="w-5 h-5" /><span>แดชบอร์ด</span>
          </button>
        </nav>

        {/* Toast */}
        {toast &&
        <div className="toast fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 bg-[var(--ink)] text-white text-[13px] px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg z-50">
            <I.Check className="w-4 h-4 text-[var(--green)]" />
            <span>{toast}</span>
          </div>
        }
      </main>
    </div>
  );
}
