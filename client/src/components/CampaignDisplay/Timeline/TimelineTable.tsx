import { Flex, Separator, Table } from '@radix-ui/themes';
import { TypeStoryEvent, TypeYear } from '../../../../../SettlementTypes';
import EditEventDialog from './EditEventDialog';
import AddEventDialog from './AddEventDialog';
import StoryEventTextDisplay from '../../Helper/StoryEventTextDisplay';
import SettlementEventCell from './SettlementEventCell';
import { settlementEventsData } from '../../static_data_file_configs/SettlementEventsConfig';
import { storyEventsData } from '../../static_data_file_configs/StoryEventsConfig';

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
                    const entries: TypeStoryEvent[] = [...timeline[Number(year)].story_event];

                    return (
                        <Table.Row key={idx} align="center">
                            <Table.RowHeaderCell justify="center">{year}</Table.RowHeaderCell>
                            <Table.Cell>
                                <SettlementEventCell
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
                                <Flex direction="row" align="start" gap="2" wrap="wrap">
                                    {entries.map((entry, idy) => {
                                        return (
                                            <Flex key={idy} direction="row" align="start" gap="2">
                                                <EditEventDialog
                                                    year={Number(year)}
                                                    maxYears={Object.keys(timeline).length}
                                                    entry={StoryEventTextDisplay(entry)}
                                                    moveEvent={(newYear: number) => {
                                                        if (Number(year) === newYear) {
                                                            return;
                                                        }
                                                        const updatedTimeline: Record<number, TypeYear> = {
                                                            ...timeline,
                                                            [Number(year)]: {
                                                                ...timeline[Number(year)],
                                                                story_event: timeline[Number(year)].story_event.filter(
                                                                    (event) => event !== entry,
                                                                ),
                                                            },
                                                            [newYear]: {
                                                                ...timeline[newYear],
                                                                story_event: [...timeline[newYear].story_event, entry],
                                                            },
                                                        };
                                                        onChange(updatedTimeline);
                                                    }}
                                                    deleteEvent={() => {
                                                        const updatedTimeline: Record<number, TypeYear> = {
                                                            ...timeline,
                                                            [Number(year)]: {
                                                                ...timeline[Number(year)],
                                                                story_event: timeline[Number(year)].story_event.filter(
                                                                    (event) => event !== entry,
                                                                ),
                                                            },
                                                        };
                                                        onChange(updatedTimeline);
                                                    }}
                                                />
                                                {idy !== entries.length - 1 && (
                                                    <Separator orientation="vertical" color="purple" />
                                                )}
                                            </Flex>
                                        );
                                    })}
                                </Flex>
                            </Table.Cell>
                            <Table.Cell justify="center">
                                <AddEventDialog
                                    buttonText="+"
                                    title="Add Story Event"
                                    dataToSearch={[...settlementEventsData, ...storyEventsData]}
                                    onSubmit={(newEvent: TypeStoryEvent) => {
                                        const updatedTimeline: Record<number, TypeYear> = {
                                            ...timeline,
                                            [Number(year)]: {
                                                ...timeline[Number(year)],
                                                story_event: [...timeline[Number(year)].story_event, newEvent],
                                            },
                                        };
                                        onChange(updatedTimeline);
                                    }}
                                />
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table.Root>
    );
};

export default TimelineTable;
