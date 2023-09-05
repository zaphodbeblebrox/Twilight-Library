import { Button, Heading, Flex, Separator, Box, Table } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TLAddTimelineAlert, TLEditTimelineAlert } from './AlertBoxes';

interface TimelineProps {
    timeline: Record<number, string[]>;
    onChange: Function;
}

const Timeline = ({ timeline, onChange }: TimelineProps) => {
    const addTimelineEvent = (year: number, newTimelineEvent: string) => {
        const updatedTimeline = { ...timeline };
        updatedTimeline[year] = [...updatedTimeline[year], newTimelineEvent];
        onChange(updatedTimeline);
    };

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
                    <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {Object.keys(timeline).map((year: string, idx: number) => {
                    const entries: string[] = timeline[Number(year)];
                    return (
                        <Table.Row key={idx} align="center">
                            <Table.RowHeaderCell justify="center">{year}</Table.RowHeaderCell>
                            <Table.Cell>
                                <Flex direction="row" align="start" gap="2" wrap="wrap">
                                    {entries.map((entry, idy) => {
                                        return (
                                            <Flex key={idy} direction="row" align="start" gap="2">
                                                <TLEditTimelineAlert
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
                                <TLAddTimelineAlert year={Number(year)} onSubmit={addTimelineEvent} />
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table.Root>
    );
};

export default Timeline;
