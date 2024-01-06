import { Table } from '@radix-ui/themes';
import { TypeServerSettlement, TypeYear } from '../../../../../SettlementTypes';
import CellSettlementEvent from './CellSettlementEvent';
import CellStoryEvents from './CellStoryEvents';
import CellShowdown from './CellShowdown';
import CalcCollectiveCognition from '../Knowledge/CalcCollectiveCognition';

interface TimelineTableProps {
    campaignData: TypeServerSettlement;
    timeline: Record<number, TypeYear>;
    onChange: (updatedTimeline: Record<number, TypeYear>) => void;
}

const TimelineTable = ({ campaignData, timeline, onChange }: TimelineTableProps) => {
    console.log('CC: ', CalcCollectiveCognition(campaignData));
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
                            <Table.Cell align="center">
                                <CellShowdown
                                    campaignData={campaignData}
                                    yearData={timeline[Number(year)]}
                                    onSubmit={(updatedYear) => {
                                        onChange({
                                            ...timeline,
                                            [Number(year)]: updatedYear,
                                        });
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
