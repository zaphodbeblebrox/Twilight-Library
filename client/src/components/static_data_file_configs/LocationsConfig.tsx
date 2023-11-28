import rawLocationsData from '../../static_data/locations.json';

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
