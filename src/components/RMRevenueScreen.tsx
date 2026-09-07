import React, { useState } from 'react';
import { ClientProfile, CrossSellInflow } from '../types';
import {
  COMPETITOR_RADAR_ITEMS,
  EXISTING_REVENUE_RUNRATE,
} from '../data/mockData';

interface RMRevenueScreenProps {
  activeClient: ClientProfile;
  crossSellInflows: CrossSellInflow[];
  onToggleStage: (id: string) => void;
  onOpenPricingModal: () => void;
  onOpenDeskHeadModal: () => void;
  onCommitPipeline: () => void;
  onShowToast: (title: string, message: string, isSuccess?: boolean) => void;
}

export const RMRevenueScreen: React.FC<RMRevenueScreenProps> = ({
  activeClient,
  crossSellInflows,
  onToggleStage,
  onOpenPricingModal,
  onOpenDeskHeadModal,
  onCommitPipeline,
  onShowToast,
}) => {
  const [pipelineCommitted, setPipelineCommitted] = useState(false);

  // Calculate dynamic totals based on staged items
  const baseRevenue = 142500;
  const pipelineAlpha = crossSellInflows
    .filter((item) => item.staged)
    .reduce((acc, item) => acc + item.amountNumeric, 0);

  const totalProjected = baseRevenue + pipelineAlpha;
  const upliftPercent = Math.round((pipelineAlpha / baseRevenue) * 100);
  const currentRatio = Math.round((baseRevenue / totalProjected) * 100);
  const pipelineRatio = 100 - currentRatio;

  const rmCommission = Math.round(totalProjected * 0.15);

  const handleCommit = () => {
    setPipelineCommitted(true);
    onCommitPipeline();
  };

  return (
    <div className="flex flex-col w-full space-y-4 pb-4">
      {/* Revenue Header Strip */}
      <div className="hnw-card rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-amber-400/20 to-amber-600/10 text-amber-300 flex items-center justify-center border border-amber-400/30 shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">analytics</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white tracking-tight font-display">Revenue &amp; Wallet Intelligence</span>
              <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#34d399]/15 text-[#34d399] font-mono font-bold border border-[#34d399]/30">
                ACTIVE MANDATE
              </span>
            </div>
            <p className="text-[11px] text-[#7a8096] truncate font-mono mt-0.5">
              Client Book: {activeClient.name} • Zurich Desk
            </p>
          </div>
        </div>
        <div className="text-right shrink-0 bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/[0.06]">
          <span className="text-[9px] text-[#7a8096] uppercase block font-mono">BOOK TIER</span>
          <span className="text-xs font-bold text-amber-200 font-mono">Tier 1 Sovereign</span>
        </div>
      </div>

      {/* Total Projected Annual Value Card */}
      <div className="hnw-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-mono font-semibold text-[#7a8096] tracking-widest">
            Total Projected Annual Value
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#34d399]/15 text-[#34d399] font-mono font-semibold flex items-center gap-1 border border-[#34d399]/30">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            +{upliftPercent}% Alpha Uplift
          </span>
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-bold text-white font-mono tracking-tight tnum">
              ${totalProjected.toLocaleString()}
            </span>
            <span className="text-xs text-[#7a8096] font-mono">USD / ANNUM</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="h-2.5 w-full bg-[#050811] rounded-full overflow-hidden flex gap-0.5 p-0.5 border border-white/[0.06]">
            <div
              className="h-full bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] rounded-l-full transition-all duration-500 shadow-sm"
              style={{ width: `${currentRatio}%` }}
            />
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-[#34d399] rounded-r-full transition-all duration-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
              style={{ width: `${pipelineRatio}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-[#b8bdd0] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3b82f6]" /> Current: $142.5k ({currentRatio}%)
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-[#34d399]">
              <span className="w-2 h-2 rounded-full bg-[#34d399]" /> Pipeline: +${(pipelineAlpha / 1000).toFixed(1)}k ({pipelineRatio}%)
            </span>
          </div>
        </div>

        {/* Incentive & Alpha Cards */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.06]">
            <div className="flex items-center justify-between text-amber-300">
              <span className="text-[10px] uppercase font-mono font-semibold text-[#7a8096]">RM Commission</span>
              <span className="material-symbols-outlined text-[18px]">military_tech</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-amber-300 font-mono mt-1 tnum">
              ${rmCommission.toLocaleString()}
            </div>
            <span className="text-[10px] text-[#7a8096] block mt-0.5 font-mono">
              • 15% Sovereign Tier Incentive
            </span>
          </div>

          <div className="bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.06]">
            <div className="flex items-center justify-between text-[#34d399]">
              <span className="text-[10px] uppercase font-mono font-semibold text-[#7a8096]">Cross-Sell Alpha</span>
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#34d399] font-mono mt-1 tnum">
              +${pipelineAlpha.toLocaleString()}
            </div>
            <span className="text-[10px] text-[#7a8096] block mt-0.5 font-mono">
              • {crossSellInflows.filter((i) => i.staged).length} Staged Facilities
            </span>
          </div>
        </div>
      </div>

      {/* Target Cross-Sell Inflows */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-300 text-[20px]">bolt</span>
            <h3 className="text-base font-semibold text-white font-display tracking-tight">
              Target Cross-Sell Inflows
            </h3>
          </div>
          <span className="text-[11px] text-[#7a8096] font-mono">RANKED BY ALPHA</span>
        </div>

        <div className="space-y-2.5">
          {crossSellInflows.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all ${
                item.staged
                  ? 'bg-[#151c30] border-[#34d399]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">{item.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-[#99b6ff] font-mono uppercase font-semibold border border-white/[0.08]">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#b8bdd0]">{item.subtext}</p>
                </div>

                <div className="flex flex-col items-end shrink-0 gap-2">
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-[#34d399] block tnum">
                      {item.feeText}
                    </span>
                    <span className="text-[10px] text-[#7a8096] font-mono block">
                      {item.subFeeText}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onToggleStage(item.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                      item.staged
                        ? 'bg-[#34d399] text-[#002819] shadow-[0_0_12px_rgba(52,211,153,0.5)] font-bold'
                        : 'bg-white/[0.04] text-[#e8ecf8] hover:bg-white/[0.08] border border-white/10'
                    }`}
                  >
                    {item.staged ? 'Staged ✓' : 'Stage Mandate'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* External Wallet & Competitor Radar */}
      <div className="hnw-card rounded-2xl p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-amber-300 text-[22px] mt-0.5">radar</span>
            <div>
              <h3 className="text-base font-semibold text-white font-display tracking-tight">
                External Wallet &amp; Competitor Radar
              </h3>
              <p className="text-xs text-[#7a8096]">Top 3 Rival Private Banking Brands in Consideration</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 font-semibold border border-amber-400/30 shrink-0">
            DEFENSE PROTOCOL ACTIVE
          </span>
        </div>

        {/* Liquid Wallet Split Bar */}
        <div className="bg-[#050811] p-3.5 rounded-xl border border-white/[0.06] space-y-2.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[#7a8096]">TOTAL ESTIMATED LIQUID WALLET: $26.65M</span>
            <span className="text-amber-300 font-semibold">45% Held Outside</span>
          </div>
          <div className="h-2.5 w-full bg-[#1c233a] rounded-full overflow-hidden flex p-0.5 border border-white/[0.05]">
            <div className="h-full bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] rounded-l-full w-[55%]" title="MBAI Share (55%)" />
            <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-r-full w-[45%]" title="Rival Wallet (45%)" />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-[#7a8096]">
            <span className="text-[#99b6ff] font-medium">• Sovereign Desk Share: 55% ($14.85M TRV)</span>
            <span className="text-amber-200 font-medium">• Rival Wallet: 45% (~$11.80M)</span>
          </div>
        </div>

        {/* Competitor Cards */}
        <div className="space-y-3 pt-1">
          {COMPETITOR_RADAR_ITEMS.map((comp) => (
            <div
              key={comp.id}
              className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.06] space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#050811] flex items-center justify-center text-amber-200 border border-white/10 shrink-0">
                    <span className="material-symbols-outlined text-[17px]">{comp.iconName}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-white">{comp.name}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono ${comp.statusBadgeColor}`}>
                        {comp.statusBadge}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-bold font-mono text-white block tnum">{comp.amount}</span>
                  <span className="text-[10px] text-[#7a8096] font-mono block">{comp.subtitle}</span>
                </div>
              </div>

              <p className="text-xs text-[#b8bdd0] leading-relaxed pl-11">
                {comp.details}
              </p>

              {/* Defense Bar */}
              <div className="bg-[#050811] p-2.5 rounded-xl border border-white/[0.04] flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-[#34d399] text-[16px] shrink-0">
                    shield
                  </span>
                  <span className="text-[11px] text-[#e8ecf8] truncate">
                    <strong className="text-[#34d399] font-mono">{comp.defenseTitle}:</strong> {comp.defenseText}
                  </span>
                </div>
                <span className={`text-[9px] font-mono font-bold shrink-0 ${comp.threatColor}`}>
                  {comp.threatLevel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Q3 Performance Horizon */}
      <div className="hnw-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#34d399] text-[20px]">verified</span>
            <div>
              <h3 className="text-base font-semibold text-white font-display tracking-tight">
                Q3 Performance Horizon
              </h3>
              <p className="text-xs text-[#7a8096]">Client Contribution to Sovereign RM Scorecard</p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#34d399]/15 text-[#34d399] font-mono font-semibold border border-[#34d399]/30">
            Pacing {activeClient.pacingPercentage}%
          </span>
        </div>

        {/* 3 Circular Metrics */}
        <div className="grid grid-cols-3 gap-2.5 text-center pt-1">
          {/* Gauge 1 */}
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <div className="w-14 h-14 rounded-full border-4 border-[#2563eb] flex items-center justify-center shadow-[0_0_12px_rgba(37,99,235,0.35)]">
              <span className="font-bold text-sm text-white font-mono">82%</span>
            </div>
            <span className="text-[10px] text-[#7a8096] uppercase mt-2 font-mono font-semibold tracking-wider">
              Q3 NNM Target
            </span>
            <span className="text-[11px] font-mono text-white font-medium mt-0.5 tnum">
              $4.1M / $5.0M
            </span>
          </div>

          {/* Gauge 2 */}
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <div className="w-14 h-14 rounded-full border-4 border-[#34d399] flex items-center justify-center shadow-[0_0_12px_rgba(52,211,153,0.35)]">
              <span className="font-bold text-sm text-white font-mono">91%</span>
            </div>
            <span className="text-[10px] text-[#7a8096] uppercase mt-2 font-mono font-semibold tracking-wider">
              Revenue Target
            </span>
            <span className="text-[11px] font-mono text-white font-medium mt-0.5 tnum">
              $312k / $340k
            </span>
          </div>

          {/* Gauge 3 */}
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <div className="w-14 h-14 rounded-full border-4 border-amber-400 flex items-center justify-center shadow-[0_0_12px_rgba(251,191,36,0.35)]">
              <span className="font-bold text-sm text-white font-mono">5.2</span>
            </div>
            <span className="text-[10px] text-[#7a8096] uppercase mt-2 font-mono font-semibold tracking-wider">
              Cross-Sell Ratio
            </span>
            <span className="text-[11px] font-mono text-white font-medium mt-0.5 tnum">
              Target: 6.0
            </span>
          </div>
        </div>
      </div>

      {/* Existing Revenue Run-Rate */}
      <div className="hnw-card rounded-2xl p-5 space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white font-display tracking-tight">
              Existing Revenue Run-Rate
            </h3>
            <p className="text-xs text-[#7a8096]">Baseline from 5 active relationship mandates</p>
          </div>
          <div className="text-right">
            <span className="text-base font-bold font-mono text-white block tnum">$142,500</span>
            <span className="text-[10px] text-[#7a8096] font-mono uppercase">CURRENT / YR</span>
          </div>
        </div>

        <div className="space-y-2.5 divide-y divide-white/[0.04]">
          {EXISTING_REVENUE_RUNRATE.map((item) => (
            <div key={item.id} className="pt-2.5 flex items-center justify-between text-xs">
              <div>
                <span className="text-white font-medium block">{item.name}</span>
                <span className="text-[11px] text-[#7a8096] font-mono">{item.description}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="font-mono font-bold text-white block tnum">{item.amount}</span>
                <span className="text-[10px] text-amber-200 font-mono">{item.sharePercent}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RM Decision & Execution Hub */}
      <div className="hnw-card rounded-2xl p-5 space-y-3 border border-white/[0.08]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-300 text-[20px]">tune</span>
            <h3 className="text-base font-semibold text-white font-display tracking-tight">
              RM Decision &amp; Execution Hub
            </h3>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] uppercase font-mono font-semibold text-[#34d399]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-ping" />
            DESK READY
          </span>
        </div>

        <div className="space-y-2.5 pt-1">
          {/* Button 1 */}
          <button
            type="button"
            onClick={handleCommit}
            className={`w-full py-3.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-between transition-all shadow-md active:scale-[0.99] ${
              pipelineCommitted
                ? 'bg-[#34d399] text-[#002819] font-bold'
                : 'bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] hover:from-[#2563eb] hover:to-[#3b82f6] text-white border border-blue-400/30'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[19px]">
                {pipelineCommitted ? 'task_alt' : 'lock_clock'}
              </span>
              <span>
                {pipelineCommitted ? 'Opportunities Committed to Q3 Pipeline' : 'Commit Opportunities to Q3 Pipeline'}
              </span>
            </div>
            <span className="font-mono font-bold">+${(pipelineAlpha / 1000).toFixed(1)}k</span>
          </button>

          {/* Button 2 */}
          <button
            type="button"
            onClick={onOpenDeskHeadModal}
            className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold bg-white/[0.03] hover:bg-white/[0.07] text-white flex items-center justify-between transition-all border border-white/[0.08] active:scale-[0.99]"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[19px] text-[#99b6ff]">mail</span>
              <span>Send Projections to Desk Head</span>
            </div>
            <span className="material-symbols-outlined text-[19px]">arrow_forward</span>
          </button>

          {/* Button 3 */}
          <button
            type="button"
            onClick={onOpenPricingModal}
            className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold bg-white/[0.03] hover:bg-white/[0.07] text-white flex items-center justify-between transition-all border border-white/[0.08] active:scale-[0.99]"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[19px] text-amber-300">tune</span>
              <span>Schedule Pricing Committee Exception</span>
            </div>
            <span className="text-[11px] text-amber-300 font-mono font-medium">Margin Review</span>
          </button>
        </div>
      </div>
    </div>
  );
};
