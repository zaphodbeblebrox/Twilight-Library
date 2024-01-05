import { TypeStoryEvent, TypeYear } from '../../../../../SettlementTypes';
import AddMonsterDialog from './AddMonsterDialog';

interface CellShowdownProps {
    yearData: TypeYear;
    onSubmit: (updatedYearData: TypeYear) => void;
}

const CellShowdown = ({ yearData, onSubmit }: CellShowdownProps) => {
    const nemesisSearch: TypeStoryEvent[] = yearData.story_event.filter((event) => event.monster !== undefined);
    const nemesisFound: TypeStoryEvent | null = nemesisSearch.length > 0 ? nemesisSearch[0] : null;
    return (
        <AddMonsterDialog
            currentMonster={
                nemesisFound && nemesisFound.monster && !yearData.monster ? nemesisFound.monster : yearData.monster
            }
            currentMonsterLevel={yearData.monster_level}
            currentVictory={yearData.victorious}
            onSubmit={(monsterObj) => {
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
