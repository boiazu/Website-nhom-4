import { useState } from 'react';
import { Search, ArrowUpRight, Plus, MapPin, Calendar, Clock } from 'lucide-react';
import { Project, Member } from '../types';

interface ActiveProjectsSectionProps {
  projects: Project[];
  members: Member[];
  onSelectProject: (projectId: string) => void;
  onSelectMember: (memberId: string) => void;
  onAddProjectClick?: () => void;
  isAdmin: boolean;
}

export function ActiveProjectsSection({
  projects,
  members,
  onSelectProject,
  onSelectMember,
  onAddProjectClick,
  isAdmin
}: ActiveProjectsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Sustainable Architecture', 'Spatial Computing', 'Civic Pavilion', 'Biophilic Interiors'];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getMember = (id: string) => members.find((m) => m.id === id);

  return (
    <section id="projects-section" className="py-12 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#cbb592] font-medium block mb-1">
              Active Commissions & Developments
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury text-neutral-100 font-normal">
              Monumental Works in Progress
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Live tracking of ongoing architectural commissions, computational interfaces, and civic installations across the Guild.
            </p>
          </div>

          {isAdmin && onAddProjectClick && (
            <button
              type="button"
              onClick={onAddProjectClick}
              className="self-start md:self-auto px-4 py-2 bg-[#1e242e] hover:bg-[#28313e] text-[#cbb592] border border-[#cbb592]/40 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              New Guild Project
            </button>
          )}
        </div>

        {/* Category Filter Tabs & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 p-1 bg-[#11141b] border border-neutral-800 rounded-xl overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#1e232e] text-[#cbb592] shadow-sm border border-[#cbb592]/30'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search commissions, patrons, or cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#11141b] border border-neutral-800 rounded-xl text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-[#cbb592] transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-[#11141b] rounded-2xl border border-neutral-800 p-8">
            <p className="text-sm text-neutral-400">No active projects match your filter selection.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs text-[#cbb592] underline hover:text-neutral-200"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => {
              const lead = getMember(project.leadMemberId);
              const contributors = project.contributorIds.map(getMember).filter(Boolean) as Member[];

              return (
                <div
                  key={project.id}
                  className="group relative flex flex-col justify-between rounded-2xl bg-[#11141b] hover:bg-[#141822] border border-neutral-800/80 hover:border-[#cbb592]/40 transition-all duration-300 overflow-hidden shadow-lg"
                >
                  {/* Image Container with Vignette */}
                  <div
                    onClick={() => onSelectProject(project.id)}
                    className="relative aspect-[16/9] w-full overflow-hidden cursor-pointer"
                  >
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11141b] via-[#11141b]/40 to-transparent" />
                    
                    {/* Status indicator top right */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-700/60 text-[11px] font-medium text-neutral-200">
                      {project.status}
                    </div>

                    <div className="absolute bottom-4 left-6 right-6">
                      <div className="flex items-center gap-2 text-xs text-[#cbb592] mb-1 font-medium">
                        <span>{project.category}</span>
                        <span aria-hidden="true" className="text-neutral-500">·</span>
                        <span>{project.location}</span>
                      </div>
                      <h3 className="text-2xl font-serif-luxury text-neutral-100 group-hover:text-[#cbb592] transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 pt-2 space-y-5">
                    <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                      {project.tagline}
                    </p>

                    {/* Progress Bar with Tabular Numbers */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-400">Commission Milestones</span>
                        <span className="font-mono tabular-nums text-[#cbb592] font-semibold">{project.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#b3996d] to-[#e4cead]"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Patron & Timeline Details (Unboxed metadata) */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400 pt-1 border-t border-neutral-800/80">
                      <div>
                        <span className="text-neutral-500">Patron:</span>{' '}
                        <span className="text-neutral-300 font-medium">{project.client}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500">Timeline:</span>{' '}
                        <span className="font-mono tabular-nums text-neutral-300">{project.year}</span>
                      </div>
                    </div>

                    {/* Team Members Roster with clickable avatars */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-neutral-400">Guild Team:</span>
                        <div className="flex items-center -space-x-2">
                          {lead && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectMember(lead.id);
                              }}
                              className="relative group/lead w-8 h-8 rounded-full overflow-hidden border-2 border-[#cbb592] hover:scale-110 transition-transform z-20 shadow-md"
                              title={`Lead: ${lead.name} (Click for profile)`}
                            >
                              <img src={lead.avatar} alt={lead.name} className="w-full h-full object-cover" />
                            </button>
                          )}
                          {contributors.map((contrib, idx) => (
                            <button
                              key={contrib.id}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectMember(contrib.id);
                              }}
                              className="relative group/contrib w-8 h-8 rounded-full overflow-hidden border border-neutral-700 hover:scale-110 transition-transform shadow-md"
                              style={{ zIndex: 10 - idx }}
                              title={`Contributor: ${contrib.name} (Click for profile)`}
                            >
                              <img src={contrib.avatar} alt={contrib.name} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectProject(project.id)}
                        className="px-3.5 py-1.5 bg-[#171b23] hover:bg-[#cbb592] text-neutral-200 hover:text-[#0b0d10] border border-neutral-700 hover:border-[#cbb592] rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
                      >
                        <span>Inspect Dossier</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
