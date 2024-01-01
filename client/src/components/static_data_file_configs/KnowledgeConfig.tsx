import rawKnowledgeData from '../../static_data/knowledge.json';

export type TypeKnowledge = {
    ability: string;
    observation: number | null;
    condition: string | null;
    next_rank: string | null;
};

export type KnowledgeKeys = { [K in keyof typeof rawKnowledgeData]: TypeKnowledge };
export const KnowledgeData: Record<keyof KnowledgeKeys, TypeKnowledge> = rawKnowledgeData;
