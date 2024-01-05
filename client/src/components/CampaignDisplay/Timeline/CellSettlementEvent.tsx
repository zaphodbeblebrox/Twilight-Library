import { TypeStoryEvent, TypeYear } from '../../../../../SettlementTypes';
import DeleteEventDialog from './DeleteEventDialog';
import AddEventDialog from './AddEventDialog';
import { settlementEventsData } from '../../static_data_file_configs/SettlementEventsConfig';

interface CellSettlementEventProps {
    yearData: TypeYear;
    onSubmit: (newEvent: TypeStoryEvent) => void;
    onDelete: () => void;
}

const CellSettlementEvent = ({ yearData, onSubmit, onDelete }: CellSettlementEventProps) => {
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

export default CellSettlementEvent;
