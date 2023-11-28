import rawResourceListData from '../../static_data/resource_list.json';

// --- Resource List Json ---
export type TypeResourceListData = { [K in keyof typeof rawResourceListData]: string[] };
export const resourceListData: TypeResourceListData = rawResourceListData;
