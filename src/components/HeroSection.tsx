import { ArrowRight, Compass, Shield } from 'lucide-react';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onExploreMembers: () => void;
  onCommission: () => void;
}

export function HeroSection({
  onExploreProjects,
  onExploreMembers,
  onCommission
}: HeroSectionProps) {
  return (
    <section className="relative pt-6 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Hero Container */}
        <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-[#0e1116] shadow-2xl">
          {/* Background Image with Measured Luxury Contrast Scrim */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
            <img
              src="/src/assets/images/atelier_hero_space_1792481270417.jpg"
              alt="Aurelia Architecture Atelier Studio"
              className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out"
              referrerPolicy="no-referrer"
            />
            {/* Measured contrast scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-[#0b0d10]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d10]/80 via-transparent to-transparent" />

            {/* Foreground Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14 max-w-3xl">
              <span className="text-xs uppercase tracking-[0.25em] text-[#cbb592] font-medium mb-3 block">
                Atelier Aurelia · Zurich · Milan · Kyoto
              </span>
              
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif-luxury text-neutral-100 font-normal leading-tight tracking-tight [text-wrap:balance] mb-4">
                Monumental Form. Computational Precision.
              </h1>
              
              <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed mb-6 max-w-2xl">
                A selective guild of master architects, material scientists, and spatial acousticians designing climate-resilient sanctuaries, kinetic pavilions, and computational interfaces.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onExploreProjects}
                  className="px-5 py-2.5 bg-[#cbb592] hover:bg-[#dbcaaf] text-[#0b0d10] font-medium text-xs rounded-lg transition-colors shadow-sm flex items-center gap-2"
                >
                  View Active Projects
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={onExploreMembers}
                  className="px-5 py-2.5 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 hover:border-neutral-500 font-medium text-xs rounded-lg transition-colors backdrop-blur-sm"
                >
                  Meet Guild Members
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column KPI strip below hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-5 rounded-2xl bg-[#11141a] border border-neutral-800/80">
            <span className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-[#cbb592] block">
              24
            </span>
            <span className="text-xs font-medium text-neutral-300 block mt-1">
              Active Commissions
            </span>
            <span className="text-[11px] text-neutral-500 block mt-0.5">
              Across 8 sovereign jurisdictions
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#11141a] border border-neutral-800/80">
            <span className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-[#cbb592] block">
              18
            </span>
            <span className="text-xs font-medium text-neutral-300 block mt-1">
              International Laureates
            </span>
            <span className="text-[11px] text-neutral-500 block mt-0.5">
              Biennale & RIBA recognitions
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#11141a] border border-neutral-800/80">
            <span className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-[#cbb592] block">
              100%
            </span>
            <span className="text-xs font-medium text-neutral-300 block mt-1">
              Carbon-Negative Goal
            </span>
            <span className="text-[11px] text-neutral-500 block mt-0.5">
              Cultivated timber & bio-composites
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#11141a] border border-neutral-800/80">
            <span className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-[#cbb592] block">
              14 Yrs
            </span>
            <span className="text-xs font-medium text-neutral-300 block mt-1">
              Guild Heritage
            </span>
            <span className="text-[11px] text-neutral-500 block mt-0.5">
              Generational structural mastery
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
