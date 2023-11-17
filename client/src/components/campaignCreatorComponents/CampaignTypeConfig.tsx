// --- Imports ---
import rawLocationsData from '../../static_data/locations.json';
import rawCampaignCreatorData from '../../static_data/campaign_creator.json';
import rawResourceListData from '../../static_data/resource_list.json';

// --- Preset campaign Json ---
export type NodePillarLists = {
    node_quarry_1: string[];
    node_quarry_2: string[];
    node_quarry_3: string[];
    node_quarry_4: string[];
    node_nemesis_1: string[];
    node_nemesis_2: string[];
    node_nemesis_3: string[];
    node_special: string[];
    encounters: string[];
    wanderers: string[];
    pillars: string[];
};
export type NemesisFightYearLists = {
    nn1_lvl1_fight_year: number | null;
    nn1_lvl2_fight_year: number | null;
    nn1_lvl3_fight_year: number | null;
    nn2_lvl1_fight_year: number | null;
    nn2_lvl2_fight_year: number | null;
    nn2_lvl3_fight_year: number | null;
    nn3_lvl1_fight_year: number | null;
    nn3_lvl2_fight_year: number | null;
    nn3_lvl3_fight_year: number | null;
    finale_fight_year: number | null;
    core_fight_year: number;
};
export type NodeCoreFinaleLists = {
    node_core: string | null;
    node_finale: string | null;
};

export type CourageUnderstandingLists = {
    courage_event_1: string;
    courage_event_2: string;
    understanding_event_1: string;
    understanding_event_2: string;
};

export type TypeCampaignData = NodePillarLists &
    NemesisFightYearLists &
    CourageUnderstandingLists &
    NodeCoreFinaleLists & {
        milestones: string[];
        flexible_nemesis_encounters: boolean;
        timeline: Record<string, string[]>;
        default_timeline: Record<string, string[]>;
        constellations: boolean;
    };

//------------------------------------------------------------
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
};
export type TimelineOptionList = {
    quarries: Record<string, Record<string, string[]>>;
    nemesis: Record<string, Record<string, string[]>>;
    pillars: Record<string, Record<string, string[]>>;
    encounters: Record<string, Record<string, string[]>>;
    wanderers: Record<string, Record<string, string[]>>;
};

export type BonusQuarryOptionList = {
    bonus_quarries: Record<string, Record<string, number[]>>;
};

export type TypeCampaignCreatorData = NodeOptionsList &
    BonusQuarryOptionList & {
        timeline: TimelineOptionList;
    };

export const campaignCreatorData: TypeCampaignCreatorData = rawCampaignCreatorData;

//------------------------------------------------------------
// --- Resource List Json ---
export type TypeResourceListData = { [K in keyof typeof rawResourceListData]: string[] };
export const resourceListData: TypeResourceListData = rawResourceListData;

//------------------------------------------------------------
// --- Locations Json ---
export type TypeLocationEndeavour = {
    cost: string;
    effect: string;
};
export type TypeLocationFormat = {
    gear: string[];
    endeavour: Record<string, TypeLocationEndeavour>;
};
export type TypeLocationsData = { [K in keyof typeof rawLocationsData]: TypeLocationFormat };
export const locationsData: TypeLocationsData = rawLocationsData;
