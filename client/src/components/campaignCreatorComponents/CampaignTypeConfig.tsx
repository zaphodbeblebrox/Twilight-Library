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
};
export type NodeCoreFinaleLists = {
    node_core: string | null;
    node_finale: string | null;
};

export type TypeCampaignData = NodePillarLists &
    NemesisFightYearLists &
    NodeCoreFinaleLists & {
        milestones: string[];
        flexible_nemesis_encounters: boolean;
        core_fight_year: number;
        timeline: Record<string, string[]>;
        default_timeline: Record<string, string[]>;
        courage_event_1: string;
        courage_event_2: string;
        understanding_event_1: string;
        understanding_event_2: string;
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

export type TypeCampaignCreatorData = NodeOptionsList & TimelineOptionList;
