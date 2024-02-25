import rawCharacterCardsData from '../../static_data/character_cards.json';

export type TypeCharacterCardData = {
    fighting_arts?: string[];
    abilities_impairments?: string[];
    disorders?: string[];
    movement?: number;
    accuracy?: number;
    strength?: number;
    evasion?: number;
    luck?: number;
    speed?: number;
    systemic_pressure?: number;
    torment?: number;
    courage?: number;
    understanding?: number;
};

export type CharacterCardKeys = { [K in keyof typeof rawCharacterCardsData]: string[] };
export const characterCardData: Record<keyof CharacterCardKeys, TypeCharacterCardData> = rawCharacterCardsData;
