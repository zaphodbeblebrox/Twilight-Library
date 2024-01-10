import { PrinciplesList, TypeServerSettlement } from '../../../../SettlementTypes';
import { InnovationKeys, innovationData } from '../static_data_file_configs/InnovationsConfig';
import { PrincipleKeys, TypePrincipleStatMods, principleData } from '../static_data_file_configs/PrincipleConfig';

const GetPrincipleModifier = (campaignData: TypeServerSettlement, modifierKey: keyof TypePrincipleStatMods): number => {
    const principleKeys: (keyof PrinciplesList)[] = [
        'principle_conviction',
        'principle_death',
        'principle_new_life',
        'principle_society',
    ];
    return principleKeys.reduce((modifier, principle) => {
        if (campaignData[principle].selected === null) {
            return modifier;
        }
        const selectedPrinciple: keyof PrincipleKeys = campaignData[principle].selected as keyof PrincipleKeys;
        return principleData[selectedPrinciple][modifierKey]
            ? modifier + principleData[selectedPrinciple][modifierKey]!
            : modifier;
    }, 0);
};

const GetInnovationModifier = (
    campaignData: TypeServerSettlement,
    modifierKey: keyof TypePrincipleStatMods,
): number => {
    return campaignData.innovations.reduce((modifier, innovation) => {
        const innovationStats = innovationData[innovation as keyof InnovationKeys][modifierKey];
        return innovationStats ? modifier + innovationStats : modifier;
    }, 0);
};

export const GetSurvivalLimit = (campaignData: TypeServerSettlement): number => {
    return (
        GetInnovationModifier(campaignData, 'survival_limit_mod') +
        GetPrincipleModifier(campaignData, 'survival_limit_mod')
    );
};

export const GetSurvivalDepartureBonus = (campaignData: TypeServerSettlement): number => {
    return (
        GetInnovationModifier(campaignData, 'departing_survival') +
        GetPrincipleModifier(campaignData, 'departing_survival')
    );
};

export const GetInsanityDepartureBonus = (campaignData: TypeServerSettlement): number => {
    return (
        GetInnovationModifier(campaignData, 'departing_insanity') +
        GetPrincipleModifier(campaignData, 'departing_insanity')
    );
};
