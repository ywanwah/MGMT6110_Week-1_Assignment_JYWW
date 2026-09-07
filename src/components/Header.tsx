import React, { useState } from 'react';
import { ClientProfile, TabId } from '../types';
import { CLIENT_PROFILES } from '../data/mockData';

interface HeaderProps {
  currentTab: TabId;
  activeClient: ClientProfile;
  onSelectClient: (client: ClientProfile) => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  activeClient,
  onSelectClient,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getTabTitle = () => {
    switch (currentTab) {
      case 'client-and-products':
        return 'Customer Portfolio';
      case '5-yr-opportunity':
        return '5-Yr Opportunity Radar';
      case 'rm-revenue-and-fees':
        return 'RM Revenue & Fees';
      default:
        return 'Executive Wealth';
    }
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#070a14]/90 backdrop-blur-2xl pt-safe shadow-[0_4px_30px_rgba(0,0,0,0.7)] border-b border-white/[0.07]">
        <div className="h-16 max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-3">
          {/* Logo & Private Wealth Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#1c2438] to-[#0d1222] flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.25)] border border-amber-400/30">
                <span className="font-display font-bold bg-gradient-to-b from-amber-200 via-white to-amber-300 bg-clip-text text-transparent text-sm tracking-wider">
                  SEW
                </span>
              </div>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-sm sm:text-base text-white tracking-tight font-semibold">
                  {getTabTitle()}
                </span>
                <span className="hidden md:inline text-[9px] px-1.5 py-0.2 rounded bg-white/[0.06] text-amber-300 font-mono tracking-wider uppercase border border-amber-400/20">
                  UHNW
                </span>
              </div>
              <span className="text-[10px] text-[#7a8096] tracking-[0.12em] uppercase font-mono">
                Zurich • London Private Desk
              </span>
            </div>
          </div>

          {/* Client Selector Dropdown Trigger */}
          <div className="relative">
            <button
              id="client-selector-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="min-h-[44px] px-3.5 py-1.5 flex items-center gap-2.5 bg-gradient-to-r from-[#141a2e] to-[#0f1426] rounded-full hover:from-[#1b223c] hover:to-[#141b32] transition-all border border-white/[0.1] shadow-inner shadow-white/[0.04] active:scale-[0.98]"
              type="button"
              aria-expanded={dropdownOpen}
            >
              <div className="relative">
                <img
                  src={activeClient.avatarUrl}
                  alt={activeClient.name}
                  className="w-6 h-6 rounded-full object-cover border border-amber-300/40 shrink-0"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#34d399] border border-[#070a14]" />
              </div>
              <div className="flex flex-col text-left max-w-[120px] sm:max-w-[200px] truncate">
                <span className="font-body text-xs text-white font-medium truncate leading-tight">
                  {activeClient.name}
                </span>
                <div className="flex items-center gap-1 text-[9px] text-amber-200/90 tracking-wide font-mono">
                  <span>${(activeClient.totalRelationshipValue / 1000000).toFixed(2)}M TRV</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#7a8096] text-[16px] transition-transform duration-200">
                {dropdownOpen ? 'expand_less' : 'unfold_more'}
              </span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#0e1324] border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-white/[0.08] mb-1.5 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono font-semibold text-[#7a8096] tracking-widest">
                      Switch Sovereign Mandate
                    </span>
                    <span className="text-[9px] text-[#34d399] font-mono font-semibold bg-[#34d399]/10 px-1.5 py-0.5 rounded border border-[#34d399]/20">
                      3 Active Profiles
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {CLIENT_PROFILES.map((client) => {
                      const isSelected = client.id === activeClient.id;
                      return (
                        <button
                          key={client.id}
                          onClick={() => {
                            onSelectClient(client);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#1d4ed8]/30 to-[#141b32] border border-[#3b82f6]/40 text-white shadow-md'
                              : 'hover:bg-white/[0.04] text-[#c3c6d7] border border-transparent'
                          }`}
                        >
                          <div className="relative">
                            <img
                              src={client.avatarUrl}
                              alt={client.name}
                              className="w-10 h-10 rounded-full object-cover shrink-0 border border-white/20 shadow-md"
                            />
                            {isSelected && (
                              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#34d399] border-2 border-[#0e1324]" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-semibold text-white truncate">{client.name}</span>
                              <span className="text-[11px] font-mono text-[#34d399] font-bold shrink-0">
                                ${(client.totalRelationshipValue / 1000000).toFixed(2)}M
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-amber-300 font-mono">
                                {client.tier}
                              </span>
                              <span className="text-[#7a8096] text-[10px] truncate">• {client.title}</span>
                            </div>
                          </div>
                          {isSelected && (
                            <span className="material-symbols-outlined text-[#34d399] text-[18px] shrink-0">
                              check
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Relationship Manager Avatar & Indicator */}
          <div className="relative flex items-center shrink-0 min-w-[44px] min-h-[44px] justify-center">
            <div className="relative cursor-pointer group flex items-center gap-2">
              <div className="relative">
                <img
                  alt="Relationship Manager"
                  className="w-8 h-8 rounded-full object-cover border border-amber-400/40 shadow-md ring-2 ring-white/[0.06] group-hover:ring-amber-400/80 transition-all"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop"
                  title="RM: Catherine Montgomery (Managing Director - Zurich Desk)"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.9)] border-2 border-[#070a14]" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
