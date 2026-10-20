import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'members' | 'projects' | 'contact' | 'admin') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-800/80 bg-[#080a0d] py-14 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-800/80">
          
          {/* Col 1: Wordmark & Philosophy */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-base font-serif-luxury tracking-[0.25em] text-neutral-100 uppercase block font-medium">
              Aurelia Atelier Collective
            </span>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed font-normal">
              An international fellowship of master architects, computational researchers, and acoustic acousticians dedicated to generational permanence and bioclimatic harmony.
            </p>
            <div className="pt-2 text-[11px] text-[#cbb592] flex items-center gap-3">
              <span>Zurich</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Milan</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Kyoto</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>New York</span>
            </div>
          </div>

          {/* Col 2: Navigation Mirror */}
          <div className="space-y-3">
            <span className="text-[11px] font-semibold text-neutral-200 uppercase tracking-wider block">
              Guild Navigation
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#cbb592] transition-colors"
                >
                  Overview & Philosophy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('members')}
                  className="hover:text-[#cbb592] transition-colors"
                >
                  Guild Members Roster
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="hover:text-[#cbb592] transition-colors"
                >
                  Active Commissions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#cbb592] transition-colors"
                >
                  Patron Consultation Desk
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('admin')}
                  className="hover:text-[#cbb592] transition-colors"
                >
                  Directorate Governance Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Standards */}
          <div className="space-y-3">
            <span className="text-[11px] font-semibold text-neutral-200 uppercase tracking-wider block">
              Ethical Charters
            </span>
            <ul className="space-y-2 text-neutral-500">
              <li>100% Carbon-Neutral Standard</li>
              <li>Generational Structural Joinery</li>
              <li>Sovereign Architectural Patronage</li>
              <li>Strict Patron Confidentiality</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Aurelia Atelier Architectural Guild. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={scrollToTop}
              className="text-neutral-400 hover:text-[#cbb592] transition-colors flex items-center gap-1.5"
            >
              <span>Back to Zenith</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
