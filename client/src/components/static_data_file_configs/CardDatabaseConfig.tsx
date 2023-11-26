import rawCardDatabaseData from '../../static_data/card_database.json';

// --- Card Database Json ---
export type CardCategoryKeys = { [K in keyof typeof rawCardDatabaseData]: string[] };
// TODO: not needed at this time, finish this later
