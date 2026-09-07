import React, { useState } from 'react';
import { TabId, ClientProfile, RecommendationProduct, CrossSellInflow, ToastNotification } from './types';
import {
  CLIENT_PROFILES,
  INITIAL_RECOMMENDATIONS,
  INITIAL_CROSS_SELL_INFLOWS,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CustomerPortfolioScreen } from './components/CustomerPortfolioScreen';
import { FiveYearOpportunityScreen } from './components/FiveYearOpportunityScreen';
import { RMRevenueScreen } from './components/RMRevenueScreen';
import { SimulationModal } from './components/SimulationModal';
import { TermSheetModal } from './components/TermSheetModal';
import { PricingCommitteeModal } from './components/PricingCommitteeModal';
import { DeskHeadModal } from './components/DeskHeadModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabId>('5-yr-opportunity');
  const [activeClient, setActiveClient] = useState<ClientProfile>(CLIENT_PROFILES[0]);

  // Product recommendations & cross-sell state
  const [recommendations, setRecommendations] = useState<RecommendationProduct[]>(INITIAL_RECOMMENDATIONS);
  const [crossSellInflows, setCrossSellInflows] = useState<CrossSellInflow[]>(INITIAL_CROSS_SELL_INFLOWS);

  // Modals state
  const [activeSimulateProduct, setActiveSimulateProduct] = useState<RecommendationProduct | null>(null);
  const [activeTermSheetProduct, setActiveTermSheetProduct] = useState<RecommendationProduct | null>(null);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [deskHeadModalOpen, setDeskHeadModalOpen] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState<ToastNotification | null>(null);
  const [toastTimeoutId, setToastTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showToast = (title: string, message: string, isSuccess = true) => {
    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }
    setToast({
      id: String(Date.now()),
      title,
      message,
      type: isSuccess ? 'success' : 'info',
    });

    const timeout = setTimeout(() => {
      setToast(null);
    }, 4000);
    setToastTimeoutId(timeout);
  };

  const handlePushToApp = (productTitle: string, facilityValue: string) => {
    // Update recommendation product state
    setRecommendations((prev) =>
      prev.map((p) => (p.title === productTitle ? { ...p, pushed: true, staged: true } : p))
    );

    // Also ensure associated cross-sell is staged
    setCrossSellInflows((prev) =>
      prev.map((c) => {
        if (
          (productTitle.includes('Lombard') && c.id === 'cs-lombard') ||
          (productTitle.includes('Private Equity') && c.id === 'cs-pe') ||
          (productTitle.includes('Family Trust') && c.id === 'cs-trust') ||
          (productTitle.includes('FX Currency') && c.id === 'cs-fx')
        ) {
          return { ...c, staged: true };
        }
        return c;
      })
    );

    showToast(
      'Proposal Dispatched',
      `Delivered directly to ${activeClient.name}'s private mobile vault (${facilityValue}).`,
      true
    );
  };

  const handleToggleStage = (id: string) => {
    setCrossSellInflows((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newState = !item.staged;
          showToast(
            newState ? 'Mandate Staged' : 'Mandate Unstaged',
            `${item.name} (${item.feeText}) ${newState ? 'added to' : 'removed from'} Q3 execution pipeline.`,
            newState
          );
          return { ...item, staged: newState };
        }
        return item;
      })
    );
  };

  const handleCommitPipeline = () => {
    showToast(
      'Pipeline Committed',
      `Committed +$118.2k in cross-sell opportunities to Q3 Sovereign Wealth Scorecard.`,
      true
    );
  };

  const stagedCount = crossSellInflows.filter((i) => i.staged).length;

  return (
    <div className="min-h-screen bg-[#070a14] text-[#e8ecf8] font-body flex flex-col selection:bg-amber-400/20 selection:text-amber-200">
      {/* Institutional Fixed Header */}
      <Header
        currentTab={currentTab}
        activeClient={activeClient}
        onSelectClient={(client) => {
          setActiveClient(client);
          showToast('Client Active', `Switched active book to ${client.name} (${client.tier}).`, true);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 max-w-4xl mx-auto px-3 sm:px-6">
        {currentTab === 'client-and-products' && (
          <CustomerPortfolioScreen
            activeClient={activeClient}
            onNavigateTab={setCurrentTab}
            onShowToast={showToast}
          />
        )}

        {currentTab === '5-yr-opportunity' && (
          <FiveYearOpportunityScreen
            activeClient={activeClient}
            recommendations={recommendations}
            onOpenSimulate={(prod) => setActiveSimulateProduct(prod)}
            onOpenTermSheet={(prod) => setActiveTermSheetProduct(prod)}
            onPushToApp={handlePushToApp}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'rm-revenue-and-fees' && (
          <RMRevenueScreen
            activeClient={activeClient}
            crossSellInflows={crossSellInflows}
            onToggleStage={handleToggleStage}
            onOpenPricingModal={() => setPricingModalOpen(true)}
            onOpenDeskHeadModal={() => setDeskHeadModalOpen(true)}
            onCommitPipeline={handleCommitPipeline}
            onShowToast={showToast}
          />
        )}

        {/* RM Execution Floating Toast Notification */}
        {toast && (
          <div
            id="rm-toast"
            className="fixed bottom-22 inset-x-3 sm:inset-x-auto sm:right-6 sm:w-96 z-50 bg-[#0c1122]/95 backdrop-blur-xl rounded-xl p-3.5 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-amber-400/20 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  toast.type === 'success'
                    ? 'bg-[#34d399]/15 text-[#34d399] border-[#34d399]/30'
                    : 'bg-amber-400/15 text-amber-300 border-amber-400/30'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {toast.type === 'success' ? 'check_circle' : 'sync'}
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white truncate font-display tracking-tight">
                  {toast.title}
                </div>
                <div className="text-[11px] text-[#9fa6be] leading-tight line-clamp-2 mt-0.5">
                  {toast.message}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="shrink-0 p-1 text-[#7a8096] hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}
      </main>

      {/* Floating 3-Tab Bottom Navigation Dock */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        stagedCount={stagedCount}
      />

      {/* Interactive Modals */}
      <SimulationModal
        product={activeSimulateProduct}
        isOpen={!!activeSimulateProduct}
        onClose={() => setActiveSimulateProduct(null)}
        onPushToApp={handlePushToApp}
      />

      <TermSheetModal
        product={activeTermSheetProduct}
        isOpen={!!activeTermSheetProduct}
        onClose={() => setActiveTermSheetProduct(null)}
        onPushToApp={handlePushToApp}
        onShowToast={showToast}
      />

      <PricingCommitteeModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
        onSubmit={(msg) => showToast('Committee Notice', msg, true)}
      />

      <DeskHeadModal
        isOpen={deskHeadModalOpen}
        onClose={() => setDeskHeadModalOpen(false)}
        onSubmit={(msg) => showToast('Dispatch Confirmed', msg, true)}
        pipelineTotal={`+$${crossSellInflows
          .filter((i) => i.staged)
          .reduce((acc, i) => acc + i.amountNumeric, 0)
          .toLocaleString()}`}
      />
    </div>
  );
}
