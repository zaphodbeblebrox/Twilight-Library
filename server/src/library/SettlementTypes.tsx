export type SettlementStrLists = {
    name: string;
    notes: string;
    principle_conviction: string;
    principle_death: string;
    principle_new_life: string;
    principle_society: string;
    courage_event_1: string;
    courage_event_2: string;
    understanding_event_1: string;
    understanding_event_2: string;
};

export type SettlementStrArrayLists = {
    innovations: string[];
    patterns: string[];
    locations: string[];
    knowledges: string[];
};

export type SettlementMonsterLists = {
    quarries: Record<string, Record<string, Record<number, boolean>>>;
    nemesis: Record<string, Record<string, Record<number, boolean>>>;
};

export type SettlementStorageLists = {
    resources: Record<string, number>;
    gear: Record<string, number>;
};

export type TypeServerSettlement = SettlementStrLists &
    SettlementStrArrayLists &
    SettlementMonsterLists & {
        survival_limit: number;
        arc_survivors: boolean;
        cognition_amount: number;
        current_year: Number;
        timeline: Record<number, string[]>;
        survivors: number[];
        milestones: Record<string, boolean>;
        constellations: boolean;
    };
