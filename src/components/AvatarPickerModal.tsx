import { useState } from 'react';
import { X, Check, Image as ImageIcon, Sparkles } from 'lucide-react';
import { AVATAR_PRESETS } from '../data/initialData';

interface AvatarPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string;
  onSelectAvatar: (avatarUrl: string) => void;
  memberName?: string;
}

export function AvatarPickerModal({
  isOpen,
  onClose,
  currentAvatar,
  onSelectAvatar,
  memberName = 'Member'
}: AvatarPickerModalProps) {
  const [selected, setSelected] = useState<string>(currentAvatar);
  const [customUrl, setCustomUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'presets' | 'custom' | 'monogram'>('presets');

  if (!isOpen) return null;

  const handleApply = () => {
    if (activeTab === 'custom' && customUrl.trim()) {
      onSelectAvatar(customUrl.trim());
    } else {
      onSelectAvatar(selected);
    }
    onClose();
  };

  const generateMonogramSvg = (name: string) => {
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'AU';
    const svg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%2312151b"/><circle cx="100" cy="100" r="85" fill="none" stroke="%23cbb592" stroke-width="2" stroke-dasharray="4 4"/><circle cx="100" cy="100" r="75" fill="none" stroke="%23cbb592" stroke-width="1"/><text x="100" y="112" font-family="Georgia, serif" font-size="44" fill="%23e8ebf0" text-anchor="middle" letter-spacing="4">${initials}</text></svg>`;
    return svg;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#12151b] border border-neutral-800 rounded-xl shadow-2xl p-6 text-neutral-200">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <h3 className="text-lg font-serif-luxury text-neutral-100 tracking-wide">
              Customize Avatar for {memberName}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Select an atelier studio portrait, custom URL, or bespoke monogram
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 transition-colors rounded-lg hover:bg-neutral-800/60"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 my-4 p-1 bg-[#0b0d10] border border-neutral-800/80 rounded-lg">
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'presets'
                ? 'bg-[#1e232d] text-neutral-100 shadow-sm border border-neutral-700/50'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Studio Presets
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'custom'
                ? 'bg-[#1e232d] text-neutral-100 shadow-sm border border-neutral-700/50'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Custom Image URL
          </button>
          <button
            onClick={() => {
              setActiveTab('monogram');
              setSelected(generateMonogramSvg(memberName));
            }}
            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'monogram'
                ? 'bg-[#1e232d] text-neutral-100 shadow-sm border border-neutral-700/50'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Atelier Monogram
          </button>
        </div>

        {/* Tab contents */}
        {activeTab === 'presets' && (
          <div className="grid grid-cols-4 gap-3 max-h-60 overflow-y-auto p-1">
            {AVATAR_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setSelected(preset.url)}
                className={`relative group flex flex-col items-center p-1.5 rounded-lg border transition-all ${
                  selected === preset.url
                    ? 'border-[#cbb592] bg-[#1e232d] ring-1 ring-[#cbb592]/50'
                    : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/50'
                }`}
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700/60">
                  <img
                    src={preset.url}
                    alt={preset.label}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {selected === preset.url && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Check className="w-5 h-5 text-[#cbb592]" />
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-neutral-300 mt-1.5 text-center truncate w-full">
                  {preset.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Direct Portrait / Avatar URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://example.com/portrait.jpg"
                  value={customUrl}
                  onChange={(e) => {
                    setCustomUrl(e.target.value);
                    setSelected(e.target.value);
                  }}
                  className="w-full px-3 py-2 text-sm bg-[#0b0d10] border border-neutral-700 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#cbb592]"
                />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                Enter an HTTPS link to any high-resolution portrait or corporate photo.
              </p>
            </div>

            {selected && (
              <div className="flex items-center gap-3 p-3 bg-[#0b0d10] rounded-lg border border-neutral-800">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-[#cbb592]/60 shrink-0 bg-neutral-800">
                  <img
                    src={selected}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <span className="text-xs font-medium text-neutral-200">Avatar Preview</span>
                  <p className="text-[11px] text-neutral-400">Validated image container</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'monogram' && (
          <div className="flex flex-col items-center justify-center py-4 space-y-3">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#cbb592] p-1 bg-[#0b0d10]">
              <img
                src={selected}
                alt="Bespoke Monogram"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="text-center">
              <span className="text-xs font-medium text-neutral-200">Bespoke Atelier Monogram Seal</span>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Generates a gold-leaf circular monogram seal for {memberName}.
              </p>
            </div>
          </div>
        )}

        {/* Footer controls */}
        <div className="flex items-center justify-end gap-3 pt-4 mt-4 border-t border-neutral-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-neutral-100 bg-neutral-800/60 hover:bg-neutral-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-4 py-2 text-xs font-medium text-[#0b0d10] bg-[#cbb592] hover:bg-[#dfcbac] rounded-lg transition-colors font-medium flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            Apply Avatar
          </button>
        </div>
      </div>
    </div>
  );
}
