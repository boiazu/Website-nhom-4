import { Shield, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeView: 'home' | 'members' | 'projects' | 'contact' | 'admin';
  setActiveView: (view: 'home' | 'members' | 'projects' | 'contact' | 'admin') => void;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  inquiryCount: number;
}

export function Navbar({
  activeView,
  setActiveView,
  isAdmin,
  setIsAdmin,
  inquiryCount
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0d10]/90 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveView('home')}
          className="text-lg font-serif-luxury tracking-[0.22em] text-neutral-100 hover:text-[#cbb592] uppercase transition-colors whitespace-nowrap shrink-0 font-medium"
        >
          NHOM 4 - 12S
        </button>

        {/* Zone 2: 4–5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-neutral-300">
          <button
            onClick={() => setActiveView('home')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-100 ${
              activeView === 'home' ? 'text-[#cbb592]' : 'text-neutral-400'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveView('members')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-100 ${
              activeView === 'members' ? 'text-[#cbb592]' : 'text-neutral-400'
            }`}
          >
            Guild Members
          </button>
          <button
            onClick={() => setActiveView('projects')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-100 ${
              activeView === 'projects' ? 'text-[#cbb592]' : 'text-neutral-400'
            }`}
          >
            Active Projects
          </button>
          <button
            onClick={() => setActiveView('contact')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-100 ${
              activeView === 'contact' ? 'text-[#cbb592]' : 'text-neutral-400'
            }`}
          >
            Inquiries
          </button>
          <button
            onClick={() => setActiveView('admin')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#cbb592] flex items-center gap-1.5 ${
              activeView === 'admin' ? 'text-[#cbb592]' : 'text-neutral-400'
            }`}
          >
            <span>Admin Portal</span>
            {inquiryCount > 0 && (
              <span className="font-mono tabular-nums text-[10px] text-[#cbb592] bg-[#cbb592]/15 px-1 rounded">
                {inquiryCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveView('contact')}
            className="px-4 py-2 text-xs font-medium text-[#0b0d10] bg-[#cbb592] hover:bg-[#dfcbac] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Commission Guild
          </button>
        </div>

      </div>
    </header>
  );
}
