import { Button, Heading, Flex, Separator, Box, Table } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TimelineProps {
    timeline: Record<number, string[]>;
    setTimeline: React.Dispatch<React.SetStateAction<Record<number, string[]>>>;
}

const Timeline = ({ timeline, setTimeline }: TimelineProps) => {
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
                                {entries.map((entry, idy) => {
                                    return (
                                        <Button key={idy} variant="ghost">
                                            {entry}
                                        </Button>
                                    );
                                })}
                            </Table.Cell>
                            <Table.Cell justify="center">
                                <Button>+</Button>
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table.Root>
    );
};

export default Timeline;
