import React, { useState } from 'react';
import { RecommendationProduct } from '../types';

interface SimulationModalProps {
  product: RecommendationProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onPushToApp: (productTitle: string, facilityValue: string) => void;
}

export const SimulationModal: React.FC<SimulationModalProps> = ({
  product,
  isOpen,
  onClose,
  onPushToApp,
}) => {
  if (!isOpen || !product) return null;

  // Simulation state based on product
  const [ticketAmount, setTicketAmount] = useState<number>(() => {
    if (product.id === 'lombard-credit') return 2500000;
    if (product.id === 'pe-coinvest') return 1000000;
    if (product.id === 'family-trust') return 5000000;
    return 3000000;
  });

  const [spreadBps, setSpreadBps] = useState<number>(115); // 1.15% spread
  const [ltvPercent, setLtvPercent] = useState<number>(55); // 55% LTV

  // Dynamic calculations
  const calculatedDryPowder = (ticketAmount * (ltvPercent / 100)).toLocaleString();
  const annualInterest = Math.round(ticketAmount * (0.0535 + spreadBps / 10000)).toLocaleString();
  const peProjectedExit = Math.round(ticketAmount * Math.pow(1 + 0.185, 6)).toLocaleString();
  const taxSavingsEst = Math.round(ticketAmount * 0.34).toLocaleString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-[#0a0e1c] border border-white/10 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-gradient-to-r from-[#0d1326] to-[#0a0e1c]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-blue-500/20 to-blue-700/10 text-[#99b6ff] flex items-center justify-center border border-blue-400/30 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">calculate</span>
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#34d399] uppercase tracking-widest">
                Advisory Simulation Engine
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

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-sm">
          {/* Top Context Strip */}
          <div className="bg-[#050811] p-3.5 rounded-xl border border-white/[0.06] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#7a8096] uppercase font-mono block">Target Collateral Baseline</span>
              <span className="font-semibold text-white text-sm sm:text-base">$4,550,000 Discretionary Equities</span>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#34d399]/15 text-[#34d399] font-mono font-semibold border border-[#34d399]/30">
              {product.conversionProbability}
            </span>
          </div>

          {/* Interactive Sliders */}
          <div className="space-y-4 bg-white/[0.02] p-4 sm:p-5 rounded-xl border border-white/[0.06]">
            <div>
              <div className="flex justify-between items-center mb-1.5 font-mono">
                <label className="text-xs text-[#7a8096]">Facility / Ticket Principal Size</label>
                <span className="text-base font-mono font-bold text-white tnum">
                  ${ticketAmount.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="500000"
                max="8000000"
                step="250000"
                value={ticketAmount}
                onChange={(e) => setTicketAmount(Number(e.target.value))}
                className="w-full accent-blue-500 bg-[#050811] h-2 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#7a8096] mt-1 font-mono">
                <span>$500k</span>
                <span>$4.0M</span>
                <span>$8.0M</span>
              </div>
            </div>

            {product.id === 'lombard-credit' && (
              <>
                <div>
                  <div className="flex justify-between items-center mb-1.5 font-mono">
                    <label className="text-xs text-[#7a8096]">LTV Margin Ceiling</label>
                    <span className="text-base font-mono font-bold text-[#34d399] tnum">{ltvPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="75"
                    step="5"
                    value={ltvPercent}
                    onChange={(e) => setLtvPercent(Number(e.target.value))}
                    className="w-full accent-[#34d399] bg-[#050811] h-2 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#7a8096] mt-1 font-mono">
                    <span>30% (Conservative)</span>
                    <span>55% (Recommended)</span>
                    <span>75% (Maximum)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5 font-mono">
                    <label className="text-xs text-[#7a8096]">Margin Pricing (SOFR + bps)</label>
                    <span className="text-base font-mono font-bold text-amber-300 tnum">+{spreadBps} bps</span>
                  </div>
                  <input
                    type="range"
                    min="75"
                    max="200"
                    step="5"
                    value={spreadBps}
                    onChange={(e) => setSpreadBps(Number(e.target.value))}
                    className="w-full accent-amber-400 bg-[#050811] h-2 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </>
            )}
          </div>

          {/* Real-time Calculation Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#050811] p-4 rounded-xl border border-white/[0.06]">
              <span className="text-[10px] text-[#7a8096] uppercase tracking-wider font-mono block">
                {product.id === 'lombard-credit'
                  ? 'Projected Dry Powder'
                  : product.id === 'pe-coinvest'
                  ? '6-Yr Projected Exit'
                  : 'Fiduciary Tax Shield'}
              </span>
              <span className="text-lg sm:text-xl font-bold font-mono text-[#34d399] block mt-1 tnum">
                {product.id === 'lombard-credit'
                  ? `$${calculatedDryPowder}`
                  : product.id === 'pe-coinvest'
                  ? `$${peProjectedExit}`
                  : `$${taxSavingsEst}`}
              </span>
              <span className="text-[11px] text-[#7a8096] mt-0.5 block">
                {product.id === 'lombard-credit'
                  ? 'Commercial deployment ready'
                  : product.id === 'pe-coinvest'
                  ? 'At 18.5% target net IRR'
                  : 'Multi-jurisdiction lock'}
              </span>
            </div>

            <div className="bg-[#050811] p-4 rounded-xl border border-white/[0.06]">
              <span className="text-[10px] text-[#7a8096] uppercase tracking-wider font-mono block">
                {product.id === 'lombard-credit' ? 'Est. Annual Carry' : 'Syndication / Structuring Fee'}
              </span>
              <span className="text-lg sm:text-xl font-bold font-mono text-amber-200 block mt-1 tnum">
                {product.id === 'lombard-credit' ? `$${annualInterest}/yr` : `+$${product.annualFeeEst.toLocaleString()}`}
              </span>
              <span className="text-[11px] text-[#7a8096] mt-0.5 block">
                {product.id === 'lombard-credit' ? 'SOFR benchmarked float' : 'Direct RM alpha accretion'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#0a0e1c] border-t border-white/[0.08] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#7a8096] hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onPushToApp(product.title, `$${ticketAmount.toLocaleString()}`);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] hover:from-[#2563eb] hover:to-[#3b82f6] text-white flex items-center gap-2 shadow-md transition-all active:scale-[0.98] border border-blue-400/30"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            <span>Push Simulation to Vault</span>
          </button>
        </div>
      </div>
    </div>
  );
};
