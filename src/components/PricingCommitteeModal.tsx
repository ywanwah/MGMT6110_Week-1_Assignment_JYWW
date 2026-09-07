import React, { useState } from 'react';

interface PricingCommitteeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: string) => void;
}

export const PricingCommitteeModal: React.FC<PricingCommitteeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [discountBps, setDiscountBps] = useState<number>(40);
  const [rationale, setRationale] = useState<string>(
    'UBS is actively pitching SOFR + 0.75% to win discretionary custody ($6.2M outside wallet). Requesting 40 bps discount on MBAI Lombard facility to anchor primary relationship and preserve $142.5k revenue base.'
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
            <div className="w-9 h-9 rounded-xl bg-amber-400/15 text-amber-300 flex items-center justify-center border border-amber-400/25 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest">
                Risk & Governance Committee
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-white font-display">
                Pricing Concession Request
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
              Requested Margin Concession
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={discountBps}
                onChange={(e) => setDiscountBps(Number(e.target.value))}
                className="flex-1 accent-amber-400 bg-[#050811] h-2 rounded-lg appearance-none cursor-pointer"
              />
              <span className="font-mono font-bold text-sm text-amber-300 bg-[#050811] px-3 py-1 rounded-lg border border-amber-400/20 tnum">
                -{discountBps} bps
              </span>
            </div>
            <p className="text-[11px] text-[#7a8096] mt-1.5 font-mono">
              New Effective Spread: SOFR + {(1.15 - discountBps / 100).toFixed(2)}% (Floor guideline: SOFR + 0.70%)
            </p>
          </div>

          <div>
            <label className="text-xs text-[#7a8096] font-mono uppercase tracking-wider block mb-1.5">
              Defensive Justification &amp; Outside Wallet Capture
            </label>
            <textarea
              rows={4}
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              className="w-full bg-[#050811] border border-white/10 rounded-xl p-3 text-xs text-[#dee2f6] focus:border-amber-400/50 focus:outline-none resize-none leading-relaxed font-sans"
            />
          </div>

          <div className="bg-[#050811] p-3.5 rounded-xl border border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] text-[#7a8096] font-mono">Estimated Net Revenue Protected:</span>
            <span className="font-bold font-mono text-[#34d399] text-sm tnum">+$142,500 / yr + $42.5k Structuring</span>
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
              onSubmit(`Pricing exception (-${discountBps} bps) expedited to Credit Risk Committee.`);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black flex items-center gap-2 shadow-md transition-all active:scale-[0.98] font-mono font-bold"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            <span>Submit Exception Request</span>
          </button>
        </div>
      </div>
    </div>
  );
};
