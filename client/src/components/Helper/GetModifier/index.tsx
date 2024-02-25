import {
    GetAccuracyBonus,
    GetCourageBonus,
    GetEvasionBonus,
    GetHuntXpBonus,
    GetInsanityDepartureBonus,
    GetLuckBonus,
    GetMovementBonus,
    GetSpeedBonus,
    GetStrengthBonus,
    GetSurvivalDepartureBonus,
    GetSurvivalLimit,
    GetUnderstandingBonus,
} from './ModifierCalculator';

export const GetModifier = {
    SurvivalLimit: GetSurvivalLimit,
    SurvivalDepartureBonus: GetSurvivalDepartureBonus,
    InsanityDepartureBonus: GetInsanityDepartureBonus,
    HuntXp: GetHuntXpBonus,
    Movement: GetMovementBonus,
    Accuracy: GetAccuracyBonus,
    Strength: GetStrengthBonus,
    Evasion: GetEvasionBonus,
    Luck: GetLuckBonus,
    Speed: GetSpeedBonus,
    Courage: GetCourageBonus,
    Understanding: GetUnderstandingBonus,
};
