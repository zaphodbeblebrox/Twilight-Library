import { PrinciplesList, TypeServerSettlement } from '../../../../../SettlementTypes';
import {
    InnovationKeys,
    TypeInnovationStatMods,
    innovationData,
} from '../../static_data_file_configs/InnovationsConfig';
import { PrincipleKeys, principleData } from '../../static_data_file_configs/PrincipleConfig';
import { Flex, Text, Heading } from '@radix-ui/themes';

interface SubTabBonusesProps {
    campaignData: TypeServerSettlement;
}

const SubTabBonuses = ({ campaignData }: SubTabBonusesProps) => {
    const modifierKeys: (keyof TypeInnovationStatMods)[] = [
        'survival_limit_mod',
        'departing_survival',
        'departing_insanity',
        'mod_strength',
        'mod_accuracy',
        'mod_luck',
        'mod_speed',
        'mod_lumi',
        'mod_evasion',
        'mod_movement',
        'mod_understanding',
        'mod_courage',
        'mod_hunt_xp',
    ];

    // Gain stat bonuses from Innovations
    const innovationModifiers = campaignData.innovations.reduce(
        (modifier, innovation) => {
            let updatedModifier = { ...modifier };
            modifierKeys.forEach((modifierKey) => {
                const innovationStats = innovationData[innovation as keyof InnovationKeys][modifierKey];
                if (innovationStats) {
                    updatedModifier = {
                        ...updatedModifier,
                        [modifierKey]: updatedModifier[modifierKey] + innovationStats,
                    };
                }
            });
            return updatedModifier;
        },
        {
            survival_limit_mod: 0,
            departing_survival: 0,
            departing_insanity: 0,
            mod_strength: 0,
            mod_accuracy: 0,
            mod_luck: 0,
            mod_speed: 0,
            mod_lumi: 0,
            mod_evasion: 0,
            mod_movement: 0,
            mod_understanding: 0,
            mod_courage: 0,
            mod_hunt_xp: 0,
        },
    );
    console.log('innovation modifiers: ', innovationModifiers);

    // Gain stat bonuses from Principles
    const principleKeys: (keyof PrinciplesList)[] = [
        'principle_conviction',
        'principle_death',
        'principle_new_life',
        'principle_society',
    ];

    const survivorModifiers = principleKeys.reduce(
        (modifier, principle) => {
            let updatedModifier = { ...modifier };
            if (campaignData[principle].selected === null) {
                return updatedModifier;
            }
            const selectedPrinciple: keyof PrincipleKeys = campaignData[principle].selected as keyof PrincipleKeys;
            modifierKeys.forEach((modifierKey) => {
                const principleStats = principleData[selectedPrinciple][modifierKey];
                if (principleStats) {
                    updatedModifier = {
                        ...updatedModifier,
                        [modifierKey]: updatedModifier[modifierKey] + principleStats,
                    };
                }
            });
            return updatedModifier;
        },
        { ...innovationModifiers },
    );
    console.log('total modifiers: ', survivorModifiers);

    return (
        <Flex direction="column" gap="2" align="start" justify="start">
            <Text>Survival Limit Increase: +{String(survivorModifiers.survival_limit_mod)}</Text>
            <Text>Survival on Departure: +{String(survivorModifiers.departing_survival)}</Text>
            <Text>Insanity on Departure: +{String(survivorModifiers.departing_insanity)}</Text>

            <Heading>Newborns gain</Heading>

            {survivorModifiers.mod_strength > 0 && <Text>Strength: +{String(survivorModifiers.mod_strength)}</Text>}
            {survivorModifiers.mod_accuracy > 0 && <Text>Accuracy: +{String(survivorModifiers.mod_accuracy)}</Text>}
            {survivorModifiers.mod_luck > 0 && <Text>Luck: +{String(survivorModifiers.mod_luck)}</Text>}
            {survivorModifiers.mod_speed > 0 && <Text>Speed: +{String(survivorModifiers.mod_speed)}</Text>}
            {survivorModifiers.mod_evasion > 0 && <Text>Evasion: +{String(survivorModifiers.mod_evasion)}</Text>}
            {survivorModifiers.mod_movement > 0 && <Text>Movement: +{String(survivorModifiers.mod_movement)}</Text>}
            {survivorModifiers.mod_understanding && (
                <Text>Understanding: +{String(survivorModifiers.mod_understanding)}</Text>
            )}
            {survivorModifiers.mod_courage && <Text>Courage: +{String(survivorModifiers.mod_courage)}</Text>}
            {survivorModifiers.mod_hunt_xp && <Text>Hunt XP: +{String(survivorModifiers.mod_hunt_xp)}</Text>}
        </Flex>
    );

    {
    }
};

export default SubTabBonuses;
