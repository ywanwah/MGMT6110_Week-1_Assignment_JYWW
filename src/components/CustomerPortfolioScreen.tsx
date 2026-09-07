import React, { useState, useEffect } from 'react';
import { ClientProfile, TabId } from '../types';
import { PORTFOLIO_ASSET_ALLOCATION, CUSTODY_ACCOUNTS } from '../data/mockData';

interface CustomerPortfolioScreenProps {
  activeClient: ClientProfile;
  onNavigateTab: (tab: TabId) => void;
  onShowToast: (title: string, message: string, isSuccess?: boolean) => void;
}

const STORAGE_KEY = 'mbai_rm_client_session_notes';

const INITIAL_CLIENT_NOTES: Record<string, string> = {
  'alexander-sterling':
    'Session 07/09: Discussed releasing liquidity from Kensington real estate equity via a $3.5M Lombard credit facility against the Zurich depository holding. Alexander expressed strong appetite for Private Equity Vintage VI ($2.0M commitment ticket) to diversify outside real estate. Cautious regarding cross-border family trust restructuring tax covenants before year-end.',
  'victoria-chen':
    'Session 04/09: Victoria requested term sheet analysis on sovereign green bond allocations and multi-currency cash yields. Following up on family office tax jurisdiction structuring in Zurich/Singapore.',
  'marcus-vance':
    'Session 01/09: Liquidity event on biotech series C exit expected in October (~$8.5M). Advised on low-volatility structured credit tranches and short-duration treasury yields.',
};

