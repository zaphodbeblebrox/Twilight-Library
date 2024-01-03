import { Flex, Separator, Table } from '@radix-ui/themes';
import { TwilightAddEventAlert, TwilightEditTimelineAlert } from '../../primitiveComponents/AlertBoxes';
import { TypeStoryEvent, TypeYear } from '../../../../../SettlementTypes';
import EditEventDialog from './EditEventDialog';

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
                    <Table.ColumnHeaderCell>Story Events</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Add Event</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {Object.keys(timeline).map((year, idx) => {
                    const entries: TypeStoryEvent[] = [...timeline[Number(year)].story_event];

                    return (
                        <Table.Row key={idx} align="center">
                            <Table.RowHeaderCell justify="center">{year}</Table.RowHeaderCell>
                            <Table.Cell>
                                <Flex direction="row" align="start" gap="2" wrap="wrap">
                                    {entries.map((entry, idy) => {
                                        return (
                                            <Flex key={idy} direction="row" align="start" gap="2">
                                                <EditEventDialog
                                                    year={Number(year)}
                                                    maxYears={Object.keys(timeline).length}
                                                    entry={entry.name}
                                                    moveEvent={(newYear: number) => {
                                                        if (Number(year) === newYear) {
                                                            return;
                                                        }
                                                        const updatedTimeline = { ...timeline };
                                                        updatedTimeline[year] = updatedTimeline[year].filter(
                                                            (event) => event !== timelineEvent,
                                                        );
                                                        // updatedTimeline[newYear] = [...updatedTimeline[newYear], timelineEvent];
                                                        onChange(updatedTimeline);
                                                    }}
                                                    deleteEvent={() => {
                                                        const updatedTimeline = { ...timeline };
                                                        // updatedTimeline[year] = updatedTimeline[year].filter((event) => event !== timelineEvent);
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
                                <TwilightAddEventAlert
                                    buttonText="+"
                                    title="Add Story Event"
                                    label="Event:"
                                    onSubmit={(newTimelineEvent: string) => {
                                        const updatedTimeline = { ...timeline };
                                        // updatedTimeline[Number(year)] = [
                                        //     ...updatedTimeline[Number(year)],
                                        //     newTimelineEvent,
                                        // ];
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
