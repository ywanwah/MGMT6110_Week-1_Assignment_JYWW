import React from 'react';
import { TabId } from '../types';

interface BottomNavProps {
  currentTab: TabId;
  onSelectTab: (tab: TabId) => void;
  stagedCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  stagedCount = 0,
}) => {
  const tabs: { id: TabId; label: string; icon: string; badge?: number }[] = [
    {
      id: 'client-and-products',
      label: 'Portfolio & SPVs',
      icon: 'account_balance',
    },
    {
      id: '5-yr-opportunity',
      label: '5-Yr Opportunity',
      icon: 'trending_up',
    },
    {
      id: 'rm-revenue-and-fees',
      label: 'Revenue & Wallet',
      icon: 'monetization_on',
      badge: stagedCount > 0 ? stagedCount : undefined,
    },
  ];

  return (
    <nav
      id="bottom-nav-dock"
      className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#070a14]/94 backdrop-blur-2xl border-t border-white/[0.08] shadow-[0_-10px_35px_rgba(0,0,0,0.8)]"
    >
      <div className="max-w-md sm:max-w-xl mx-auto flex justify-around items-center h-16 px-3">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              type="button"
              className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] w-full h-full transition-all relative group ${
                isActive
                  ? 'text-amber-300 font-medium'
                  : 'text-[#7a8096] hover:text-[#e8ecf8]'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 w-10 h-0.5 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)] rounded-full" />
              )}
              <div className="relative mt-0.5">
                <span
                  className={`material-symbols-outlined text-[21px] transition-transform duration-200 ${
                    isActive ? 'scale-110 text-amber-300' : 'group-hover:scale-105'
                  }`}
                >
                  {tab.icon}
                </span>
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 rounded-full bg-gradient-to-r from-[#10b981] to-[#34d399] text-[#002819] text-[9px] font-mono font-bold flex items-center justify-center shadow-[0_0_8px_rgba(52,211,153,0.8)]">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="font-body text-[10px] tracking-tight mt-0.5 truncate max-w-[110px] font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
