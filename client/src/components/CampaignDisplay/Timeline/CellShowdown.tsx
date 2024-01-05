import { TypeYear } from '../../../../../SettlementTypes';
import AddMonsterDialog from './AddMonsterDialog';

interface CellShowdownProps {
    yearData: TypeYear;
    onSubmit: (updatedYearData: TypeYear) => void;
}

const CellShowdown = ({ yearData, onSubmit }: CellShowdownProps) => {
    return (
        <AddMonsterDialog
            currentMonster={yearData.monster}
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
