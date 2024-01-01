export type TypePrinciple = {
    selected: string | null;
    options: string[] | null;
}

export type PrinciplesList = {
    principle_conviction: TypePrinciple;
    principle_death: TypePrinciple;
    principle_new_life: TypePrinciple;
    principle_society: TypePrinciple;
}

export type SettlementStrLists = {
    name: string;
    notes: string;
    courage_event_1: string;
    courage_event_2: string;
    understanding_event_1: string;
    understanding_event_2: string;
    intimacy: string;
};

export type SettlementStrArrayLists = {
    innovations: string[];
    patterns: string[];
    locations: string[];
    knowledges: string[];
};

export type SettlementMonsterLists = {
    quarries: Record<string, Record<number, number>>;
    nemesis: Record<string, Record<number, number>>;
};

export type SettlementStorageLists = {
    resources: Record<string, Record<string, number>>;
    gear: Record<string, Record<string, number>>;
};

export type TypeServerSettlement = SettlementStrLists &
    SettlementStrArrayLists &
    SettlementStorageLists & PrinciplesList &
    SettlementMonsterLists & {
        _id: string;
        survival_limit: number;
        arc_survivors: boolean;
        cognition_amount: number;
        current_year: number;
        timeline: Record<number, string[]>;
        survivors: number[];
        milestones: Record<string, boolean>;
        constellations: boolean;
    };

export type TypeInitializedSettlement = SettlementMonsterLists &
    SettlementStorageLists & PrinciplesList & {
        name: string;
        timeline: Record<number, string[]>;
        courage_event_1: string;
        courage_event_2: string;
        understanding_event_1: string;
        understanding_event_2: string;
        milestones: Record<string, boolean>;
        arc_survivors?: boolean;
        constellations?: boolean;
        intimacy: string;
    };
