import rawPresetCampaignData from '../../static_data/preset_campaigns.json';

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

export type TimelineLists = {
    timeline: Record<string, string[]>;
    default_timeline: Record<string, string[]>;
};

export type TypeCampaignData = NodePillarLists &
    NemesisFightYearLists &
    CourageUnderstandingLists &
    NodeCoreFinaleLists &
    TimelineLists & {
        milestones: string[];
        flexible_nemesis_encounters: boolean;
        constellations: boolean;
    };

export type TypeAvailableCampaignsData = { [K in keyof typeof rawPresetCampaignData]: string[] };

export const presetCampaignData: Record<keyof TypeAvailableCampaignsData, TypeCampaignData> = rawPresetCampaignData;
