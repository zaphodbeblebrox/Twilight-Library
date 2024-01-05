import { TypeStoryEvent, TypeYear } from '../../../../../SettlementTypes';
import DeleteEventDialog from './DeleteEventDialog';
import AddEventDialog from './AddEventDialog';
import { settlementEventsData } from '../../static_data_file_configs/SettlementEventsConfig';

interface SettlementEventCellProps {
    yearData: TypeYear;
    onSubmit: (newEvent: TypeStoryEvent) => void;
    onDelete: () => void;
}

const SettlementEventCell = ({ yearData, onSubmit, onDelete }: SettlementEventCellProps) => {
    if (yearData.settlement_event) {
        return (
            <DeleteEventDialog
                storyEvent={yearData.settlement_event}
                onSubmit={() => {
                    onDelete();
                }}
            />
        );
    } else {
        return (
            <AddEventDialog
                buttonText="+"
                title="Add Settlement Event"
                dataToSearch={[...settlementEventsData]}
                onSubmit={(newEvent: TypeStoryEvent) => onSubmit(newEvent)}
            />
        );
    }
};

export default SettlementEventCell;
