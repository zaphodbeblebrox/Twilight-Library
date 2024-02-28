import { TypeServerSettlement } from '../../../../../SettlementTypes';
import { TypeServerSurvivor } from '../../../../../SurvivorTypes';
import { GetModifier } from '../../Helper/GetModifier';
import {
    CharacterCardKeys,
    TypeCharacterCardData,
    characterCardData,
} from '../../static_data_file_configs/CharacterCardsConfig';

const BuildSurvivor = (
    campaignData: TypeServerSettlement,
    initialCharacterData: {
        id: number;
        first_name: string;
        last_name: string;
        player_creator: string;
        father: string;
        mother: string;
        is_male: boolean;
        character_card_selected: boolean;
        character_card: keyof CharacterCardKeys;
    },
): TypeServerSurvivor => {
    console.log('initial char data', initialCharacterData);
    const hasLifetimeReroll = campaignData.principle_new_life.selected === 'Survival of the Fittest';
    const characterCard: TypeCharacterCardData = characterCardData[initialCharacterData.character_card];
    const newChar = {
        id: initialCharacterData.id,
        player_creator: initialCharacterData.player_creator,
        first_name: initialCharacterData.first_name,
        last_name: initialCharacterData.last_name,
        nickname: '',
        is_male: initialCharacterData.is_male,
        father: initialCharacterData.father,
        mother: initialCharacterData.mother,
        death_story: '',
        weapon_type: null, // TODO: add proper check
        weapon_xp: 0, // TODO: add proper check
        is_retired: false,
        is_dead: false,
        has_lifetime_reroll: hasLifetimeReroll,
        skip_next_hunt: false,
        cannot_use_fighting_arts: false,

        fighting_arts: [...(initialCharacterData.character_card_selected ? characterCard.fighting_arts ?? [] : [])],
        secret_fighting_art: [],
        disorders: [...(initialCharacterData.character_card_selected ? characterCard.disorders ?? [] : [])],
        abilities_impairments: [
            ...(initialCharacterData.character_card_selected ? characterCard.abilities_impairments ?? [] : []),
        ],

        philosophy: null,
        philosophy_rank: null,
        knowledges: [],

        hunt_xp: 0 + GetModifier.HuntXp(campaignData),
        survival: 1,
        insanity: 0,
        lumi: 0,
        movement:
            5 +
            (initialCharacterData.character_card_selected ? characterCard.movement ?? 0 : 0) +
            GetModifier.Movement(campaignData),
        accuracy:
            0 +
            (initialCharacterData.character_card_selected ? characterCard.accuracy ?? 0 : 0) +
            GetModifier.Accuracy(campaignData),
        strength:
            0 +
            (initialCharacterData.character_card_selected ? characterCard.strength ?? 0 : 0) +
            GetModifier.Strength(campaignData),
        evasion:
            0 +
            (initialCharacterData.character_card_selected ? characterCard.evasion ?? 0 : 0) +
            GetModifier.Evasion(campaignData),
        luck:
            0 +
            (initialCharacterData.character_card_selected ? characterCard.luck ?? 0 : 0) +
            GetModifier.Luck(campaignData),
        speed:
            0 +
            (initialCharacterData.character_card_selected ? characterCard.speed ?? 0 : 0) +
            GetModifier.Speed(campaignData),
        systemic_pressure:
            0 + (initialCharacterData.character_card_selected ? characterCard.systemic_pressure ?? 0 : 0),
        torment: 0 + (initialCharacterData.character_card_selected ? characterCard.torment ?? 0 : 0),
        courage:
            0 +
            (initialCharacterData.character_card_selected ? characterCard.courage ?? 0 : 0) +
            GetModifier.Courage(campaignData),
        understanding:
            0 +
            (initialCharacterData.character_card_selected ? characterCard.understanding ?? 0 : 0) +
            GetModifier.Understanding(campaignData),
    };
    console.log('new char: ', newChar);
    return newChar;
};

export default BuildSurvivor;
