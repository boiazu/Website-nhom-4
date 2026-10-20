import { useState } from 'react';
import {
  Users,
  Briefcase,
  Inbox,
  UserPlus,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Shield,
  ShieldCheck,
  Camera,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Sliders
} from 'lucide-react';
import { Member, Project, Inquiry, MemberRoleAccess, MemberStatus, ProjectStatus } from '../types';
import { AvatarPickerModal } from './AvatarPickerModal';

interface AdminDashboardProps {
  members: Member[];
  projects: Project[];
  inquiries: Inquiry[];
  onUpdateMember: (member: Member) => void;
  onAddMember: (member: Member) => void;
  onDeleteMember: (memberId: string) => void;
  onUpdateProject: (project: Project) => void;
  onAddProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onAddProjectUpdate: (projectId: string, note: string, author: string) => void;
  onUpdateInquiryStatus: (inquiryId: string, status: Inquiry['status'], notes?: string) => void;
  onResetToDemo: () => void;
  onSelectMemberForProfile: (memberId: string) => void;
  onSelectProjectForDetail: (projectId: string) => void;
}

export function AdminDashboard({
  members,
  projects,
  inquiries,
  onUpdateMember,
  onAddMember,
  onDeleteMember,
  onUpdateProject,
  onAddProject,
  onDeleteProject,
  onAddProjectUpdate,
  onUpdateInquiryStatus,
  onResetToDemo,
  onSelectMemberForProfile,
  onSelectProjectForDetail
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'members' | 'projects' | 'inquiries'>('members');

  // Member editing modal state
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [avatarPickerTarget, setAvatarPickerTarget] = useState<{ memberId?: string; isNew?: boolean } | null>(null);

  // New member form fields
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberTitle, setNewMemberTitle] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<MemberRoleAccess>('Associate');
  const [newMemberStatus, setNewMemberStatus] = useState<MemberStatus>('Active');
  const [newMemberDept, setNewMemberDept] = useState<Member['department']>('Architecture');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberLocation, setNewMemberLocation] = useState('Zurich, Switzerland');
  const [newMemberBio, setNewMemberBio] = useState('');
  const [newMemberSkills, setNewMemberSkills] = useState('Parametric Joinery, Sustainable Materials');
  const [newMemberAvatar, setNewMemberAvatar] = useState('/src/assets/images/member_avatar_elena_1792481273066.jpg');

  // Project update dispatch state
  const [selectedProjectIdForUpdate, setSelectedProjectIdForUpdate] = useState<string>(projects[0]?.id || '');
  const [updateAuthor, setUpdateAuthor] = useState('');
  const [updateNote, setUpdateNote] = useState('');

  // New project modal state
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectTagline, setNewProjectTagline] = useState('');
  const [newProjectCategory, setNewProjectCategory] = useState<Project['category']>('Sustainable Architecture');
  const [newProjectClient, setNewProjectClient] = useState('');
  const [newProjectLocation, setNewProjectLocation] = useState('');
  const [newProjectYear, setNewProjectYear] = useState('2026–2027');
  const [newProjectLeadId, setNewProjectLeadId] = useState(members[0]?.id || '');
  const [newProjectCover, setNewProjectCover] = useState('/src/assets/images/project_solarium_1792481271537.jpg');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  // Inquiry quick filter
  const [inquiryFilter, setInquiryFilter] = useState<'all' | Inquiry['status']>('all');

  // Handle adding new member
  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberEmail.trim()) return;

    const created: Member = {
      id: `mem-${Date.now()}`,
      name: newMemberName.trim(),
      title: newMemberTitle.trim() || 'Guild Associate Architect',
      accessLevel: newMemberRole,
      status: newMemberStatus,
      avatar: newMemberAvatar,
      department: newMemberDept,
      location: newMemberLocation.trim(),
      email: newMemberEmail.trim(),
      bio: newMemberBio.trim() || 'Engaged in monumental architectural synthesis and material research.',
      extendedBio: newMemberBio.trim(),
      skills: newMemberSkills.split(',').map((s) => s.trim()).filter(Boolean),
      projectIds: [],
      achievements: [],
      quote: 'Architecture is the crystallisation of geometry into permanence.',
      joinDate: 'October 2026'
    };

    onAddMember(created);
    setIsAddMemberOpen(false);
    // Reset form
    setNewMemberName('');
    setNewMemberTitle('');
    setNewMemberEmail('');
    setNewMemberBio('');
  };

  // Handle saving edited member
  const handleSaveMemberEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    onUpdateMember(editingMember);
    setEditingMember(null);
  };

  // Handle creating project
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim() || !newProjectClient.trim()) return;

    const created: Project = {
      id: `proj-${Date.now()}`,
      title: newProjectTitle.trim(),
      tagline: newProjectTagline.trim() || 'A bespoke monumental development by the Guild.',
      category: newProjectCategory,
      status: 'Active Commission',
      progress: 25,
      leadMemberId: newProjectLeadId,
      contributorIds: [],
      location: newProjectLocation.trim() || 'Milan, Italy',
      client: newProjectClient.trim(),
      year: newProjectYear,
      coverImage: newProjectCover,
      description: newProjectDesc.trim() || 'Comprehensive architectural development executed to the highest sustainability benchmarks.',
      milestones: [
        { id: `m-${Date.now()}-1`, title: 'Feasibility & Environmental Permitting', completed: true, dueDate: 'Completed' },
        { id: `m-${Date.now()}-2`, title: 'Schematic Design & Material Selection', completed: false, dueDate: 'Target: Q4 2026' },
        { id: `m-${Date.now()}-3`, title: 'Robotic Fabrication & Site Assembly', completed: false, dueDate: 'Target: Q2 2027' }
      ],
      updates: [
        { id: `u-${Date.now()}`, date: 'October 2026', author: 'Directorate', note: 'Project initialized and chartered under Guild stewardship.' }
      ],
      deliverables: ['Schematic Architectural Dossier', 'Carbon-Neutral Certification', 'Executive 3D Spatial Model']
    };

    onAddProject(created);
    setIsAddProjectOpen(false);
    setNewProjectTitle('');
    setNewProjectClient('');
  };

  // Handle quick update dispatch
  const handlePublishUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectIdForUpdate || !updateNote.trim()) return;
    const author = updateAuthor.trim() || 'Guild Directorate';
    onAddProjectUpdate(selectedProjectIdForUpdate, updateNote.trim(), author);
    setUpdateNote('');
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryFilter === 'all') return true;
    return inq.status === inquiryFilter;
  });

  return (
    <section className="py-10 border-t border-neutral-800/80 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Governance Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#101319] border border-neutral-800 mb-8 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#cbb592]/10 border border-[#cbb592] flex items-center justify-center text-[#cbb592]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-serif-luxury text-neutral-100 font-medium">
                  Guild Directorate Governance Console
                </h2>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Director Access Active
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Manage user access credentials, dispatch live project updates, and review client briefs.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onResetToDemo}
            className="self-start md:self-auto px-3.5 py-1.5 text-xs text-neutral-400 hover:text-neutral-100 bg-[#161a22] hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-colors flex items-center gap-1.5"
            title="Reset to default initial data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Curated Defaults
          </button>
        </div>

        {/* Tab Navigation (Segmented Controls) */}
        <div className="flex items-center gap-2 mb-8 p-1 bg-[#101319] border border-neutral-800 rounded-xl w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('members')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'members'
                ? 'bg-[#1b212c] text-[#cbb592] border border-[#cbb592]/30 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Access & Member Management</span>
            <span className="font-mono tabular-nums text-[10px] bg-neutral-800 px-1.5 py-0.2 rounded">
              {members.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-[#1b212c] text-[#cbb592] border border-[#cbb592]/30 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Active Project Updates & Milestones</span>
            <span className="font-mono tabular-nums text-[10px] bg-neutral-800 px-1.5 py-0.2 rounded">
              {projects.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'bg-[#1b212c] text-[#cbb592] border border-[#cbb592]/30 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Patron Inquiries Desk</span>
            <span className="font-mono tabular-nums text-[10px] bg-[#cbb592]/20 text-[#cbb592] px-1.5 py-0.2 rounded">
              {inquiries.length}
            </span>
          </button>
        </div>

        {/* TAB 1: MEMBERS & ACCESS MANAGEMENT */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif-luxury text-neutral-100">
                  Guild Roster & Role Access Control
                </h3>
                <p className="text-xs text-neutral-400">
                  Configure access levels, edit profile biographies, and manage member custom avatars.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddMemberOpen(true)}
                className="px-4 py-2 bg-[#cbb592] hover:bg-[#dbcaaf] text-[#0b0d10] font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Enroll New Member
              </button>
            </div>

            {/* Members Table */}
            <div className="rounded-2xl bg-[#101319] border border-neutral-800 overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-[#151922] text-neutral-400 text-[11px] uppercase tracking-wider border-b border-neutral-800">
                    <tr>
                      <th className="px-5 py-3 font-medium">Member & Avatar</th>
                      <th className="px-5 py-3 font-medium">Access Level</th>
                      <th className="px-5 py-3 font-medium">Department</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium">Location</th>
                      <th className="px-5 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {members.map((member) => (
                      <tr key={member.id} className="hover:bg-[#141822] transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="relative group/av shrink-0">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-10 h-10 rounded-xl object-cover border border-[#cbb592]/60"
                              />
                              <button
                                type="button"
                                onClick={() => setAvatarPickerTarget({ memberId: member.id })}
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover/av:opacity-100 rounded-xl flex items-center justify-center text-white transition-opacity"
                                title="Change custom avatar"
                              >
                                <Camera className="w-3.5 h-3.5 text-[#cbb592]" />
                              </button>
                            </div>
                            <div>
                              <button
                                type="button"
                                onClick={() => onSelectMemberForProfile(member.id)}
                                className="font-medium text-neutral-100 hover:text-[#cbb592] text-left transition-colors"
                              >
                                {member.name}
                              </button>
                              <span className="text-[11px] text-neutral-400 block">{member.title}</span>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-3.5">
                          <select
                            value={member.accessLevel}
                            onChange={(e) => {
                              onUpdateMember({
                                ...member,
                                accessLevel: e.target.value as MemberRoleAccess
                              });
                            }}
                            className="bg-[#0b0d10] border border-neutral-700/80 rounded-lg px-2 py-1 text-xs text-[#cbb592] focus:outline-none focus:border-[#cbb592]"
                          >
                            <option value="Director">Director (Full Admin)</option>
                            <option value="Senior Principal">Senior Principal</option>
                            <option value="Lead Architect">Lead Architect</option>
                            <option value="Associate">Associate</option>
                            <option value="Fellow">Fellow</option>
                          </select>
                        </td>

                        <td className="px-5 py-3.5 text-neutral-400">
                          {member.department}
                        </td>

                        <td className="px-5 py-3.5">
                          <select
                            value={member.status}
                            onChange={(e) => {
                              onUpdateMember({
                                ...member,
                                status: e.target.value as MemberStatus
                              });
                            }}
                            className="bg-[#0b0d10] border border-neutral-700/80 rounded-lg px-2 py-1 text-xs text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                          >
                            <option value="Active">Active</option>
                            <option value="In Field">In Field</option>
                            <option value="On Sabbatical">On Sabbatical</option>
                          </select>
                        </td>

                        <td className="px-5 py-3.5 text-neutral-400">
                          {member.location}
                        </td>

                        <td className="px-5 py-3.5 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => setEditingMember(member)}
                            className="p-1.5 text-neutral-400 hover:text-[#cbb592] hover:bg-neutral-800 rounded-lg transition-colors"
                            title="Edit full member profile"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Retire ${member.name} from active Guild roster?`)) {
                                onDeleteMember(member.id);
                              }
                            }}
                            className="p-1.5 text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 rounded-lg transition-colors"
                            title="Retire member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS & UPDATES MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif-luxury text-neutral-100">
                  Active Project Governance & Updates
                </h3>
                <p className="text-xs text-neutral-400">
                  Adjust commission progress %, publish chronological updates, and manage deliverables.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddProjectOpen(true)}
                className="px-4 py-2 bg-[#cbb592] hover:bg-[#dbcaaf] text-[#0b0d10] font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Charter New Commission
              </button>
            </div>

            {/* Quick Dispatch: Publish Live Project Update */}
            <form
              onSubmit={handlePublishUpdate}
              className="p-5 rounded-2xl bg-[#121620] border border-[#cbb592]/30 shadow-lg space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#cbb592] flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" /> Dispatch Official Project Update / Milestone Log
                </span>
                <span className="text-[11px] text-neutral-400">
                  Broadcasts immediately to the public project dossier
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Target Project</label>
                  <select
                    value={selectedProjectIdForUpdate}
                    onChange={(e) => setSelectedProjectIdForUpdate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.progress}% - {p.client})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Dispatching Architect / Author</label>
                  <input
                    type="text"
                    placeholder="e.g. Elena Vance or Guild Directorate"
                    value={updateAuthor}
                    onChange={(e) => setUpdateAuthor(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-[#cbb592]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Update Log Message</label>
                <textarea
                  rows={2}
                  placeholder="Detail on-site fabrication milestones, material load-testing certificates, or municipal sign-offs..."
                  value={updateNote}
                  onChange={(e) => setUpdateNote(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-[#cbb592]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#cbb592] hover:bg-[#dbcaaf] text-[#0b0d10] font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Publish Live Log
                </button>
              </div>
            </form>

            {/* List of Projects with Live Sliders & Milestone controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-5 rounded-2xl bg-[#101319] border border-neutral-800 space-y-4 shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-12 h-12 rounded-xl object-cover border border-neutral-700 shrink-0"
                      />
                      <div>
                        <button
                          type="button"
                          onClick={() => onSelectProjectForDetail(project.id)}
                          className="font-serif-luxury text-base text-neutral-100 hover:text-[#cbb592] text-left transition-colors font-medium"
                        >
                          {project.title}
                        </button>
                        <span className="text-[11px] text-neutral-400 block">{project.client} · {project.location}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete commission ${project.title}?`)) {
                          onDeleteProject(project.id);
                        }
                      }}
                      className="p-1.5 text-neutral-400 hover:text-rose-400 rounded-lg transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Status & Progress Slider Control */}
                  <div className="p-3 bg-[#0b0d10] rounded-xl border border-neutral-800/80 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Commission Phase</span>
                      <select
                        value={project.status}
                        onChange={(e) => {
                          onUpdateProject({
                            ...project,
                            status: e.target.value as ProjectStatus
                          });
                        }}
                        className="bg-[#141822] border border-neutral-700 rounded px-2 py-0.5 text-xs text-[#cbb592] focus:outline-none"
                      >
                        <option value="Active Commission">Active Commission</option>
                        <option value="Schematic Design">Schematic Design</option>
                        <option value="Detailed Engineering">Detailed Engineering</option>
                        <option value="Final Fabrication">Final Fabrication</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-400">Execution Progress</span>
                        <span className="font-mono tabular-nums text-[#cbb592] font-semibold">{project.progress}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={project.progress}
                        onChange={(e) => {
                          onUpdateProject({
                            ...project,
                            progress: Number(e.target.value)
                          });
                        }}
                        className="w-full accent-[#cbb592] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Milestones Quick Toggles */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider block">
                      Milestone Toggles ({project.milestones.filter(m => m.completed).length}/{project.milestones.length})
                    </span>
                    <div className="space-y-1">
                      {project.milestones.map((m) => (
                        <label
                          key={m.id}
                          className="flex items-center gap-2 p-1.5 rounded hover:bg-neutral-800/40 text-xs text-neutral-300 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={m.completed}
                            onChange={(e) => {
                              const updatedMilestones = project.milestones.map((milestone) =>
                                milestone.id === m.id ? { ...milestone, completed: e.target.checked } : milestone
                              );
                              onUpdateProject({
                                ...project,
                                milestones: updatedMilestones
                              });
                            }}
                            className="rounded border-neutral-700 bg-neutral-900 text-[#cbb592] focus:ring-0"
                          />
                          <span className={m.completed ? 'line-through text-neutral-500' : ''}>
                            {m.title}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INQUIRIES DESK */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-serif-luxury text-neutral-100">
                  Patron Consultation Inquiries
                </h3>
                <p className="text-xs text-neutral-400">
                  Submissions routed from the public commission contact form.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 p-1 bg-[#101319] border border-neutral-800 rounded-xl">
                {(['all', 'Pending Review', 'Under Consideration', 'Engaged', 'Archived'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setInquiryFilter(st)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                      inquiryFilter === st
                        ? 'bg-[#1b212c] text-[#cbb592] border border-[#cbb592]/30'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {st === 'all' ? 'All Inquiries' : st}
                  </button>
                ))}
              </div>
            </div>

            {filteredInquiries.length === 0 ? (
              <div className="text-center py-16 bg-[#101319] rounded-2xl border border-neutral-800 p-8">
                <p className="text-sm text-neutral-400">No patron inquiries match this filter status.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInquiries.map((inq) => {
                  const targetMember = members.find((m) => m.id === inq.targetMemberId);
                  const targetProj = projects.find((p) => p.id === inq.targetProjectId);

                  return (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl bg-[#101319] border border-neutral-800 space-y-4 shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono tabular-nums text-xs font-semibold text-[#cbb592]">
                            {inq.referenceNumber}
                          </span>
                          <span aria-hidden="true" className="text-neutral-600">·</span>
                          <span className="text-xs text-neutral-400 font-mono">
                            {new Date(inq.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>

                        {/* Status dropdown */}
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-neutral-500">Status:</span>
                          <select
                            value={inq.status}
                            onChange={(e) => {
                              onUpdateInquiryStatus(inq.id, e.target.value as Inquiry['status']);
                            }}
                            className="bg-[#0b0d10] border border-neutral-700 rounded-lg px-2.5 py-1 text-xs text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                          >
                            <option value="Pending Review">Pending Review</option>
                            <option value="Under Consideration">Under Consideration</option>
                            <option value="Engaged">Engaged</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Inquirer</span>
                          <span className="font-medium text-neutral-200">{inq.name}</span>
                          <span className="text-neutral-400 block">{inq.email}</span>
                          <span className="text-neutral-500 block">{inq.organization}</span>
                        </div>

                        <div>
                          <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Scope & Capital</span>
                          <span className="text-neutral-200 font-medium">{inq.serviceType}</span>
                          <span className="text-[#cbb592] font-mono block">{inq.budget}</span>
                          <span className="text-neutral-400 block">{inq.urgency}</span>
                        </div>

                        <div>
                          <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Assigned Routing</span>
                          <span className="text-neutral-200">
                            {targetMember ? `Specialist: ${targetMember.name}` : 'General Guild Directorate'}
                          </span>
                          {targetProj && (
                            <span className="text-neutral-400 block truncate">
                              Ref: {targetProj.title}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-3 bg-[#0b0d10] rounded-xl border border-neutral-800 text-xs text-neutral-300 leading-relaxed">
                        <span className="text-[10px] uppercase tracking-wider text-neutral-500 block mb-1">
                          Patron Briefing Message:
                        </span>
                        {inq.message}
                      </div>

                      {inq.internalNotes && (
                        <div className="text-[11px] text-[#cbb592] bg-[#cbb592]/10 border border-[#cbb592]/20 rounded-lg p-2.5">
                          <span className="font-medium">Director Note:</span> {inq.internalNotes}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* MODAL: ADD NEW MEMBER */}
      {isAddMemberOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#101318] border border-neutral-800 rounded-2xl shadow-2xl p-6 text-neutral-200 my-8">
            <h3 className="text-lg font-serif-luxury text-neutral-100 mb-1">Enroll New Guild Member</h3>
            <p className="text-xs text-neutral-400 mb-4">Grant access credentials and publish to the public member roster.</p>

            <form onSubmit={handleCreateMember} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clara Beauchamp"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Principal Acoustician"
                    value={newMemberTitle}
                    onChange={(e) => setNewMemberTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 mb-1">Access Role</label>
                  <select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value as MemberRoleAccess)}
                    className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                  >
                    <option value="Associate">Associate</option>
                    <option value="Lead Architect">Lead Architect</option>
                    <option value="Senior Principal">Senior Principal</option>
                    <option value="Director">Director (Admin)</option>
                    <option value="Fellow">Fellow</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 mb-1">Department</label>
                  <select
                    value={newMemberDept}
                    onChange={(e) => setNewMemberDept(e.target.value as Member['department'])}
                    className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                  >
                    <option value="Architecture">Architecture</option>
                    <option value="Computational Design">Computational Design</option>
                    <option value="Spatial & Acoustic">Spatial & Acoustic</option>
                    <option value="Sustainable Materials">Sustainable Materials</option>
                    <option value="Creative Strategy">Creative Strategy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 mb-1">Status</label>
                  <select
                    value={newMemberStatus}
                    onChange={(e) => setNewMemberStatus(e.target.value as MemberStatus)}
                    className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                  >
                    <option value="Active">Active</option>
                    <option value="In Field">In Field</option>
                    <option value="On Sabbatical">On Sabbatical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="clara@aureliaguild.design"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={newMemberLocation}
                    onChange={(e) => setNewMemberLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                  />
                </div>
              </div>

              {/* Avatar picker trigger */}
              <div>
                <label className="block text-neutral-300 mb-1">Custom Avatar</label>
                <div className="flex items-center gap-3 p-2 bg-[#0b0d10] border border-neutral-800 rounded-lg">
                  <img
                    src={newMemberAvatar}
                    alt="New member avatar preview"
                    className="w-12 h-12 rounded-full object-cover border border-[#cbb592]"
                  />
                  <button
                    type="button"
                    onClick={() => setAvatarPickerTarget({ isNew: true })}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded text-xs transition-colors"
                  >
                    Choose / Customize Avatar
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 mb-1">Specialties & Skills (comma-separated)</label>
                <input
                  type="text"
                  value={newMemberSkills}
                  onChange={(e) => setNewMemberSkills(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 mb-1">Biography</label>
                <textarea
                  rows={2}
                  placeholder="Detail architectural philosophy and research trajectory..."
                  value={newMemberBio}
                  onChange={(e) => setNewMemberBio(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsAddMemberOpen(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 hover:text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#cbb592] hover:bg-[#dbcaaf] text-[#0b0d10] font-medium rounded-lg transition-colors"
                >
                  Confirm & Enroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT EXISTING MEMBER */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#101318] border border-neutral-800 rounded-2xl shadow-2xl p-6 text-neutral-200 my-8">
            <h3 className="text-lg font-serif-luxury text-neutral-100 mb-1">
              Edit Profile: {editingMember.name}
            </h3>
            <p className="text-xs text-neutral-400 mb-4">Modify access privileges and portfolio details.</p>

            <form onSubmit={handleSaveMemberEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editingMember.title}
                    onChange={(e) => setEditingMember({ ...editingMember, title: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 mb-1">Access Level</label>
                  <select
                    value={editingMember.accessLevel}
                    onChange={(e) => setEditingMember({ ...editingMember, accessLevel: e.target.value as MemberRoleAccess })}
                    className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                  >
                    <option value="Director">Director</option>
                    <option value="Senior Principal">Senior Principal</option>
                    <option value="Lead Architect">Lead Architect</option>
                    <option value="Associate">Associate</option>
                    <option value="Fellow">Fellow</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 mb-1">Status</label>
                  <select
                    value={editingMember.status}
                    onChange={(e) => setEditingMember({ ...editingMember, status: e.target.value as MemberStatus })}
                    className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                  >
                    <option value="Active">Active</option>
                    <option value="In Field">In Field</option>
                    <option value="On Sabbatical">On Sabbatical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 mb-1">Custom Avatar</label>
                <div className="flex items-center gap-3 p-2 bg-[#0b0d10] border border-neutral-800 rounded-lg">
                  <img
                    src={editingMember.avatar}
                    alt={editingMember.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#cbb592]"
                  />
                  <button
                    type="button"
                    onClick={() => setAvatarPickerTarget({ memberId: editingMember.id })}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded text-xs transition-colors"
                  >
                    Change Avatar
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 mb-1">Narrative Bio</label>
                <textarea
                  rows={3}
                  value={editingMember.bio}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value, extendedBio: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 hover:text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#cbb592] hover:bg-[#dbcaaf] text-[#0b0d10] font-medium rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW PROJECT */}
      {isAddProjectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#101318] border border-neutral-800 rounded-2xl shadow-2xl p-6 text-neutral-200 my-8">
            <h3 className="text-lg font-serif-luxury text-neutral-100 mb-1">Charter New Guild Project</h3>
            <p className="text-xs text-neutral-400 mb-4">Initialize tracking for a new active commission.</p>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 mb-1">Commission Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Basalt Sanctuary"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 mb-1">Tagline</label>
                <input
                  type="text"
                  placeholder="Curved timber pavilion and acoustic sanctuary"
                  value={newProjectTagline}
                  onChange={(e) => setNewProjectTagline(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 mb-1">Typology</label>
                  <select
                    value={newProjectCategory}
                    onChange={(e) => setNewProjectCategory(e.target.value as Project['category'])}
                    className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                  >
                    <option value="Sustainable Architecture">Sustainable Architecture</option>
                    <option value="Spatial Computing">Spatial Computing</option>
                    <option value="Civic Pavilion">Civic Pavilion</option>
                    <option value="Biophilic Interiors">Biophilic Interiors</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 mb-1">Patron / Client</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zurich Alpine Trust"
                    value={newProjectClient}
                    onChange={(e) => setNewProjectClient(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={newProjectLocation}
                    onChange={(e) => setNewProjectLocation(e.target.value)}
                    placeholder="e.g. Geneva, Switzerland"
                    className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 mb-1">Lead Architect</label>
                  <select
                    value={newProjectLeadId}
                    onChange={(e) => setNewProjectLeadId(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                  >
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Architectural scope and engineering specifications..."
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsAddProjectOpen(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 hover:text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#cbb592] hover:bg-[#dbcaaf] text-[#0b0d10] font-medium rounded-lg transition-colors"
                >
                  Charter Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AVATAR PICKER MODAL (From Admin) */}
      {avatarPickerTarget && (
        <AvatarPickerModal
          isOpen={true}
          onClose={() => setAvatarPickerTarget(null)}
          currentAvatar={
            avatarPickerTarget.isNew
              ? newMemberAvatar
              : members.find((m) => m.id === avatarPickerTarget.memberId)?.avatar || ''
          }
          memberName={
            avatarPickerTarget.isNew
              ? newMemberName || 'New Member'
              : members.find((m) => m.id === avatarPickerTarget.memberId)?.name
          }
          onSelectAvatar={(avatarUrl) => {
            if (avatarPickerTarget.isNew) {
              setNewMemberAvatar(avatarUrl);
            } else if (avatarPickerTarget.memberId) {
              const target = members.find((m) => m.id === avatarPickerTarget.memberId);
              if (target) {
                onUpdateMember({ ...target, avatar: avatarUrl });
              }
              if (editingMember && editingMember.id === avatarPickerTarget.memberId) {
                setEditingMember({ ...editingMember, avatar: avatarUrl });
              }
            }
          }}
        />
      )}
    </section>
  );
}
