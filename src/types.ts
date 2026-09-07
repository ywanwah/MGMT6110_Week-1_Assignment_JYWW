export type TabId = 'client-and-products' | '5-yr-opportunity' | 'rm-revenue-and-fees';

export interface ClientProfile {
  id: string;
  name: string;
  title: string;
  tier: string;
  avatarUrl: string;
  totalRelationshipValue: number; // TRV
  liquidWallet: number;
  outsideWallet: number;
  growthVector: string;
  pacingPercentage: number;
  q3NnmAchieved: number;
  q3NnmTarget: number;
  q3RevenueAchieved: number;
  q3RevenueTarget: number;
  crossSellRatio: number;
  crossSellTarget: number;
}

export interface HorizonMilestone {
  year: number;
  label: string;
  title: string;
  desc: string;
  nw: string;
  badge: string;
  badgeColor: string;
  growthDelta: string;
  cx: number;
  cy: number;
}

export interface RecommendationProduct {
  id: string;
  title: string;
  category: string;
  categoryBadgeColor: string;
  tag: string;
  tagBadgeColor: string;
  trigger: string;
  matchScore: number;
  proposedMetricLabel: string;
  proposedMetricValue: string;
  proposedMetricSub: string;
  impactMetricLabel: string;
  impactMetricValue: string;
  impactMetricSub: string;
  conversionProbability: string;
  conversionPercent: number;
  annualFeeEst: number;
  staged?: boolean;
  pushed?: boolean;
}

export interface CrossSellInflow {
  id: string;
  name: string;
  category: string;
  feeText: string;
  subFeeText?: string;
  priority: number;
  subtext: string;
  staged: boolean;
  amountNumeric: number;
}

export interface CompetitorRadarItem {
  id: string;
  name: string;
  amount: string;
  amountNumeric: number;
  subtitle: string;
  statusBadge: string;
  statusBadgeColor: string;
  threatLevel: 'HIGH THREAT' | 'MED-HIGH THREAT' | 'CONSOLIDATION TARGET';
  threatColor: string;
  details: string;
  defenseTitle: string;
  defenseText: string;
  iconName: string;
}

export interface ExistingRevenueItem {
  id: string;
  name: string;
  amount: string;
  amountNumeric: number;
  sharePercent: string;
  description: string;
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}
