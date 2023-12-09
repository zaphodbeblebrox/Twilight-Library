import rawInnovationsData from '../../static_data/innovations.json';

// --- Innovations Json ---
export type TypeInnovationStatMods = {
    survival_limit_mod: number;
    departing_survival: number;
    departing_insanity: number;
    mod_strength: number;
    mod_accuracy: number;
    mod_luck: number;
    mod_speed: number;
    mod_lumi: number;
    mod_evasion: number;
    mod_movement: number;
    mod_understanding: number;
    mod_courage: number;
    mod_hunt_xp: number;
};

export type TypeInnovationEndeavorTable = {
    limit_low: string;
    limit_high: string;
    effect: string;
};

export type TypeInnovationEndeavor = {
    cost: string;
    effect: string;
    roll: string;
    table: TypeInnovationEndeavorTable[];
};

export type TypeInnovationData = Partial<TypeInnovationStatMods> & {
    name: string;
    static_effect?: string[];
    endeavor?: Partial<TypeInnovationEndeavor>[];
};

export const innovationData: TypeInnovationData[] = rawInnovationsData;
