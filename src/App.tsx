import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MemberListSection } from './components/MemberListSection';
import { ActiveProjectsSection } from './components/ActiveProjectsSection';
import { ContactFormSection } from './components/ContactFormSection';
import { AdminDashboard } from './components/AdminDashboard';
import { MemberProfileModal } from './components/MemberProfileModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AvatarPickerModal } from './components/AvatarPickerModal';
import { Footer } from './components/Footer';
import { Member, Project, Inquiry } from './types';
import { INITIAL_MEMBERS, INITIAL_PROJECTS, INITIAL_INQUIRIES } from './data/initialData';
import { Sparkles, ArrowRight, ShieldCheck, Compass, Eye, ShieldAlert } from 'lucide-react';

const STORAGE_KEYS = {
  MEMBERS: 'aurelia_members_v1',
  PROJECTS: 'aurelia_projects_v1',
  INQUIRIES: 'aurelia_inquiries_v1'
};

export default function App() {
  // Persistence state
  const [members, setMembers] = useState<Member[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEMBERS);
      return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
    } catch {
      return INITIAL_MEMBERS;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  // Save to localStorage when states change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
    } catch (e) {
      console.error('Failed to sync members to storage', e);
    }
  }, [members]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to sync projects to storage', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to sync inquiries to storage', e);
    }
  }, [inquiries]);

  // View & Modal states
  const [activeView, setActiveView] = useState<'home' | 'members' | 'projects' | 'contact' | 'admin'>('home');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [avatarPickerMember, setAvatarPickerMember] = useState<Member | null>(null);
  const [preselectedMemberForContact, setPreselectedMemberForContact] = useState<string | undefined>(undefined);
  const [preselectedProjectForContact, setPreselectedProjectForContact] = useState<string | undefined>(undefined);
  
  // Admin governance state
  const [isAdmin, setIsAdmin] = useState<boolean>(true); // Enabled by default for easy evaluation of all features

  // Active member for profile modal
  const activeModalMember = members.find((m) => m.id === selectedMemberId) || null;
  // Active project for detail modal
  const activeModalProject = projects.find((p) => p.id === selectedProjectId) || null;

  // Handlers
  const handleOpenMemberProfile = (memberId: string) => {
    setSelectedMemberId(memberId);
  };

  const handleOpenProjectDetail = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleInquireWithMember = (memberId: string) => {
    setPreselectedMemberForContact(memberId);
    setActiveView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInquireAboutProject = (projectId: string) => {
    setPreselectedProjectForContact(projectId);
    setActiveView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateAvatar = (memberId: string, newAvatar: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, avatar: newAvatar } : m))
    );
  };

  const handleAddMember = (newMember: Member) => {
    setMembers((prev) => [newMember, ...prev]);
  };

  const handleUpdateMember = (updated: Member) => {
    setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  };

  const handleDeleteMember = (memberId: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
  };

  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleUpdateProject = (updated: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  const handleAddProjectUpdate = (projectId: string, note: string, author: string) => {
    const newUpdate = {
      id: `upd-${Date.now()}`,
      date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
      author,
      note
    };

    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, updates: [newUpdate, ...p.updates] } : p))
    );
  };

  const handleToggleMilestone = (projectId: string, milestoneId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          milestones: p.milestones.map((m) =>
            m.id === milestoneId ? { ...m, completed: !m.completed } : m
          )
        };
      })
    );
  };

  const handleAddInquiry = (newInquiry: Inquiry) => {
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const handleUpdateInquiryStatus = (inquiryId: string, status: Inquiry['status'], notes?: string) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === inquiryId ? { ...inq, status, ...(notes !== undefined ? { internalNotes: notes } : {}) } : inq
      )
    );
  };

  const handleResetToDemo = () => {
    localStorage.removeItem(STORAGE_KEYS.MEMBERS);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    setMembers(INITIAL_MEMBERS);
    setProjects(INITIAL_PROJECTS);
    setInquiries(INITIAL_INQUIRIES);
  };

  return (
    <div className="min-h-screen bg-[#0b0d10] text-[#e8ebf0] flex flex-col font-sans">
      
      {/* Top Banner indicating Admin & Quick Access */}
      <div className="bg-[#121620] border-b border-neutral-800 text-[11px] text-neutral-400 py-1.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cbb592]" />
            <span className="text-neutral-300 font-medium">Aurelia Architectural & Design Guild</span>
            <span aria-hidden="true" className="text-neutral-600 hidden sm:inline">·</span>
            <span className="text-neutral-400 hidden sm:inline">Zurich · Milan · Kyoto Atelier</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveView('admin')}
              className="text-[#cbb592] hover:underline flex items-center gap-1 font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Console</span>
              {inquiries.length > 0 && (
                <span className="font-mono tabular-nums text-[10px] bg-[#cbb592]/20 px-1 rounded">
                  {inquiries.length} Inquiries
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar (Strict 3-Zone Contract) */}
      <Navbar
        activeView={activeView}
        setActiveView={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        inquiryCount={inquiries.length}
      />

      {/* Primary Content Routing */}
      <main className="flex-1">
        {activeView === 'home' && (
          <div>
            {/* Grand Hero Section */}
            <HeroSection
              onExploreProjects={() => {
                const el = document.getElementById('projects-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveView('projects');
              }}
              onExploreMembers={() => {
                const el = document.getElementById('members-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveView('members');
              }}
              onCommission={() => {
                const el = document.getElementById('contact-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveView('contact');
              }}
            />

            {/* Guild Members Showcase */}
            <MemberListSection
              members={members}
              onSelectMember={handleOpenMemberProfile}
              onOpenAvatarPicker={(member) => setAvatarPickerMember(member)}
              onAddMemberClick={() => setActiveView('admin')}
              isAdmin={isAdmin}
            />

            {/* Active Projects Showcase */}
            <ActiveProjectsSection
              projects={projects}
              members={members}
              onSelectProject={handleOpenProjectDetail}
              onSelectMember={handleOpenMemberProfile}
              onAddProjectClick={() => setActiveView('admin')}
              isAdmin={isAdmin}
            />

            {/* Architectural Manifesto Section */}
            <section className="py-16 border-t border-neutral-800/80 bg-[#0e1117]">
              <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
                <span className="text-xs uppercase tracking-[0.25em] text-[#cbb592] font-medium block">
                  The Aurelia Guild Constitution
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif-luxury text-neutral-100 font-normal leading-snug">
                  "We reject ephemeral disposable construction. Every commission is sculpted to stand for centuries, calibrated to its micro-climate, and enriched by acoustic geometry."
                </h3>
                <div className="pt-2 flex items-center justify-center gap-6 text-xs text-neutral-400">
                  <span>Robotic Timber Joinery</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span>Spatial Acoustic Calibrations</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span>Generative Structural Mass Reduction</span>
                </div>
              </div>
            </section>

            {/* User Contact & Inquiries Form */}
            <ContactFormSection
              members={members}
              projects={projects}
              preselectedMemberId={preselectedMemberForContact}
              preselectedProjectId={preselectedProjectForContact}
              onAddInquiry={handleAddInquiry}
              onGoToAdmin={() => setActiveView('admin')}
            />
          </div>
        )}

        {activeView === 'members' && (
          <div className="pt-6">
            <MemberListSection
              members={members}
              onSelectMember={handleOpenMemberProfile}
              onOpenAvatarPicker={(member) => setAvatarPickerMember(member)}
              onAddMemberClick={() => setActiveView('admin')}
              isAdmin={isAdmin}
            />
          </div>
        )}

        {activeView === 'projects' && (
          <div className="pt-6">
            <ActiveProjectsSection
              projects={projects}
              members={members}
              onSelectProject={handleOpenProjectDetail}
              onSelectMember={handleOpenMemberProfile}
              onAddProjectClick={() => setActiveView('admin')}
              isAdmin={isAdmin}
            />
          </div>
        )}

        {activeView === 'contact' && (
          <div className="pt-6">
            <ContactFormSection
              members={members}
              projects={projects}
              preselectedMemberId={preselectedMemberForContact}
              preselectedProjectId={preselectedProjectForContact}
              onAddInquiry={handleAddInquiry}
              onGoToAdmin={() => setActiveView('admin')}
            />
          </div>
        )}

        {activeView === 'admin' && (
          <AdminDashboard
            members={members}
            projects={projects}
            inquiries={inquiries}
            onUpdateMember={handleUpdateMember}
            onAddMember={handleAddMember}
            onDeleteMember={handleDeleteMember}
            onUpdateProject={handleUpdateProject}
            onAddProject={handleAddProject}
            onDeleteProject={handleDeleteProject}
            onAddProjectUpdate={handleAddProjectUpdate}
            onUpdateInquiryStatus={handleUpdateInquiryStatus}
            onResetToDemo={handleResetToDemo}
            onSelectMemberForProfile={handleOpenMemberProfile}
            onSelectProjectForDetail={handleOpenProjectDetail}
          />
        )}
      </main>

      {/* Modals & Dialogs */}
      {/* 1. Member Profile Modal (Opened by clicking avatar or name) */}
      <MemberProfileModal
        member={activeModalMember}
        projects={projects}
        isOpen={selectedMemberId !== null}
        onClose={() => setSelectedMemberId(null)}
        onSelectProject={(projectId) => {
          setSelectedMemberId(null);
          setSelectedProjectId(projectId);
        }}
        onInquireWithMember={handleInquireWithMember}
        onUpdateAvatar={handleUpdateAvatar}
        isAdmin={isAdmin}
        onOpenAdminEdit={(member) => {
          setSelectedMemberId(null);
          setActiveView('admin');
        }}
      />

      {/* 2. Project Detail Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        members={members}
        isOpen={selectedProjectId !== null}
        onClose={() => setSelectedProjectId(null)}
        onSelectMember={(memberId) => {
          setSelectedProjectId(null);
          setSelectedMemberId(memberId);
        }}
        onInquireAboutProject={handleInquireAboutProject}
        isAdmin={isAdmin}
        onToggleMilestone={handleToggleMilestone}
        onAddProjectUpdate={handleAddProjectUpdate}
      />

      {/* 3. Avatar Picker Modal */}
      {avatarPickerMember && (
        <AvatarPickerModal
          isOpen={true}
          onClose={() => setAvatarPickerMember(null)}
          currentAvatar={avatarPickerMember.avatar}
          memberName={avatarPickerMember.name}
          onSelectAvatar={(newAvatar) => {
            handleUpdateAvatar(avatarPickerMember.id, newAvatar);
          }}
        />
      )}

      {/* Footer */}
      <Footer onNavigate={(v) => {
        setActiveView(v);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
}
