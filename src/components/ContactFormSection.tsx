import { useState, useEffect } from 'react';
import { Send, CheckCircle2, Shield, Sparkles, Building, Mail, User, HelpCircle } from 'lucide-react';
import { Member, Project, Inquiry } from '../types';

interface ContactFormSectionProps {
  members: Member[];
  projects: Project[];
  preselectedMemberId?: string;
  preselectedProjectId?: string;
  onAddInquiry: (inquiry: Inquiry) => void;
  onGoToAdmin?: () => void;
}

export function ContactFormSection({
  members,
  projects,
  preselectedMemberId,
  preselectedProjectId,
  onAddInquiry,
  onGoToAdmin
}: ContactFormSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [serviceType, setServiceType] = useState('Sustainable Architecture');
  const [targetMemberId, setTargetMemberId] = useState(preselectedMemberId || '');
  const [targetProjectId, setTargetProjectId] = useState(preselectedProjectId || '');
  const [budget, setBudget] = useState('$2.5M - $5M');
  const [urgency, setUrgency] = useState('Standard (Next 3–6 Months)');
  const [message, setMessage] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedMemberId) setTargetMemberId(preselectedMemberId);
    if (preselectedProjectId) setTargetProjectId(preselectedProjectId);
  }, [preselectedMemberId, preselectedProjectId]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name or patron title is required';
    if (!email.trim()) {
      errs.email = 'Valid email is required for secure dispatch';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email format';
    }
    if (!message.trim() || message.trim().length < 15) {
      errs.message = 'Please provide at least 15 characters describing your inquiry or commission';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const ref = `AUR-2026-${randomSuffix}`;

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      referenceNumber: ref,
      name: name.trim(),
      email: email.trim(),
      organization: organization.trim() || 'Private Patron',
      serviceType,
      targetMemberId: targetMemberId || undefined,
      targetProjectId: targetProjectId || undefined,
      budget,
      urgency,
      message: message.trim(),
      status: 'Pending Review',
      createdAt: new Date().toISOString()
    };

    onAddInquiry(newInquiry);
    setSubmittedRef(ref);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setOrganization('');
    setMessage('');
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <section id="contact-section" className="py-16 border-t border-neutral-800/80">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#cbb592] font-medium block mb-2">
            Patron Consultations & Commissions
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury text-neutral-100 font-normal tracking-tight">
            Initiate a Guild Commission
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2.5 leading-relaxed">
            Our Directorate accepts a strictly limited number of private and institutional commissions annually. Submit your brief for confidential review by our Senior Principals.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#11141c] border border-[#cbb592]/50 shadow-2xl text-center max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#cbb592]/10 border border-[#cbb592] flex items-center justify-center mx-auto text-[#cbb592]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#cbb592]">
                Dossier Lodged Successfully
              </span>
              <h3 className="text-2xl font-serif-luxury text-neutral-100">
                Inquiry Reference: {submittedRef}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
                Your architectural brief has been securely routed to the Guild Directorate. Elena Vance and the assigned lead specialists will review feasibility and respond within two business cycles.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0b0d10] border border-neutral-800 text-left text-xs space-y-1.5 font-mono text-neutral-400">
              <div className="flex justify-between">
                <span>Inquirer:</span>
                <span className="text-neutral-200">{name} ({email})</span>
              </div>
              <div className="flex justify-between">
                <span>Domain:</span>
                <span className="text-neutral-200">{serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-emerald-400">Recorded in Admin Governance Desk</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs rounded-lg transition-colors"
              >
                Submit Additional Brief
              </button>
              {onGoToAdmin && (
                <button
                  type="button"
                  onClick={onGoToAdmin}
                  className="px-5 py-2.5 bg-[#cbb592] hover:bg-[#dbcaaf] text-[#0b0d10] font-medium text-xs rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5" />
                  View in Admin Portal
                </button>
              )}
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-3xl bg-[#11141c] border border-neutral-800/90 shadow-2xl space-y-6"
          >
            {/* Primary Details Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Full Name / Principal Inquirer <span className="text-[#cbb592]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lady Vivienne Westwood or Marcus Sterling"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  className={`w-full px-4 py-2.5 text-xs bg-[#0b0d10] border rounded-xl text-neutral-200 placeholder-neutral-500 focus:outline-none transition-colors ${
                    errors.name ? 'border-rose-500/80' : 'border-neutral-800 focus:border-[#cbb592]'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Official Email Address <span className="text-[#cbb592]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="name@organization.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  className={`w-full px-4 py-2.5 text-xs bg-[#0b0d10] border rounded-xl text-neutral-200 placeholder-neutral-500 focus:outline-none transition-colors ${
                    errors.email ? 'border-rose-500/80' : 'border-neutral-800 focus:border-[#cbb592]'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Organization & Domain Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Organization / Family Office / Trust
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nordic Cultural Senate or Private Estate"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#0b0d10] border border-neutral-800 rounded-xl text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-[#cbb592] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Commission Typology
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#0b0d10] border border-neutral-800 rounded-xl text-neutral-200 focus:outline-none focus:border-[#cbb592] transition-colors"
                >
                  <option value="Sustainable Architecture">Sustainable Architecture & Timber Envelopes</option>
                  <option value="Spatial Computing">Spatial Hardware & Algorithmic Design</option>
                  <option value="Civic Pavilion">Civic Auditorium & Monumental Hall</option>
                  <option value="Biophilic Interiors">Biophilic Sanctuaries & Acoustic Interiors</option>
                  <option value="Masterplanning Advisory">Masterplanning & Cultural Curation Advisory</option>
                </select>
              </div>
            </div>

            {/* Targeted Specialist & Project Reference Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Direct to Specific Guild Specialist (Optional)
                </label>
                <select
                  value={targetMemberId}
                  onChange={(e) => setTargetMemberId(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#0b0d10] border border-neutral-800 rounded-xl text-neutral-200 focus:outline-none focus:border-[#cbb592] transition-colors"
                >
                  <option value="">General Guild Directorate Review</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} — {m.title} ({m.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Referenced Guild Commission (Optional)
                </label>
                <select
                  value={targetProjectId}
                  onChange={(e) => setTargetProjectId(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#0b0d10] border border-neutral-800 rounded-xl text-neutral-200 focus:outline-none focus:border-[#cbb592] transition-colors"
                >
                  <option value="">None (Independent Commission)</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.client})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Budget & Urgency Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Anticipated Capital Allocation (USD)
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#0b0d10] border border-neutral-800 rounded-xl text-neutral-200 focus:outline-none focus:border-[#cbb592] transition-colors"
                >
                  <option value="$1M - $2.5M">$1M – $2.5M (Bespoke Pavilion / Installation)</option>
                  <option value="$2.5M - $5M">$2.5M – $5M (Residential Sanctuary / R&D Prototype)</option>
                  <option value="$5M - $15M">$5M – $15M (Civic Auditorium / Multi-structure Estate)</option>
                  <option value="$15M+">$15M+ (Monumental Masterplan)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Commission Horizon & Urgency
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#0b0d10] border border-neutral-800 rounded-xl text-neutral-200 focus:outline-none focus:border-[#cbb592] transition-colors"
                >
                  <option value="Immediate (Next 30 Days)">Immediate Feasibility (Next 30 Days)</option>
                  <option value="Standard (Next 3–6 Months)">Standard Commissioning (Next 3–6 Months)</option>
                  <option value="Forward Looking (6–12 Months)">Forward Planning (6–12 Months)</option>
                </select>
              </div>
            </div>

            {/* Inquiry Message */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Commission Dossier Brief <span className="text-[#cbb592]">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Detail site topographical conditions, spatial program requirements, material inclinations, or philosophical ambitions..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                }}
                className={`w-full px-4 py-3 text-xs bg-[#0b0d10] border rounded-xl text-neutral-200 placeholder-neutral-500 focus:outline-none transition-colors ${
                  errors.message ? 'border-rose-500/80' : 'border-neutral-800 focus:border-[#cbb592]'
                }`}
              />
              {errors.message && <p className="text-[11px] text-rose-400 mt-1">{errors.message}</p>}
            </div>

            {/* Bottom Submit Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800/80">
              <span className="text-[11px] text-neutral-500 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#cbb592]" />
                All briefs handled with Swiss bank-grade confidentiality
              </span>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#cbb592] hover:bg-[#dbcaaf] text-[#0b0d10] font-medium text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Dispatch Inquiry to Directorate</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

      </div>
    </section>
  );
}
