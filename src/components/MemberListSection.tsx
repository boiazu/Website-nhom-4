import { useState } from 'react';
import { Search, MapPin, ArrowUpRight, Camera, UserPlus } from 'lucide-react';
import { Member } from '../types';

interface MemberListSectionProps {
  members: Member[];
  onSelectMember: (memberId: string) => void;
  onOpenAvatarPicker: (member: Member) => void;
  onAddMemberClick?: () => void;
  isAdmin: boolean;
}

export function MemberListSection({
  members,
  onSelectMember,
  onOpenAvatarPicker,
  onAddMemberClick,
  isAdmin
}: MemberListSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const departments = ['All', 'Architecture', 'Computational Design', 'Spatial & Acoustic', 'Sustainable Materials', 'Creative Strategy'];

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      member.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || member.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <section id="members-section" className="py-12 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#cbb592] font-medium block mb-1">
              Guild Roster & Master Practitioners
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury text-neutral-100 font-normal">
              The Collective Fellowship
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Click on any member's custom avatar or name to access their comprehensive portfolio dossier, technical specializations, and direct consultation channels.
            </p>
          </div>

          {isAdmin && onAddMemberClick && (
            <button
              type="button"
              onClick={onAddMemberClick}
              className="self-start md:self-auto px-4 py-2 bg-[#1e242e] hover:bg-[#28313e] text-[#cbb592] border border-[#cbb592]/40 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Add Guild Member
            </button>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          {/* Department Filter Tabs (Functional segmented controls) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#11141b] border border-neutral-800 rounded-xl overflow-x-auto">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedDept === dept
                    ? 'bg-[#1e232e] text-[#cbb592] shadow-sm border border-[#cbb592]/30'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, discipline, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#11141b] border border-neutral-800 rounded-xl text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-[#cbb592] transition-colors"
            />
          </div>
        </div>

        {/* Members Grid */}
        {filteredMembers.length === 0 ? (
          <div className="text-center py-16 bg-[#11141b] rounded-2xl border border-neutral-800 p-8">
            <p className="text-sm text-neutral-400">No guild members match your current filter parameters.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedDept('All');
              }}
              className="mt-3 text-xs text-[#cbb592] underline hover:text-neutral-200"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#11141b] hover:bg-[#151922] border border-neutral-800/80 hover:border-[#cbb592]/40 transition-all duration-300 shadow-md"
              >
                <div>
                  {/* Top Bar with Avatar and Status */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    {/* CUSTOM AVATAR - Clickable for profile */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => onSelectMember(member.id)}
                        className="relative block w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#cbb592]/70 group-hover:border-[#cbb592] transition-all ring-2 ring-neutral-900 group-hover:scale-105 duration-300 shadow-lg text-left"
                        title={`Click to open ${member.name}'s profile`}
                      >
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>

                      {/* Quick Avatar edit badge */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenAvatarPicker(member);
                        }}
                        className="absolute -bottom-1 -right-1 p-1 bg-[#1a1f29] hover:bg-[#cbb592] text-neutral-400 hover:text-[#0b0d10] border border-neutral-700 rounded-full transition-colors"
                        title="Customize avatar portrait"
                      >
                        <Camera className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded border border-[#cbb592]/30 text-[#cbb592] bg-[#cbb592]/10 block mb-1">
                        {member.accessLevel}
                      </span>
                      <span className={`text-[11px] ${
                        member.status === 'Active' ? 'text-emerald-400' : member.status === 'In Field' ? 'text-amber-300' : 'text-neutral-400'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                  </div>

                  {/* MEMBER NAME - Clickable for profile */}
                  <div className="mb-2">
                    <button
                      type="button"
                      onClick={() => onSelectMember(member.id)}
                      className="text-left text-xl font-serif-luxury text-neutral-100 hover:text-[#cbb592] transition-colors tracking-wide block"
                      title={`Click to inspect ${member.name}'s profile`}
                    >
                      {member.name}
                    </button>
                    <p className="text-xs font-medium text-neutral-300 mt-0.5">
                      {member.title}
                    </p>
                  </div>

                  {/* Metadata (Unboxed text with · separators) */}
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-3">
                    <MapPin className="w-3 h-3 text-neutral-500" />
                    <span>{member.location}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span>{member.department}</span>
                  </div>

                  {/* Bio brief */}
                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  {/* Skills unboxed with · separators */}
                  <div className="flex flex-wrap items-center gap-1 text-[11px] text-neutral-400 mb-5">
                    {member.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="flex items-center gap-1">
                        <span className="text-neutral-300">{skill}</span>
                        {idx < 2 && <span aria-hidden="true" className="text-neutral-600">·</span>}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="text-neutral-500 text-[10px]">
                        +{member.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400">
                    {member.projectIds.length} Active {member.projectIds.length === 1 ? 'Commission' : 'Commissions'}
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => onSelectMember(member.id)}
                    className="text-xs font-medium text-[#cbb592] group-hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>View Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
