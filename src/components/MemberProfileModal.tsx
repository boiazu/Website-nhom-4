import { useState } from 'react';
import { X, Mail, MapPin, Phone, Award, Compass, Sparkles, ExternalLink, ShieldCheck, Camera } from 'lucide-react';
import { Member, Project } from '../types';
import { AvatarPickerModal } from './AvatarPickerModal';

interface MemberProfileModalProps {
  member: Member | null;
  projects: Project[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
  onInquireWithMember: (memberId: string) => void;
  onUpdateAvatar: (memberId: string, newAvatar: string) => void;
  isAdmin: boolean;
  onOpenAdminEdit?: (member: Member) => void;
}

export function MemberProfileModal({
  member,
  projects,
  isOpen,
  onClose,
  onSelectProject,
  onInquireWithMember,
  onUpdateAvatar,
  isAdmin,
  onOpenAdminEdit
}: MemberProfileModalProps) {
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);

  if (!isOpen || !member) return null;

  const memberProjects = projects.filter(
    (p) => p.leadMemberId === member.id || p.contributorIds.includes(member.id)
  );

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <div className="relative w-full max-w-3xl my-8 bg-[#101318] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-200">
          
          {/* Header Ambient Banner */}
          <div className="relative h-36 bg-gradient-to-r from-[#171b22] via-[#212732] to-[#14181f] border-b border-neutral-800">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#cbb592_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-4 right-4 flex items-center gap-2">
              {isAdmin && onOpenAdminEdit && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAdminEdit(member);
                  }}
                  className="px-3 py-1.5 text-xs font-medium bg-[#1e242e] hover:bg-[#28313e] text-[#cbb592] border border-[#cbb592]/30 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Edit In Admin
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-neutral-100 bg-black/40 hover:bg-black/60 rounded-full transition-colors backdrop-blur-sm"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="px-6 sm:px-8 pb-8 pt-0">
            {/* Avatar & Core Metadata Lockup */}
            <div className="relative -mt-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 border-b border-neutral-800/80">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                {/* Custom Avatar with frame & customization button */}
                <div className="relative group shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#cbb592] shadow-xl bg-neutral-900 ring-4 ring-[#101318]">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Avatar customizer trigger button */}
                  <button
                    type="button"
                    onClick={() => setIsAvatarPickerOpen(true)}
                    className="absolute -bottom-2 -right-2 p-2 bg-[#1b2029] hover:bg-[#cbb592] text-neutral-300 hover:text-[#0b0d10] border border-neutral-700 hover:border-[#cbb592] rounded-full shadow-lg transition-all"
                    title="Customize avatar"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-2xl sm:text-3xl font-serif-luxury tracking-wide text-neutral-100">
                      {member.name}
                    </h2>
                    <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded border border-[#cbb592]/30 text-[#cbb592] bg-[#cbb592]/10">
                      {member.accessLevel}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-neutral-300">
                    {member.title}
                  </p>
                  
                  {/* Unboxed Metadata with · separator */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      {member.location}
                    </span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span className="text-neutral-400">
                      Guild Member since {member.joinDate}
                    </span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span className={member.status === 'Active' ? 'text-emerald-400' : member.status === 'In Field' ? 'text-amber-300' : 'text-neutral-400'}>
                      Status: {member.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Inquire Action */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onInquireWithMember(member.id);
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#cbb592] hover:bg-[#dbcaaf] text-[#0b0d10] font-medium text-xs rounded-lg transition-colors shadow-sm shrink-0 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Inquire with {member.name.split(' ')[0]}
              </button>
            </div>

            {/* Body Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
              {/* Left Column: Narrative & Philosophy */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 mb-2">
                    Architectural Narrative & Bio
                  </h4>
                  <p className="text-sm leading-relaxed text-neutral-300 font-normal">
                    {member.extendedBio || member.bio}
                  </p>
                </div>

                {member.quote && (
                  <div className="p-4 rounded-xl bg-[#14181f] border border-neutral-800">
                    <p className="text-sm italic font-serif-luxury text-neutral-200 leading-relaxed">
                      "{member.quote}"
                    </p>
                    <span className="block text-[11px] text-[#cbb592] mt-2 font-medium">
                      — {member.name}, Design Manifesto
                    </span>
                  </div>
                )}

                {/* Active Projects Showcase */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
                      Active Guild Commissions ({memberProjects.length})
                    </h4>
                  </div>

                  {memberProjects.length === 0 ? (
                    <p className="text-xs text-neutral-500 italic">No public active projects assigned currently.</p>
                  ) : (
                    <div className="space-y-3">
                      {memberProjects.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            onClose();
                            onSelectProject(p.id);
                          }}
                          className="group flex items-center justify-between p-3 rounded-xl bg-[#141820] hover:bg-[#1a202a] border border-neutral-800/80 hover:border-[#cbb592]/50 transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={p.coverImage}
                              alt={p.title}
                              className="w-12 h-12 rounded-lg object-cover border border-neutral-700/60 shrink-0"
                            />
                            <div>
                              <h5 className="text-sm font-medium text-neutral-100 group-hover:text-[#cbb592] transition-colors">
                                {p.title}
                              </h5>
                              <div className="flex items-center gap-2 text-xs text-neutral-400">
                                <span>{p.category}</span>
                                <span aria-hidden="true" className="text-neutral-600">·</span>
                                <span className="font-mono tabular-nums text-neutral-300">{p.progress}% Completed</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-neutral-400 group-hover:text-neutral-200">
                            <span>Inspect</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Skills, Contact & Accolades */}
              <div className="space-y-6">
                {/* Contact Card */}
                <div className="p-4 rounded-xl bg-[#13171e] border border-neutral-800/80 space-y-3">
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
                    Contact Channels
                  </h4>
                  <div className="space-y-2 text-xs">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-neutral-300 hover:text-[#cbb592] transition-colors truncate"
                    >
                      <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </a>
                    {member.phone && (
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                        <span>{member.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-neutral-300">
                      <Compass className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <span>{member.department} Division</span>
                    </div>
                  </div>
                </div>

                {/* Specialized Disciplines (Zero-pill text styling) */}
                <div>
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 mb-2">
                    Core Technical Disciplines
                  </h4>
                  <div className="divide-y divide-neutral-800/80 text-xs text-neutral-300">
                    {member.skills.map((skill, index) => (
                      <div key={index} className="py-1.5 flex items-center justify-between">
                        <span>{skill}</span>
                        <span className="text-[10px] text-neutral-500 font-mono">Expert</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Honors & Accolades */}
                {member.achievements && member.achievements.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 mb-2">
                      Honors & Appointments
                    </h4>
                    <div className="space-y-2.5">
                      {member.achievements.map((ach, idx) => (
                        <div key={idx} className="text-xs border-l border-[#cbb592]/40 pl-2.5 py-0.5">
                          <span className="font-mono tabular-nums text-[10px] text-[#cbb592] block">
                            {ach.year}
                          </span>
                          <span className="font-medium text-neutral-200 block">
                            {ach.title}
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            {ach.organization}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Customization Modal */}
      <AvatarPickerModal
        isOpen={isAvatarPickerOpen}
        onClose={() => setIsAvatarPickerOpen(false)}
        currentAvatar={member.avatar}
        memberName={member.name}
        onSelectAvatar={(newAvatar) => {
          onUpdateAvatar(member.id, newAvatar);
        }}
      />
    </>
  );
}
