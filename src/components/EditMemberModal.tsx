import { useState, useEffect } from 'react';
import { X, Check, Edit3, Camera, Sparkles } from 'lucide-react';
import { Member, MemberRoleAccess, MemberStatus } from '../types';
import { AvatarPickerModal } from './AvatarPickerModal';

interface EditMemberModalProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
  onSave: (updatedMember: Member) => void;
}

export function EditMemberModal({
  isOpen,
  member,
  onClose,
  onSave
}: EditMemberModalProps) {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState<Member['department']>('Architecture');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [extendedBio, setExtendedBio] = useState('');
  const [quote, setQuote] = useState('');
  const [skills, setSkills] = useState('');
  const [avatar, setAvatar] = useState('');
  const [status, setStatus] = useState<MemberStatus>('Active');
  const [accessLevel, setAccessLevel] = useState<MemberRoleAccess>('Associate');
  
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);

  useEffect(() => {
    if (member) {
      setName(member.name);
      setTitle(member.title);
      setDepartment(member.department);
      setLocation(member.location);
      setBio(member.bio);
      setExtendedBio(member.extendedBio || member.bio);
      setQuote(member.quote || '');
      setSkills(member.skills.join(', '));
      setAvatar(member.avatar);
      setStatus(member.status);
      setAccessLevel(member.accessLevel);
    }
  }, [member, isOpen]);

  if (!isOpen || !member) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updated: Member = {
      ...member,
      name: name.trim(),
      title: title.trim() || member.title,
      department,
      location: location.trim() || member.location,
      bio: bio.trim() || member.bio,
      extendedBio: extendedBio.trim() || bio.trim() || member.extendedBio,
      quote: quote.trim() || member.quote,
      skills: skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      avatar: avatar || member.avatar,
      status,
      accessLevel
    };

    onSave(updated);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <div className="relative w-full max-w-2xl bg-[#101318] border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-neutral-200 my-8">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#cbb592]/10 border border-[#cbb592] flex items-center justify-center text-[#cbb592]">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif-luxury text-neutral-100 font-medium tracking-wide">
                  Edit Member Information
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Update name, biographical narrative, disciplines, and avatar portrait.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-100 bg-neutral-900/60 hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            
            {/* Avatar & Core Identity Row */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 rounded-xl bg-[#141820] border border-neutral-800/80">
              <div className="relative group shrink-0">
                <img
                  src={avatar}
                  alt={name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#cbb592] shadow-md"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={() => setIsAvatarPickerOpen(true)}
                  className="absolute -bottom-1 -right-1 p-1.5 bg-[#1b2029] hover:bg-[#cbb592] text-neutral-300 hover:text-[#0b0d10] border border-neutral-700 rounded-full transition-colors shadow"
                  title="Change avatar"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 w-full space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      Member Name <span className="text-[#cbb592]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Elena Vance"
                      className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-[#cbb592] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Senior Principal Architect"
                      className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-[#cbb592] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAvatarPickerOpen(true)}
                    className="text-xs text-[#cbb592] hover:underline flex items-center gap-1"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    Change Portrait Avatar
                  </button>
                </div>
              </div>
            </div>

            {/* Department, Status & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as Member['department'])}
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
                <label className="block text-neutral-300 font-medium mb-1">
                  Current Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as MemberStatus)}
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-[#cbb592]"
                >
                  <option value="Active">Active</option>
                  <option value="In Field">In Field</option>
                  <option value="On Sabbatical">On Sabbatical</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Location / Studio City
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Zurich & Milan"
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-[#cbb592]"
                />
              </div>
            </div>

            {/* Primary Bio (Card summary) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-neutral-300 font-medium">
                  Summary Bio (Shown on member card) <span className="text-[#cbb592]">*</span>
                </label>
                <span className="text-[11px] text-neutral-500">Concise overview</span>
              </div>
              <textarea
                rows={2}
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Brief summary of architectural focus and methods..."
                className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-[#cbb592] leading-relaxed"
              />
            </div>

            {/* Extended Bio (Shown on profile modal) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-neutral-300 font-medium">
                  Extended Narrative Biography (Shown in detailed profile dossier)
                </label>
                <span className="text-[11px] text-neutral-500">Full monograph</span>
              </div>
              <textarea
                rows={4}
                value={extendedBio}
                onChange={(e) => setExtendedBio(e.target.value)}
                placeholder="Comprehensive background, education, research history, and monumental commissions..."
                className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-[#cbb592] leading-relaxed"
              />
            </div>

            {/* Architectural Quote / Manifesto */}
            <div>
              <label className="block text-neutral-300 font-medium mb-1">
                Personal Philosophy / Design Quote
              </label>
              <input
                type="text"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="e.g. Architecture must not conquer nature; it must become its resonance chamber."
                className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-[#cbb592]"
              />
            </div>

            {/* Skills & Disciplines */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-neutral-300 font-medium">
                  Core Disciplines & Skills (Comma-separated)
                </label>
                <span className="text-[11px] text-neutral-500">Separated by comma</span>
              </div>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Bioclimatic Engineering, Robotic Timber Joinery, Parametric Modeling"
                className="w-full px-3 py-2 bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-[#cbb592]"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#cbb592] hover:bg-[#dbcaaf] text-[#0b0d10] font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                Save Member Information
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Nested Avatar Picker */}
      {isAvatarPickerOpen && (
        <AvatarPickerModal
          isOpen={true}
          onClose={() => setIsAvatarPickerOpen(false)}
          currentAvatar={avatar}
          memberName={name}
          onSelectAvatar={(newAvatar) => {
            setAvatar(newAvatar);
          }}
        />
      )}
    </>
  );
}
