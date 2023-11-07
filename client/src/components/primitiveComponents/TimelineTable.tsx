import { Flex, Separator, Table } from '@radix-ui/themes';
import { TwilightAddEventAlert, TwilightEditTimelineAlert } from './AlertBoxes';

interface TimelineTableProps {
    timeline: Record<number, string[]>;
    onChange: (updatedTimeline: Record<number, string[]>) => void;
}

const TimelineTable = ({ timeline, onChange }: TimelineTableProps) => {
    const moveTimelineEvent = (year: number, newYear: number, timelineEvent: string) => {
        if (year === newYear) {
            return;
        }
        const updatedTimeline = { ...timeline };
        updatedTimeline[year] = updatedTimeline[year].filter((event) => event !== timelineEvent);
        updatedTimeline[newYear] = [...updatedTimeline[newYear], timelineEvent];
        onChange(updatedTimeline);
    };
    const deleteTimelineEvent = (year: number, timelineEvent: string) => {
        const updatedTimeline = { ...timeline };
        updatedTimeline[year] = updatedTimeline[year].filter((event) => event !== timelineEvent);
        onChange(updatedTimeline);
    };

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
                {Object.keys(timeline).map((year: string, idx: number) => {
                    const entries: string[] = timeline[Number(year)];
                    const addTimelineEvent = (newTimelineEvent: string) => {
                        const updatedTimeline = { ...timeline };
                        updatedTimeline[Number(year)] = [...updatedTimeline[Number(year)], newTimelineEvent];
                        onChange(updatedTimeline);
                    };
                    return (
                        <Table.Row key={idx} align="center">
                            <Table.RowHeaderCell justify="center">{year}</Table.RowHeaderCell>
                            <Table.Cell>
                                <Flex direction="row" align="start" gap="2" wrap="wrap">
                                    {entries.map((entry, idy) => {
                                        return (
                                            <Flex key={idy} direction="row" align="start" gap="2">
                                                <TwilightEditTimelineAlert
                                                    year={Number(year)}
                                                    maxYears={Object.keys(timeline).length}
                                                    entry={entry}
                                                    moveEvent={moveTimelineEvent}
                                                    deleteEvent={deleteTimelineEvent}
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
                                    onSubmit={addTimelineEvent}
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
