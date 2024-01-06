import { TypeServerSettlement } from '../../../../../SettlementTypes';

const CountVictories = (campaignData: TypeServerSettlement): Record<string, Record<number, number>> => {
    const timeline = { ...campaignData.timeline };
    return Object.keys(timeline).reduce(
        (count, year) => {
            const yearData = timeline[Number(year)];
            if (!yearData.victorious || !yearData.monster) {
                return { ...count };
            }
            return {
                ...count,
                [yearData.monster!]: {
                    ...count[yearData.monster!],
                    [yearData.monster_level!]: count[yearData.monster!][yearData.monster_level!] + 1,
                },
            };
        },
        { ...campaignData.quarries, ...campaignData.nemesis },
    );
};

const QuarryCounter = (totalVictories: Record<string, Record<number, number>>, campaignData: TypeServerSettlement) => {
    const calcRules: Record<number, { maxCount: number; value: number }> = {
        1: { maxCount: 1, value: 1 },
        2: { maxCount: 2, value: 2 },
        3: { maxCount: 3, value: 3 },
        4: { maxCount: 1, value: 3 },
        5: { maxCount: 1, value: 3 },
    };
    return Object.keys(totalVictories).reduce((monsterCount, monster) => {
        if (monster in campaignData.nemesis) {
            return monsterCount;
        }
        return Object.keys(totalVictories[monster]).reduce((count, level) => {
            const credit =
                totalVictories[monster][Number(level)] > calcRules[Number(level)].maxCount
                    ? calcRules[Number(level)].maxCount
                    : totalVictories[monster][Number(level)];
            return count + credit * calcRules[Number(level)].value;
        }, monsterCount);
    }, 0);
};

const NemesisCounter = (totalVictories: Record<string, Record<number, number>>, campaignData: TypeServerSettlement) => {
    const calcRules: Record<number, { maxCount: number; value: number }> = {
        1: { maxCount: 1, value: 3 },
        2: { maxCount: 1, value: 3 },
        3: { maxCount: 1, value: 3 },
    };
    return Object.keys(totalVictories).reduce((monsterCount, monster) => {
        if (monster in campaignData.quarries) {
            return monsterCount;
        }
        return Object.keys(totalVictories[monster]).reduce((count, level) => {
            const credit =
                totalVictories[monster][Number(level)] > calcRules[Number(level)].maxCount
                    ? calcRules[Number(level)].maxCount
                    : totalVictories[monster][Number(level)];
            return count + credit * calcRules[Number(level)].value;
        }, monsterCount);
    }, 0);
};

const CalcCollectiveCognition = (campaignData: TypeServerSettlement): number => {
    // base collective cognition amount
    const baseCC = 1;

    const totalVictories = CountVictories(campaignData);
    // console.log('total vict: ', totalVictories);
    const quarryCount = QuarryCounter(totalVictories, campaignData);
    // console.log('sum quarry cc: ', quarryCount);
    const nemesisCount = NemesisCounter(totalVictories, campaignData);
    // console.log('sum nemesis cc: ', nemesisCount);

    return baseCC + quarryCount + nemesisCount;
};

export default CalcCollectiveCognition;
