import { TypeServerSettlement } from '../../../../../SettlementTypes';
import { TypeServerSurvivor } from '../../../../../SurvivorTypes';

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
    },
    characterCard: string | null = null,
): TypeServerSurvivor => {
    console.log(initialCharacterData);
    return {
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
        has_lifetime_reroll: false, // TODO: add proper check
        skip_next_hunt: false,
        cannot_use_fighting_arts: false,
        fighting_arts: [], // TODO: add proper check
        secret_fighting_art: [], // TODO: add proper check
        disorders: [], // TODO: add proper check
        abilities_impairments: [], // TODO: add proper check
        philosophy: null,
        philosophy_rank: null,
        knowledges: [],
        hunt_xp: 0, // TODO: add proper check for below
        survival: 1,
        insanity: 0,
        lumi: 0,
        movement: 5,
        accuracy: 0,
        strength: 0,
        evasion: 0,
        luck: 0,
        speed: 0,
        systemic_pressure: 0,
        torment: 0,
        courage: 0,
        understanding: 0,
    };
};

export default BuildSurvivor;
