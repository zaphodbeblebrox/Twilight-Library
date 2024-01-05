import { TypeStoryEvent } from '../../../../SettlementTypes';
import rawCampaignCreatorData from '../../static_data/campaign_creator.json';

// --- Campaign Creator Json ---
export type NodeOptionsList = {
    node_quarry_1: string[];
    node_quarry_2: string[];
    node_quarry_3: string[];
    node_quarry_4: string[];
    node_nemesis_1: string[];
    node_nemesis_2: string[];
    node_nemesis_3: string[];
    node_core: string[];
    node_finale: string[];
    node_special: string[];
    encounters: string[];
    wanderers: string[];
    pillars: string[];
    unique_monsters: string[];
};

export type TimelineOptionList = {
    quarries: Record<string, Record<string, TypeStoryEvent[]>>;
    nemesis: Record<string, Record<string, TypeStoryEvent[]>>;
    pillars: Record<string, Record<string, TypeStoryEvent[]>>;
    encounters: Record<string, Record<string, TypeStoryEvent[]>>;
    wanderers: Record<string, Record<string, TypeStoryEvent[]>>;
};

export type BonusQuarryOptionList = {
    bonus_quarries: Record<string, Record<string, number[]>>;
};

export type TypeCampaignCreatorData = NodeOptionsList &
    BonusQuarryOptionList & {
        timeline: TimelineOptionList;
        intimacy: string[];
    };

export const campaignCreatorData: TypeCampaignCreatorData = rawCampaignCreatorData;
