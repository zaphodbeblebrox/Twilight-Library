import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../../SettlementTypes';
import { Box, Flex, Heading, Tabs, Text } from '@radix-ui/themes';

interface DisplaySurvivorsProps {
    campaignData: TypeServerSettlement;
    showDeadSurvivors?: boolean;
    dbRefetch: RefetchFunction<null, null>;
    dbExecutePatch: RefetchFunction<Partial<TypeServerSettlement>, null>;
}

const DisplaySurvivors = ({
    campaignData,
    showDeadSurvivors = false,
    dbRefetch,
    dbExecutePatch,
}: DisplaySurvivorsProps) => {
    // TODO: create object of only alive or dead survivors using search
    // TODO: display all survivors in object
};

export default DisplaySurvivors;
