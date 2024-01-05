import { TypeYear } from '../../../../../SettlementTypes';

const CalcCollectiveCognition = (timeline: Record<number, TypeYear>) => {
    // base collective cognition amount
    const baseCC = 1;
    const calcRules = {
        quarry_level1: { maxCount: 1, value: 1 },
        quarry_level2: { maxCount: 2, value: 2 },
        quarry_level3: { maxCount: 3, value: 3 },
        nemesis_level1: { maxCount: 1, value: 3 },
        nemesis_level2: { maxCount: 1, value: 3 },
        nemesis_level3: { maxCount: 1, value: 3 },
        unique: { maxCount: 1, value: 3 },
    };

    const collectiveCognition = Object.keys(timeline).reduce((yearData) => {}, baseCC);
};

export default CalcCollectiveCognition;
