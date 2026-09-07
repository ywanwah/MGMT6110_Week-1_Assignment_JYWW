import React, { useState } from 'react';
import { ClientProfile, RecommendationProduct, HorizonMilestone } from '../types';
import { HORIZON_MILESTONES } from '../data/mockData';

interface FiveYearOpportunityScreenProps {
  activeClient: ClientProfile;
  recommendations: RecommendationProduct[];
  onOpenSimulate: (product: RecommendationProduct) => void;
  onOpenTermSheet: (product: RecommendationProduct) => void;
  onPushToApp: (productTitle: string, facilityValue: string) => void;
  onShowToast: (title: string, message: string, isSuccess?: boolean) => void;
}

export const FiveYearOpportunityScreen: React.FC<FiveYearOpportunityScreenProps> = ({
  activeClient,
  recommendations,
  onOpenSimulate,
  onOpenTermSheet,
  onPushToApp,
  onShowToast,
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const currentMilestone: HorizonMilestone = HORIZON_MILESTONES[selectedYear] || HORIZON_MILESTONES[2025];

  const milestoneYears = [2025, 2026, 2027, 2028, 2030];

  return (
    <div className="flex flex-col w-full space-y-4 pb-4">
      {/* Executive Client Header Strip */}
      <div className="hnw-card rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-48 h-48 bg-amber-400/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start justify-between relative z-10 gap-3">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-amber-300 uppercase tracking-widest font-mono font-bold">
                STEWARDSHIP MANDATE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-[10px] text-[#7a8096] font-mono">HORIZON 2025–2030</span>
            </div>
            <h2 className="text-xl sm:text-2xl text-white font-bold tracking-tight font-display">
              5-Year Growth &amp; Advisory Radar
            </h2>
            <p className="text-xs text-[#b8bdd0] truncate">
              Autonomous Conversion Engine • Targeted Mandate: <strong className="text-white">{activeClient.name}</strong>
            </p>
          </div>
          <div className="shrink-0 text-right bg-white/[0.03] px-3.5 py-2.5 rounded-xl border border-white/[0.08] shadow-inner">
            <span className="text-[10px] text-[#7a8096] block font-mono font-medium uppercase tracking-wider">
              Growth Vector
            </span>
            <span className="text-xl sm:text-2xl text-[#34d399] font-bold font-display">
              {activeClient.growthVector}
            </span>
          </div>
        </div>
      </div>

      {/* Life-Stage Gap Analysis Card */}
      <div className="hnw-card rounded-2xl p-5 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-amber-300 text-[20px]">donut_large</span>
            <span className="text-base text-white font-semibold font-display tracking-tight">
              Institutional Penetration
            </span>
          </div>
          <span className="text-[11px] bg-amber-400/10 text-amber-200 px-3 py-0.5 rounded-full font-mono font-semibold border border-amber-400/25">
            5 / 12 Capabilities Active
          </span>
        </div>

        {/* Segmented Penetration Bar */}
        <div className="space-y-2">
          <div className="h-2.5 w-full bg-[#050811] rounded-full overflow-hidden flex gap-0.5 p-0.5 border border-white/[0.06]">
            <div
              className="h-full bg-[#34d399] w-[41.6%] rounded-l-full transition-all duration-500 shadow-[0_0_8px_rgba(52,211,153,0.4)]"
              title="Active Mandates (41.6%)"
            />
            <div
              className="h-full bg-amber-400 w-[33.3%] transition-all duration-500 shadow-[0_0_8px_rgba(251,191,36,0.4)]"
              title="Target Core (33.3%)"
            />
            <div
              className="h-full bg-[#262c3e] flex-1 rounded-r-full transition-all duration-500"
              title="Untapped Potential (25.1%)"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-[#b8bdd0] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#34d399]" /> Active (5)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Target Core (4)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#262c3e]" /> Unassigned (3)
            </span>
          </div>
        </div>

        {/* Gap Alert Badges */}
        <div className="pt-1 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onShowToast('Opportunity Radar', 'Structured Credit gap identified: $4.55M unleveraged collateral.', false)}
            className="bg-white/[0.03] hover:bg-white/[0.06] px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/[0.06] transition-all"
          >
            <span className="material-symbols-outlined text-amber-400 text-[14px]">warning</span>
            <span className="text-[11px] text-[#e8ecf8]">
              Structured Credit: <span className="text-amber-300 font-semibold font-mono">Zero Exposure</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => onShowToast('Opportunity Radar', 'Private Equity: High liquidity surplus available for deployment.', false)}
            className="bg-white/[0.03] hover:bg-white/[0.06] px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/[0.06] transition-all"
          >
            <span className="material-symbols-outlined text-[#99b6ff] text-[14px]">tune</span>
            <span className="text-[11px] text-[#e8ecf8]">
              Private Equity: <span className="text-[#99b6ff] font-semibold font-mono">Sub-Allocated</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => onShowToast('Opportunity Radar', 'Trust & Fiduciary: Milestone approaching for multi-jurisdiction shield.', false)}
            className="bg-white/[0.03] hover:bg-white/[0.06] px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/[0.06] transition-all"
          >
            <span className="material-symbols-outlined text-[#34d399] text-[14px]">shield</span>
            <span className="text-[11px] text-[#e8ecf8]">
              Trust Fiduciary: <span className="text-[#34d399] font-semibold font-mono">Milestone Approaching</span>
            </span>
          </button>
        </div>
      </div>

      {/* Module 1: 5-Year Horizon Projection Card */}
      <div className="hnw-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#7a8096] uppercase font-mono font-semibold tracking-wider block">
              Wealth Trajectory
            </span>
            <h3 className="text-base text-white font-semibold font-display tracking-tight">
              Milestone Roadmap (2025–2030)
            </h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#7a8096] font-mono uppercase block">Target Trajectory</span>
            <div className="text-sm text-[#34d399] font-bold font-mono tnum">
              $14.85M → $28.50M
            </div>
          </div>
        </div>

        {/* Timeline Selector Buttons */}
        <div className="grid grid-cols-5 gap-1.5 bg-[#050811] p-1.5 rounded-xl border border-white/[0.06]">
          {milestoneYears.map((year) => {
            const milestone = HORIZON_MILESTONES[year];
            const isSelected = selectedYear === year;
            return (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={`py-2 px-1 rounded-lg text-center transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white font-semibold shadow-md border border-blue-400/30'
                    : 'text-[#b8bdd0] hover:bg-white/[0.04]'
                }`}
              >
                <div className="text-[11px] font-semibold font-mono">{year}</div>
                <div className="text-[9px] truncate opacity-85 font-mono">{milestone.label}</div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Milestone Panel */}
        <div className="bg-white/[0.02] rounded-xl p-4 sm:p-5 space-y-3.5 relative overflow-hidden border border-white/[0.06]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span
                className={`text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full font-semibold inline-block ${currentMilestone.badgeColor}`}
              >
                {currentMilestone.badge}
              </span>
              <h4 className="text-base sm:text-lg text-white font-semibold mt-1.5 font-display leading-snug">
                {currentMilestone.title}
              </h4>
              <p className="text-xs text-[#b8bdd0] mt-1 leading-relaxed">
                {currentMilestone.desc}
              </p>
            </div>
            <div className="shrink-0 text-right bg-[#050811] px-3.5 py-2 rounded-xl border border-white/[0.06]">
              <span className="text-[10px] text-[#7a8096] block font-mono">Est. Net Worth</span>
              <span className="text-lg sm:text-xl text-white font-bold font-mono tnum">
                {currentMilestone.nw}
              </span>
            </div>
          </div>

          {/* Trajectory Micro Sparkline Chart SVG */}
          <div className="pt-2">
            <div className="flex justify-between text-[11px] text-[#7a8096] mb-1.5 font-mono">
              <span>PROJECTED WEALTH TRAJECTORY</span>
              <span className="text-[#34d399] font-semibold">
                {currentMilestone.growthDelta}
              </span>
            </div>
            <div className="h-20 w-full bg-[#050811] rounded-xl p-2.5 flex items-end border border-white/[0.05]">
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 320 60">
                <defs>
                  <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,50 L 60,45 L 130,36 L 200,24 L 260,15 L 320,5 L 320,60 L 0,60 Z"
                  fill="url(#chartGrad)"
                />
                <path
                  d="M 0,50 L 60,45 L 130,36 L 200,24 L 260,15 L 320,5"
                  stroke="#99b6ff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
                {milestoneYears.map((yr) => {
                  const m = HORIZON_MILESTONES[yr];
                  const isCur = yr === selectedYear;
                  return (
                    <circle
                      key={yr}
                      cx={m.cx}
                      cy={m.cy}
                      r={isCur ? '6' : '3.5'}
                      className={`cursor-pointer transition-all duration-300 ${
                        isCur
                          ? 'fill-[#34d399] stroke-white stroke-[2px] filter drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]'
                          : 'fill-[#7a8096] hover:fill-white'
                      }`}
                      onClick={() => setSelectedYear(yr)}
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Module 2: AI-Driven Cross-Sell Product Radar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-[11px] text-[#34d399] font-mono font-semibold uppercase tracking-wider">
                Predictive Advisory Engine
              </span>
            </div>
            <h3 className="text-base text-white font-semibold font-display tracking-tight">
              High-Probability Confidential Recommendations
            </h3>
          </div>
          <span className="text-[11px] text-[#7a8096] font-mono">Sorted by RM Alpha</span>
        </div>

        {/* Product Cards */}
        {recommendations.map((product) => (
          <div
            key={product.id}
            className="hnw-card rounded-2xl p-5 space-y-3.5 relative overflow-hidden transition-all border border-white/[0.08]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-semibold ${product.categoryBadgeColor}`}>
                    {product.category}
                  </span>
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-semibold ${product.tagBadgeColor}`}>
                    {product.tag}
                  </span>
                </div>
                <h4 className="text-base text-white font-semibold font-display leading-snug">
                  {product.title}
                </h4>
                <p className="text-xs text-[#b8bdd0] leading-relaxed">{product.trigger}</p>
              </div>
              <div className="text-right shrink-0 bg-white/[0.03] px-3 py-2 rounded-xl border border-white/[0.08]">
                <span className="text-[10px] text-[#7a8096] font-mono block">Match Score</span>
                <span className="text-xl text-[#34d399] font-bold font-mono tnum">
                  {product.matchScore}%
                </span>
              </div>
            </div>

            {/* Financial Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5 bg-[#050811] p-3.5 rounded-xl border border-white/[0.05]">
              <div>
                <span className="text-[10px] text-[#7a8096] block uppercase tracking-wider font-mono">
                  {product.proposedMetricLabel}
                </span>
                <span className="text-base font-mono text-white font-bold tnum">
                  {product.proposedMetricValue}
                </span>
                <span className="text-[10px] text-[#b8bdd0] block truncate">
                  {product.proposedMetricSub}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#7a8096] block uppercase tracking-wider font-mono">
                  {product.impactMetricLabel}
                </span>
                <span className="text-base font-mono text-[#34d399] font-bold tnum">
                  {product.impactMetricValue}
                </span>
                <span className="text-[10px] text-[#b8bdd0] block truncate">
                  {product.impactMetricSub}
                </span>
              </div>
            </div>

            {/* Conversion Probability Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-[#b8bdd0] font-mono">
                <span>CONVERSION PROBABILITY</span>
                <span className="text-[#34d399] font-semibold">
                  {product.conversionProbability}
                </span>
              </div>
              <div className="w-full bg-[#050811] h-1.5 rounded-full overflow-hidden border border-white/[0.04]">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-[#34d399] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                  style={{ width: `${product.conversionPercent}%` }}
                />
              </div>
            </div>

            {/* Opportunity Action Bar */}
            <div className="pt-1 grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => onOpenSimulate(product)}
                className="py-2.5 px-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs flex flex-col items-center justify-center gap-1 text-center transition-all border border-white/[0.06] active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[19px] text-[#99b6ff]">calculate</span>
                <span className="font-semibold text-[11px]">Simulate</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenTermSheet(product)}
                className="py-2.5 px-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs flex flex-col items-center justify-center gap-1 text-center transition-all border border-white/[0.06] active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[19px] text-amber-300">description</span>
                <span className="font-semibold text-[11px]">Term Sheet</span>
              </button>
              <button
                type="button"
                onClick={() => onPushToApp(product.title, product.proposedMetricValue)}
                className={`py-2.5 px-1.5 rounded-xl text-xs flex flex-col items-center justify-center gap-1 text-center shadow-md transition-all active:scale-[0.98] ${
                  product.pushed
                    ? 'bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/40'
                    : 'bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] hover:from-[#2563eb] hover:to-[#3b82f6] text-white border border-blue-400/30'
                }`}
              >
                <span className="material-symbols-outlined text-[19px]">
                  {product.pushed ? 'done_all' : 'send'}
                </span>
                <span className="font-semibold text-[11px]">
                  {product.pushed ? 'Vault Sent' : 'Push to App'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
