import { Flex, Separator, Table } from '@radix-ui/themes';
import { TypeStoryEvent, TypeYear } from '../../../../../SettlementTypes';
import EditEventDialog from './EditEventDialog';
import AddEventDialog from './AddEventDialog';
import StoryEventTextDisplay from '../../Helper/StoryEventTextDisplay';
import CellSettlementEvent from './CellSettlementEvent';
import { settlementEventsData } from '../../static_data_file_configs/SettlementEventsConfig';
import { storyEventsData } from '../../static_data_file_configs/StoryEventsConfig';
import CellStoryEvents from './CellStoryEvents';

interface TimelineTableProps {
    timeline: Record<number, TypeYear>;
    onChange: (updatedTimeline: Record<number, TypeYear>) => void;
}

const TimelineTable = ({ timeline, onChange }: TimelineTableProps) => {
    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Year</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Settlement Event</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Story Events</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Showdowns</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {Object.keys(timeline).map((year, idx) => {
                    return (
                        <Table.Row key={idx} align="center">
                            <Table.RowHeaderCell justify="center">{year}</Table.RowHeaderCell>
                            <Table.Cell>
                                <CellSettlementEvent
                                    yearData={timeline[Number(year)]}
                                    onSubmit={(newEvent) =>
                                        onChange({
                                            ...timeline,
                                            [Number(year)]: { ...timeline[Number(year)], settlement_event: newEvent },
                                        })
                                    }
                                    onDelete={() =>
                                        onChange({
                                            ...timeline,
                                            [Number(year)]: { ...timeline[Number(year)], settlement_event: null },
                                        })
                                    }
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <CellStoryEvents
                                    year={Number(year)}
                                    timeline={timeline}
                                    onChange={(updatedTimeline) => {
                                        onChange(updatedTimeline);
                                    }}
                                />
                            </Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table.Root>
    );
};

export default TimelineTable;
