import { Flex, Text } from '@radix-ui/themes';
import { TypeYear } from '../../../../../SettlementTypes';

interface SettlementEventCellProps {
    yearData: TypeYear;
}

const SettlementEventCell = ({ yearData }: SettlementEventCellProps) => {
    if (yearData.settlement_event) {
        return <Text>{yearData.settlement_event}</Text>;
    } else {
        return <Text>-</Text>;
    }
};

export default SettlementEventCell;
