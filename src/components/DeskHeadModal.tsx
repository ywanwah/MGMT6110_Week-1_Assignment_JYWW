import React, { useState } from 'react';

interface DeskHeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
  pipelineTotal: string;
}

export const DeskHeadModal: React.FC<DeskHeadModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  pipelineTotal,
}) => {
  const [recipient, setRecipient] = useState('Lord Harrington (Managing Director, EMEA Private Wealth)');
  const [note, setNote] = useState(
    'Transmitting Sterling family relationship Q3 acceleration pack. 4 high-probability cross-sell mandates projected to deliver +$118.2k in immediate fee revenue and lift annual run-rate to $260,700 (+83% uplift).'
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#0a0e1c] border border-white/10 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-gradient-to-r from-[#0d1326] to-[#0a0e1c]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-[#99b6ff] flex items-center justify-center border border-blue-400/25 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#99b6ff] uppercase tracking-widest">
                Executive Reporting
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-white font-display">
                Dispatch Projections to Desk Head
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#7a8096] hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 text-xs">
          <div>
            <label className="text-xs text-[#7a8096] font-mono uppercase tracking-wider block mb-1.5">
              Desk Head Recipient
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full bg-[#050811] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-blue-400/50 focus:outline-none font-sans"
            />
          </div>

          <div className="bg-[#050811] p-3.5 rounded-xl border border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] text-[#7a8096] font-mono">Confirmed Pipeline Value Attached:</span>
            <span className="font-bold font-mono text-[#34d399] text-sm tnum">{pipelineTotal}</span>
          </div>

          <div>
            <label className="text-xs text-[#7a8096] font-mono uppercase tracking-wider block mb-1.5">
              Executive Briefing Note
            </label>
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-[#050811] border border-white/10 rounded-xl p-3.5 text-xs text-[#dee2f6] focus:border-blue-400/50 focus:outline-none resize-none leading-relaxed font-sans"
            />
          </div>
        </div>

        <div className="p-4 bg-[#0a0e1c] border-t border-white/[0.08] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#7a8096] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSubmit(`Quarterly revenue forecast pack delivered to Desk Head (${recipient.split(' ')[0]}).`);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] hover:from-[#2563eb] hover:to-[#3b82f6] text-white flex items-center gap-2 shadow-md transition-all active:scale-[0.98] border border-blue-400/30"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            <span>Dispatch Projections</span>
          </button>
        </div>
      </div>
    </div>
  );
};
