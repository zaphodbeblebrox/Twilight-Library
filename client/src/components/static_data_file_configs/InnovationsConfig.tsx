import rawInnovationsData from '../../static_data/innovations.json';

{
    "name": ,
    "static_effect": [],
    "survival_limit_mod": ,
    "departing_survival": ,
    "departing_insanity": ,
    "mod_strength": ,
    "mod_accuracy": ,
    "mod_luck": ,
    "mod_speed": ,
    "mod_lumi": ,
    "mod_evasion": ,
    "mod_movement": ,
    "endeavor":[{
        "cost": ,
        "roll": ,
        "effect": ""
        "table": [{
            "limit_low": ,
            "limit_high": ,
            "effect": 
        }]
    }]
}

// --- Innovations Json ---
export type TypeAffinities = {
    top: string;
    right: string;
    bottom: string;
    left: string;
    center: string;
};

export type TypeStats = {
    armor: number;
    location: string;
    speed: number | string;
    accuracy: number;
    strength: number | string;
};

export type TypeGearData = {
    types: string[];
    location: string;
    crafting: string;
    stats: Partial<TypeStats>;
    affinities: Record<keyof TypeAffinities, string>;
    abilities: string[];
};

export type GearKeys = { [K in keyof typeof rawGearData]: string[] };
export const gearData: Record<keyof GearKeys, TypeGearData> = rawGearData;
