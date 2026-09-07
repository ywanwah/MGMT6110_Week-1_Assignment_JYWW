import React from 'react';
import { RecommendationProduct } from '../types';

interface TermSheetModalProps {
  product: RecommendationProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onPushToApp: (productTitle: string, facilityValue: string) => void;
  onShowToast: (title: string, message: string, isSuccess?: boolean) => void;
}

export const TermSheetModal: React.FC<TermSheetModalProps> = ({
  product,
  isOpen,
  onClose,
  onPushToApp,
  onShowToast,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#0a0e1c] border border-white/10 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-gradient-to-r from-[#0d1326] to-[#0a0e1c]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/15 text-amber-300 flex items-center justify-center border border-amber-400/25 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">description</span>
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest">
                Confidential Term Sheet Summary
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-white font-display leading-tight">
                {product.title}
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

        {/* Term Sheet Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs font-mono">
          <div className="bg-[#050811] p-4 sm:p-5 rounded-xl border border-white/[0.08] space-y-3">
            <div className="flex justify-between border-b border-white/[0.06] pb-2 text-[11px]">
              <span className="text-[#7a8096]">ISSUER &amp; CUSTODIAN</span>
              <span className="text-white font-semibold">SOVEREIGN EXECUTIVE WEALTH (ZURICH / LONDON / SINGAPORE)</span>
            </div>
            <div className="flex justify-between border-b border-white/[0.06] pb-2 text-[11px]">
              <span className="text-[#7a8096]">OBLIGOR / BORROWER</span>
              <span className="text-amber-200 font-semibold">ALEXANDER STERLING (HOLDCO SPV #1)</span>
            </div>
            <div className="flex justify-between border-b border-white/[0.06] pb-2 text-[11px]">
              <span className="text-[#7a8096]">FACILITY CLASSIFICATION</span>
              <span className="text-[#99b6ff] font-semibold">{product.category.toUpperCase()}</span>
            </div>
            <div className="flex justify-between border-b border-white/[0.06] pb-2 text-[11px]">
              <span className="text-[#7a8096]">PROPOSED PRINCIPAL</span>
              <span className="text-[#34d399] font-bold text-sm tnum">{product.proposedMetricValue}</span>
            </div>
            <div className="flex justify-between border-b border-white/[0.06] pb-2 text-[11px]">
              <span className="text-[#7a8096]">PRICING BENCHMARK</span>
              <span className="text-white">{product.proposedMetricSub}</span>
            </div>
            <div className="flex justify-between border-b border-white/[0.06] pb-2 text-[11px]">
              <span className="text-[#7a8096]">COLLATERAL BASE</span>
              <span className="text-white">$4.55M Discretionary Multi-Asset Portfolio (#904-441)</span>
            </div>
            <div className="flex justify-between border-b border-white/[0.06] pb-2 text-[11px]">
              <span className="text-[#7a8096]">GOVERNING JURISDICTION</span>
              <span className="text-white">English Law / Swiss Federal Banking Ordinance</span>
            </div>
            <div className="flex justify-between pt-1 text-[11px]">
              <span className="text-[#7a8096]">EST. ANNUAL RM IMPACT</span>
              <span className="text-[#34d399] font-semibold tnum">+${product.annualFeeEst.toLocaleString()} / year</span>
            </div>
          </div>

          {/* Legal / Covenant Summary */}
          <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.06] space-y-2 text-[#b8bdd0]">
            <div className="text-[11px] font-bold text-white uppercase font-sans tracking-wider">
              Key Covenant Provisions &amp; Structuring Notes
            </div>
            <ul className="list-disc list-inside space-y-1.5 text-[11px] leading-relaxed font-sans">
              <li>Automatic liquidity covenant maintained at minimum 1.40x collateral coverage ratio.</li>
              <li>Pre-approved accelerated drawdown with 2-hour settlement directly into Sterling Tech SPV treasury.</li>
              <li>Zero early repayment penalties after 90-day initial deployment window.</li>
              <li>Cross-collateralized with Universal Life preservation reserve in event of secondary restructuring.</li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#0a0e1c] border-t border-white/[0.08] flex items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => {
              onShowToast('PDF Generated', `Advisory Term Sheet for ${product.title} compiled successfully.`, true);
              onClose();
            }}
            className="px-3 sm:px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-white flex items-center gap-2 border border-white/[0.08] transition-all"
          >
            <span className="material-symbols-outlined text-amber-300 text-[16px]">download</span>
            <span>Download Encrypted PDF</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 sm:px-4 py-2.5 rounded-xl text-xs font-semibold text-[#7a8096] hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onPushToApp(product.title, product.proposedMetricValue);
                onClose();
              }}
              className="px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] hover:from-[#2563eb] hover:to-[#3b82f6] text-white flex items-center gap-2 shadow-md transition-all active:scale-[0.98] border border-blue-400/30"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              <span>Push to Client Vault</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
