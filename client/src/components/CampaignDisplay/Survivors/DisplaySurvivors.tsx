import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../../SettlementTypes';
import { Box, Flex, Heading, Tabs, Text } from '@radix-ui/themes';
import Fuse from 'fuse.js';
import CreateNewSurvivorDialog from './CreateNewSurvivorDialog';

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
    // create object of only alive or dead survivors using filter
    const survivorList = campaignData.survivors.filter((survivor) => survivor.is_dead === showDeadSurvivors);
    return (
        <Flex>
            {!showDeadSurvivors && <CreateNewSurvivorDialog onSubmit={(newSurvivor) => {}} />}
            {survivorList.map((survivor, idx) => {
                return <p key={idx}>{survivor.first_name}</p>;
            })}
            <p>placeholder</p>
        </Flex>
    );
};

export default DisplaySurvivors;