export const CustomerPortfolioScreen: React.FC<CustomerPortfolioScreenProps> = ({
  activeClient,
  onNavigateTab,
  onShowToast,
}) => {
  const [selectedAssetCategory, setSelectedAssetCategory] = useState<string | null>(null);
  const [accounts, setAccounts] = useState(CUSTODY_ACCOUNTS);
  const [filterAccount, setFilterAccount] = useState<'all' | 'optimal' | 'excess'>('all');

  // Notes state per client
  const [clientNotes, setClientNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_CLIENT_NOTES, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return INITIAL_CLIENT_NOTES;
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  const currentNote = clientNotes[activeClient.id] ?? '';

  // Reset unsaved changes flag when active client switches
  useEffect(() => {
    setHasUnsavedChanges(false);
  }, [activeClient.id]);

  const handleNoteChange = (newText: string) => {
    setClientNotes((prev) => ({
      ...prev,
      [activeClient.id]: newText,
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveNotes = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clientNotes));
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastSavedTime(timeString);
      setHasUnsavedChanges(false);
      onShowToast(
        'Session Notes Saved',
        `Confidential RM context for ${activeClient.name} updated successfully at ${timeString}.`,
        true
      );
    } catch {
      onShowToast('Save Error', 'Failed to save notes to local storage.', false);
    }
  };

  const handleInsertSnippet = (snippet: string) => {
    const updated = currentNote ? `${currentNote}\n${snippet}` : snippet;
    handleNoteChange(updated);
  };

  const handleInsertTimestamp = () => {
    const now = new Date();
    const stamp = `[${now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}] `;
    const updated = currentNote ? `${currentNote}\n${stamp}` : stamp;
    handleNoteChange(updated);
  };

  const wordCount = currentNote.trim() ? currentNote.trim().split(/\s+/).length : 0;

  const filteredAccounts = accounts.filter((acc) => {
    if (filterAccount === 'optimal') return acc.status === 'OPTIMAL';
    if (filterAccount === 'excess') return acc.status === 'EXCESS CASH';
    return true;
  });

  return (
    <div className="flex flex-col w-full space-y-4 pb-4">
      {/* Client Overview Card */}
      <div className="hnw-card rounded-2xl p-5 sm:p-6 relative overflow-hidden">
        {/* Subtle Luxury Radial Glow */}
        <div className="absolute -right-12 -top-12 w-56 h-56 bg-amber-400/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-56 h-56 bg-blue-500/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="p-0.5 rounded-full bg-gradient-to-b from-amber-300/40 via-white/10 to-amber-400/20 shadow-lg">
                <img
                  src={activeClient.avatarUrl}
                  alt={activeClient.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#0a0e1a]"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#34d399] border-2 border-[#0a0e1a] shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight">
                  {activeClient.name}
                </h2>
                <span className="hnw-gold-pill text-[10px] font-mono px-2.5 py-0.5 rounded-full font-semibold">
                  {activeClient.tier}
                </span>
              </div>
              <p className="text-xs text-[#b8bdd0] mt-0.5 font-medium">{activeClient.title}</p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-[#7a8096] font-mono">
                <span className="material-symbols-outlined text-[14px] text-amber-300">verified</span>
                <span>ZURICH VAULT #CH-8821 • SOVEREIGN ACCREDITED</span>
              </div>
            </div>
          </div>

          {/* Key Metric Highlight */}
          <div className="flex items-center gap-3 self-start sm:self-auto bg-white/[0.03] backdrop-blur-md px-4 py-3 rounded-2xl border border-white/[0.08] shadow-inner shadow-white/[0.03]">
            <div>
              <span className="text-[10px] text-[#7a8096] uppercase font-mono font-semibold tracking-wider block">
                Total Relationship Value (TRV)
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight tnum">
                  ${(activeClient.totalRelationshipValue / 1000000).toFixed(2)}M
                </span>
                <span className="text-[10px] text-amber-300/80 font-mono">USD</span>
              </div>
            </div>
            <div className="pl-4 border-l border-white/[0.08] text-right">
              <span className="text-[10px] text-[#7a8096] uppercase font-mono font-semibold tracking-wider block">
                YTD Alpha
              </span>
              <span className="text-lg font-bold font-mono text-[#34d399] tracking-tight tnum mt-0.5 block">
                +14.2%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Callout: 5-Yr Growth Opportunity Radar Banner */}
      <div className="hnw-card rounded-2xl p-4 sm:p-5 relative overflow-hidden border border-amber-400/25 bg-gradient-to-r from-[#12182b] via-[#182038] to-[#12182b] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-amber-400/20 to-amber-600/10 text-amber-300 flex items-center justify-center border border-amber-400/30 shadow-[0_0_15px_rgba(212,175,55,0.2)] shrink-0">
              <span className="material-symbols-outlined text-[24px]">explore</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase font-bold text-amber-200 tracking-wider font-mono">
                  Sovereign 5-Year Horizon Radar
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#34d399]/15 text-[#34d399] font-mono font-bold border border-[#34d399]/30">
                  4 Unlocked Triggers
                </span>
              </div>
              <p className="text-xs text-[#b8bdd0] mt-1 leading-relaxed">
                Identified <strong className="text-white font-mono">+$118.2k</strong> in cross-sell revenue and <strong className="text-[#34d399] font-mono">+92.5%</strong> portfolio expansion trajectory.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('5-yr-opportunity')}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] hover:from-[#2563eb] hover:to-[#3b82f6] text-white flex items-center gap-2 shadow-[0_4px_15px_rgba(37,99,235,0.4)] transition-all active:scale-[0.98] border border-blue-400/30 shrink-0"
          >
            <span>Launch Advisory Radar</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Asset Allocation Breakdown */}
      <div className="hnw-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white font-display tracking-tight">
              Asset Allocation &amp; Balance Sheet
            </h3>
            <p className="text-xs text-[#7a8096]">Consolidated across global SPVs and custody holdings</p>
          </div>
          <span className="text-xs font-mono text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
            Target 100% Core
          </span>
        </div>

        {/* Segmented Multi-Bar Chart */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-[#050811] rounded-full overflow-hidden flex gap-0.5 p-0.5 border border-white/[0.06]">
            {PORTFOLIO_ASSET_ALLOCATION.map((asset) => (
              <div
                key={asset.label}
                className="h-full rounded-xs transition-all duration-300 hover:brightness-125 cursor-pointer hover:scale-y-110"
                style={{
                  width: `${asset.percent}%`,
                  backgroundColor: asset.color,
                }}
                title={`${asset.label}: ${asset.percent}% ($${(asset.value / 1000000).toFixed(2)}M)`}
                onClick={() =>
                  setSelectedAssetCategory(
                    selectedAssetCategory === asset.label ? null : asset.label
                  )
                }
              />
            ))}
          </div>

          <div className="flex justify-between items-center text-[10px] text-[#7a8096] font-mono px-1">
            <span>$14.85M TOTAL VALUE</span>
            <span>100% ACCREDITED ALLOCATION</span>
          </div>
        </div>

        {/* Legend Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
          {PORTFOLIO_ASSET_ALLOCATION.map((asset) => {
            const isSelected = selectedAssetCategory === asset.label;
            return (
              <div
                key={asset.label}
                onClick={() =>
                  setSelectedAssetCategory(
                    isSelected ? null : asset.label
                  )
                }
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#1e263d] border-amber-300/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                    : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: asset.color }}
                  />
                  <span className="text-[#e8ecf8] font-medium truncate">{asset.label}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-white block tnum">
                    ${(asset.value / 1000000).toFixed(2)}M
                  </span>
                  <span className="text-[10px] text-[#7a8096] font-mono">{asset.percent}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custody Accounts & Legal SPVs */}
      <div className="hnw-card rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <h3 className="text-base font-semibold text-white font-display tracking-tight">
              Custody Accounts &amp; Legal SPVs
            </h3>
            <p className="text-xs text-[#7a8096]">5 Active custodial depositories under management</p>
          </div>

          {/* Account Filter Pills */}
          <div className="flex items-center gap-1 bg-[#050811] p-1 rounded-xl border border-white/[0.06] self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setFilterAccount('all')}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono font-medium transition-all ${
                filterAccount === 'all'
                  ? 'bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white shadow-sm'
                  : 'text-[#7a8096] hover:text-white'
              }`}
            >
              All (5)
            </button>
            <button
              type="button"
              onClick={() => setFilterAccount('optimal')}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono font-medium transition-all ${
                filterAccount === 'optimal'
                  ? 'bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white shadow-sm'
                  : 'text-[#7a8096] hover:text-white'
              }`}
            >
              Optimal
            </button>
            <button
              type="button"
              onClick={() => setFilterAccount('excess')}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono font-medium transition-all ${
                filterAccount === 'excess'
                  ? 'bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white shadow-sm'
                  : 'text-[#7a8096] hover:text-white'
              }`}
            >
              Excess Cash
            </button>
          </div>
        </div>

        {/* Account Cards */}
        <div className="space-y-2.5">
          {filteredAccounts.map((account) => (
            <div
              key={account.id}
              className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.05] space-y-2 hover:border-white/15 hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white truncate">
                      {account.name}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full border uppercase font-bold ${account.statusColor}`}
                    >
                      {account.status}
                    </span>
                  </div>
                  <span className="text-xs text-[#99b6ff] block font-mono">{account.type}</span>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-base font-bold font-mono text-white block tnum">
                    {account.balance}
                  </span>
                  <span className="text-[10px] text-[#34d399] font-mono font-medium">
                    {account.ytdReturn} YTD
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-[#7a8096] border-t border-white/[0.04] font-mono">
                <span className="truncate">{account.sub}</span>
                <span className="text-amber-300 font-semibold shrink-0 ml-2">
                  {account.currency}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RM Session Notes & Meeting Context */}
      <div className="hnw-card rounded-2xl p-5 space-y-3.5 border border-white/[0.08]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-amber-400/20 to-amber-600/10 text-amber-300 flex items-center justify-center border border-amber-400/30 shrink-0">
              <span className="material-symbols-outlined text-[19px]">edit_note</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold text-white font-display tracking-tight">
                  RM Session Notes &amp; Meeting Context
                </h3>
                <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-white/[0.06] text-amber-200 font-mono font-semibold border border-amber-400/20">
                  {activeClient.name.split(' ')[0]} Context
                </span>
              </div>
              <p className="text-xs text-[#7a8096]">
                Confidential relationship manager debriefs, structuring covenants &amp; next actions
              </p>
            </div>
          </div>
          <span className="text-[9px] uppercase tracking-wider font-mono font-semibold px-2 py-0.5 rounded-full bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/20 shrink-0">
            CONFIDENTIAL VAULT
          </span>
        </div>

        {/* Text Area */}
        <div className="space-y-2.5">
          <textarea
            id="rm-session-notes-textarea"
            rows={4}
            value={currentNote}
            onChange={(e) => handleNoteChange(e.target.value)}
            placeholder={`Record confidential briefing context, risk appetite nuances, and key discussion takeaways for ${activeClient.name}...`}
            className="w-full bg-[#050811] border border-white/10 focus:border-amber-400/60 rounded-xl p-4 text-xs text-[#e8ecf8] placeholder-[#7a8096]/60 focus:outline-none focus:ring-1 focus:ring-amber-400/60 leading-relaxed resize-y min-h-[115px] transition-colors font-mono"
          />

          {/* Quick Insertion Helpers */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-[#7a8096] font-mono mr-1">QUICK INSERTS:</span>
            <button
              type="button"
              onClick={handleInsertTimestamp}
              className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/[0.04] hover:bg-white/[0.08] text-amber-200 border border-amber-400/20 transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[12px]">schedule</span>
              Timestamp
            </button>
            <button
              type="button"
              onClick={() => handleInsertSnippet('• Action Item: ')}
              className="px-2.5 py-1 rounded-lg text-[10px] bg-white/[0.04] hover:bg-white/[0.08] text-[#e8ecf8] border border-white/[0.06] transition-colors font-mono"
            >
              + Action Item
            </button>
            <button
              type="button"
              onClick={() => handleInsertSnippet('• Client Objective: ')}
              className="px-2.5 py-1 rounded-lg text-[10px] bg-white/[0.04] hover:bg-white/[0.08] text-[#e8ecf8] border border-white/[0.06] transition-colors font-mono"
            >
              + Objective
            </button>
            <button
              type="button"
              onClick={() => handleInsertSnippet('• Next Meeting Follow-up: ')}
              className="px-2.5 py-1 rounded-lg text-[10px] bg-white/[0.04] hover:bg-white/[0.08] text-[#e8ecf8] border border-white/[0.06] transition-colors font-mono"
            >
              + Follow-up
            </button>
          </div>
        </div>

        {/* Notes Footer & Actions */}
        <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2.5 text-[11px] font-mono">
            <span className="text-[#7a8096]">
              {wordCount} {wordCount === 1 ? 'word' : 'words'} • {currentNote.length} chars
            </span>
            <span className="text-white/20">•</span>
            {hasUnsavedChanges ? (
              <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                Unsaved changes
              </span>
            ) : lastSavedTime ? (
              <span className="flex items-center gap-1 text-[#34d399]">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                Saved at {lastSavedTime}
              </span>
            ) : (
              <span className="text-[#7a8096]">Encrypted &amp; Local</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentNote.length > 0 && (
              <button
                type="button"
                onClick={() => handleNoteChange('')}
                className="px-3 py-1.5 rounded-lg text-[11px] text-[#7a8096] hover:text-white transition-colors"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              id="save-rm-session-notes-btn"
              onClick={handleSaveNotes}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#140e00] flex items-center gap-1.5 shadow-[0_2px_12px_rgba(245,158,11,0.3)] transition-all active:scale-95 font-medium"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>Save Note</span>
            </button>
          </div>
        </div>
      </div>

      {/* RM Action Bar for Customer Portfolio */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          type="button"
          onClick={() => onNavigateTab('5-yr-opportunity')}
          className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-white text-xs font-semibold flex items-center justify-center gap-2 border border-white/[0.08] transition-all active:scale-[0.98] shadow-md"
        >
          <span className="material-symbols-outlined text-amber-300 text-[18px]">explore</span>
          <span>Explore 5-Yr Roadmap</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigateTab('rm-revenue-and-fees')}
          className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-white text-xs font-semibold flex items-center justify-center gap-2 border border-white/[0.08] transition-all active:scale-[0.98] shadow-md"
        >
          <span className="material-symbols-outlined text-[#34d399] text-[18px]">monetization_on</span>
          <span>RM Revenue &amp; Wallet</span>
        </button>
      </div>
    </div>
  );
};
