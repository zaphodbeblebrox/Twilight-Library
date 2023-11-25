import rawGearData from '../../static_data/gear.json';

// --- Gear Json ---
export type TypeAffinities = {
    top: string;
    right: string;
    bottom: string;
    left: string;
    center: string;
};

export type TypeStats = {
    armor?: number;
    location?: string;
    speed?: number | string;
    accuracy?: number;
    strength?: number | string;
};

export type TypeGearData = {
    types: string[];
    location: string;
    crafting: string;
    stats: TypeStats;
    affinities: Record<keyof TypeAffinities, string>;
    abilities: string[];
};

export type GearKeys = { [K in keyof typeof rawGearData]: string[] };
export const gearData: Record<keyof GearKeys, TypeGearData> = rawGearData;
