import { useState } from 'react';
import { X, Calendar, MapPin, Building, CheckCircle2, Circle, ArrowUpRight, ShieldCheck, Plus, MessageSquare } from 'lucide-react';
import { Project, Member } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  members: Member[];
  isOpen: boolean;
  onClose: () => void;
  onSelectMember: (memberId: string) => void;
  onInquireAboutProject: (projectId: string) => void;
  isAdmin: boolean;
  onToggleMilestone?: (projectId: string, milestoneId: string) => void;
  onAddProjectUpdate?: (projectId: string, note: string, author: string) => void;
}

export function ProjectDetailModal({
  project,
  members,
  isOpen,
  onClose,
  onSelectMember,
  onInquireAboutProject,
  isAdmin,
  onToggleMilestone,
  onAddProjectUpdate
}: ProjectDetailModalProps) {
  const [newUpdateText, setNewUpdateText] = useState('');
  const [updateAuthor, setUpdateAuthor] = useState('');

  if (!isOpen || !project) return null;

  const leadMember = members.find((m) => m.id === project.leadMemberId);
  const contributorMembers = members.filter((m) => project.contributorIds.includes(m.id));

  const handlePostUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpdateText.trim()) return;
    const author = updateAuthor || (leadMember ? leadMember.name : 'Directorate');
    if (onAddProjectUpdate) {
      onAddProjectUpdate(project.id, newUpdateText.trim(), author);
      setNewUpdateText('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-8 bg-[#101318] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-200">
        
        {/* Cover Hero with Scrim */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101318] via-[#101318]/60 to-black/30" />
          
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-neutral-300 hover:text-neutral-100 bg-black/50 hover:bg-black/80 rounded-full transition-colors backdrop-blur-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Floating project title overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-300 mb-2">
              <span className="text-[#cbb592] font-medium">{project.category}</span>
              <span aria-hidden="true" className="text-neutral-500">·</span>
              <span>{project.location}</span>
              <span aria-hidden="true" className="text-neutral-500">·</span>
              <span>Timeline: {project.year}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-luxury text-neutral-100 tracking-wide">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Progress & Quick Metrics Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#141820] border border-neutral-800">
            <div className="w-full sm:w-1/2 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400 font-medium">Commission Progression</span>
                <span className="font-mono tabular-nums text-[#cbb592] font-semibold">{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#b3996d] to-[#e4cead] transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-right">
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Status</span>
                <span className="text-xs font-medium text-neutral-200">{project.status}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onInquireAboutProject(project.id);
                }}
                className="px-4 py-2 bg-[#cbb592] hover:bg-[#dbcaaf] text-[#0b0d10] font-medium text-xs rounded-lg transition-colors shadow-sm shrink-0 flex items-center gap-1.5"
              >
                Inquire on Commission
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Architectural Narrative & Milestones */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 mb-2">
                  Project Dossier & Architectural Intent
                </h4>
                <p className="text-sm leading-relaxed text-neutral-300">
                  {project.description}
                </p>
                <p className="text-xs text-neutral-400 mt-2 italic font-serif-luxury text-base">
                  "{project.tagline}"
                </p>
              </div>

              {/* Milestones Checklist */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
                    Execution Milestones & Schedule
                  </h4>
                  {isAdmin && (
                    <span className="text-[10px] text-[#cbb592] flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Click circle to toggle status
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {project.milestones.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => {
                        if (isAdmin && onToggleMilestone) {
                          onToggleMilestone(project.id, m.id);
                        }
                      }}
                      className={`flex items-start justify-between p-3 rounded-lg border transition-colors ${
                        m.completed
                          ? 'bg-[#12161d] border-neutral-800 text-neutral-300'
                          : 'bg-[#141922] border-neutral-800/80 text-neutral-200'
                      } ${isAdmin ? 'cursor-pointer hover:border-[#cbb592]/50' : ''}`}
                    >
                      <div className="flex items-start gap-2.5">
                        {m.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                        )}
                        <span className={`text-xs ${m.completed ? 'line-through text-neutral-400' : 'font-medium'}`}>
                          {m.title}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono tabular-nums text-neutral-400 shrink-0 ml-4">
                        {m.dueDate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables List */}
              {project.deliverables && project.deliverables.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 mb-2">
                    Key Commission Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {project.deliverables.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-[#12151c] border border-neutral-800 text-neutral-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#cbb592]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Updates / Architectural Logs */}
              <div>
                <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 mb-3 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chronological Project Updates ({project.updates.length})
                </h4>

                <div className="space-y-3">
                  {project.updates.map((upd) => (
                    <div key={upd.id} className="p-3.5 rounded-xl bg-[#12161f] border border-neutral-800/80">
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
                        <span className="font-medium text-neutral-300">{upd.author}</span>
                        <span className="font-mono tabular-nums text-neutral-500">{upd.date}</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {upd.note}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Quick Add Update Form (Available for Admin or quick testing) */}
                {isAdmin && (
                  <form onSubmit={handlePostUpdate} className="mt-4 p-3.5 rounded-xl bg-[#151922] border border-[#cbb592]/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#cbb592] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Post Director / Architect Update
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Author name (e.g. Elena Vance)"
                        value={updateAuthor}
                        onChange={(e) => setUpdateAuthor(e.target.value)}
                        className="px-2.5 py-1.5 text-xs bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-[#cbb592]"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Enter live milestone dispatch, deflection test note, or fabrication update..."
                      value={newUpdateText}
                      onChange={(e) => setNewUpdateText(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-[#cbb592]"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-[#cbb592] hover:bg-[#dbcaaf] text-[#0b0d10] font-medium text-xs rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Publish Update
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Col: Client & Guild Team */}
            <div className="space-y-6">
              {/* Client & Commission Card */}
              <div className="p-4 rounded-xl bg-[#13171e] border border-neutral-800 space-y-3">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
                  Patron & Governance
                </h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Patron / Client</span>
                    <span className="font-medium text-neutral-200">{project.client}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Location</span>
                    <span className="text-neutral-300">{project.location}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Typology</span>
                    <span className="text-neutral-300">{project.category}</span>
                  </div>
                </div>
              </div>

              {/* Lead Architect */}
              {leadMember && (
                <div className="p-4 rounded-xl bg-[#13171e] border border-neutral-800 space-y-3">
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
                    Lead Commission Architect
                  </h4>
                  <div
                    onClick={() => {
                      onClose();
                      onSelectMember(leadMember.id);
                    }}
                    className="group flex items-center gap-3 p-2 rounded-lg bg-[#0f1217] hover:bg-[#181d26] border border-neutral-800 hover:border-[#cbb592]/50 transition-all cursor-pointer"
                  >
                    <img
                      src={leadMember.avatar}
                      alt={leadMember.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#cbb592]/60 shrink-0"
                    />
                    <div className="overflow-hidden">
                      <h5 className="text-xs font-medium text-neutral-100 group-hover:text-[#cbb592] transition-colors truncate">
                        {leadMember.name}
                      </h5>
                      <p className="text-[11px] text-neutral-400 truncate">{leadMember.title}</p>
                      <span className="text-[10px] text-[#cbb592] flex items-center gap-1 mt-0.5">
                        Inspect Profile <ArrowUpRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Contributing Guild Members */}
              {contributorMembers.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
                    Contributing Specialists ({contributorMembers.length})
                  </h4>
                  <div className="space-y-2">
                    {contributorMembers.map((contributor) => (
                      <div
                        key={contributor.id}
                        onClick={() => {
                          onClose();
                          onSelectMember(contributor.id);
                        }}
                        className="group flex items-center gap-2.5 p-2 rounded-lg bg-[#13171e] hover:bg-[#1a202a] border border-neutral-800/80 hover:border-[#cbb592]/40 transition-all cursor-pointer"
                      >
                        <img
                          src={contributor.avatar}
                          alt={contributor.name}
                          className="w-8 h-8 rounded-lg object-cover border border-neutral-700 shrink-0"
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-medium text-neutral-200 group-hover:text-[#cbb592] transition-colors truncate">
                            {contributor.name}
                          </p>
                          <p className="text-[10px] text-neutral-400 truncate">{contributor.department}</p>
                        </div>
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
  );
}
