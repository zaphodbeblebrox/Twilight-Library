import { SettlementMonsterLists, TypeServerSettlement, TypeStoryEvent, TypeYear } from '../../../../../SettlementTypes';
import AddMonsterDialog from './AddMonsterDialog';

interface CellShowdownProps {
    campaignData: TypeServerSettlement;
    yearData: TypeYear;
    onSubmit: (updatedYearData: TypeYear) => void;
}

const CellShowdown = ({ campaignData, yearData, onSubmit }: CellShowdownProps) => {
    const nemesisSearch: TypeStoryEvent[] = yearData.story_event.filter((event) => event.monster !== undefined);
    const nemesisFound: TypeStoryEvent | null = nemesisSearch.length > 0 ? nemesisSearch[0] : null;
    return (
        <AddMonsterDialog
            campaignData={campaignData}
            monsterOptions={nemesisFound ? Object.keys(campaignData.nemesis) : Object.keys(campaignData.quarries)}
            currentMonster={
                nemesisFound && nemesisFound.monster && !yearData.monster ? nemesisFound.monster : yearData.monster
            }
            currentMonsterLevel={
                nemesisFound && nemesisFound.monster_level && !yearData.monster_level
                    ? nemesisFound.monster_level
                    : yearData.monster_level
            }
            currentVictory={yearData.victorious}
            onSubmit={(monsterObj) => {
                const categoryKey: keyof SettlementMonsterLists = nemesisFound ? 'nemesis' : 'quarries';
                let temp = {
                    ...campaignData,
                };
                if (yearData.victorious && !monsterObj.victorious) {
                    temp = {
                        ...campaignData,
                        [categoryKey]: {
                            ...campaignData[categoryKey],
                            [monsterObj.monster]: {
                                ...campaignData[categoryKey][monsterObj.monster],
                                [monsterObj.monster_level]:
                                    campaignData[categoryKey][monsterObj.monster][monsterObj.monster_level] - 1,
                            },
                        },
                    };
                } else if (!yearData.victorious && monsterObj.victorious) {
                    temp = {
                        ...campaignData,
                        [categoryKey]: {
                            ...campaignData[categoryKey],
                            [monsterObj.monster]: {
                                ...campaignData[categoryKey][monsterObj.monster],
                                [monsterObj.monster_level]:
                                    campaignData[categoryKey][monsterObj.monster][monsterObj.monster_level] + 1,
                            },
                        },
                    };
                }
                console.log('after count', temp);
                onSubmit({
                    ...yearData,
                    monster: monsterObj.monster,
                    monster_level: monsterObj.monster_level,
                    victorious: monsterObj.victorious,
                });
            }}
        />
    );
};

export default CellShowdown;
