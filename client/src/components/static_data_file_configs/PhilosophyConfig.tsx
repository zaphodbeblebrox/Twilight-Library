import rawPhilosophyData from '../../static_data/philosophy.json';

export type TypePhilosophy = {
    neurosis: string;
    '2': number;
    '3': number;
    '4': number;
};

export type PhilosophyKeys = { [K in keyof typeof rawPhilosophyData]: TypePhilosophy };
export const PhilosophyData: Record<keyof PhilosophyKeys, TypePhilosophy> = rawPhilosophyData;
