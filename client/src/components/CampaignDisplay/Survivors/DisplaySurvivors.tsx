import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../../SettlementTypes';
import { Box, Flex, Heading, Tabs, Text } from '@radix-ui/themes';
import Fuse from 'fuse.js';
import CreateNewSurvivorDialog from './CreateNewSurvivorDialog';
import SurvivorCard from './SurvivorCard';

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
    // const survivorIdList = campaignData.survivors.filter((survivor) => survivor.is_dead === showDeadSurvivors);
    const survivorIdList = Object.keys(campaignData.survivors)
        .map((survivorId) => Number(survivorId))
        .filter((survivorId) => campaignData.survivors[survivorId].is_dead === showDeadSurvivors);
    return (
        <Flex direction={'column'}>
            {!showDeadSurvivors && (
                <CreateNewSurvivorDialog
                    campaignData={campaignData}
                    onSubmit={(newSurvivor) => {
                        dbExecutePatch({
                            data: { survivors: { ...campaignData.survivors, [newSurvivor.id]: newSurvivor } },
                        })
                            .then(() => dbRefetch())
                            .catch((err) => console.error(err));
                    }}
                />
            )}
            {survivorIdList.map((survivorId, idx) => {
                return (
                    <SurvivorCard
                        key={idx}
                        survivorData={campaignData.survivors[survivorId]}
                        onChange={(updatedSurvivor) => {
                            dbExecutePatch({
                                data: { survivors: { ...campaignData.survivors, [survivorId]: updatedSurvivor } },
                            })
                                .then(() => dbRefetch())
                                .catch((err) => console.error(err));
                        }}
                    />
                );
            })}
        </Flex>
    );
};

export default DisplaySurvivors;
