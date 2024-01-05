import { Flex, Separator, Table } from '@radix-ui/themes';
import { TypeYear } from '../../../../../SettlementTypes';

interface TimelineRowProps {
    year: number;
    yearData: TypeYear;
    onChange: (updatedTimeline: Record<number, TypeYear>) => void;
}

const TimelineRow = ({ year, yearData }: TimelineRowProps) => {};

export default TimelineRow;
