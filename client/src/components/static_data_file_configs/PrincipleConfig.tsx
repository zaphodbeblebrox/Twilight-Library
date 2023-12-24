import rawPrincipleData from '../../static_data/principles.json';

// --- Innovations Json ---
export type TypePrincipleStatMods = {
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

export type TypePrincipleEndeavorTable = {
    limit_low: string;
    limit_high: string;
    effect: string;
};

export type TypePrincipleEndeavor = {
    cost: string;
    effect: string;
    roll: string;
    table: TypePrincipleEndeavorTable[];
};

export type TypePrincipleData = Partial<TypePrincipleStatMods> & {
    name: string;
    static_effect?: string[];
    endeavor?: Partial<TypePrincipleEndeavor>[];
};

export type PrincipleKeys = { [K in keyof typeof rawPrincipleData]: TypePrincipleData };
export const principleData: Record<keyof PrincipleKeys, TypePrincipleData> = rawPrincipleData;
