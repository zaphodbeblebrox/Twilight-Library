import { Flex, Heading, Separator, Button, Text, Tabs, Box } from '@radix-ui/themes';
import useAxios, { RefetchFunction } from 'axios-hooks';
import { SettlementStorageLists, TypeServerSettlement } from '../../../../SettlementTypes';
import { settlementApi } from '../../service/api';
import TimelineTable from '../primitiveComponents/TimelineTable';
import { TwilightEditCountDialog } from '../primitiveComponents/AlertBoxes';
import { TwilightNodeHeader } from '../primitiveComponents/Primitives';

interface ResourceTabProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<any, any>;
}

const ResourceTab = ({ campaignData, dbRefetch }: ResourceTabProps) => {
    const [{ data: patchData, loading: patchLoading, error: patchError }, executePatch] = useAxios(
        {
            url: `${settlementApi}/update/${campaignData._id}`,
            method: 'PATCH',
        },
        { manual: true },
    );
    return (
        <Flex direction="row" wrap="wrap" gap="3">
            {Object.keys(campaignData.resources)
                .sort()
                .map((resourceCategory, idx) => {
                    return (
                        <Flex key={idx} direction="column" gap="1" justify="start" align="end">
                            <TwilightNodeHeader headerText={resourceCategory} />
                            {Object.keys(campaignData.resources[resourceCategory])
                                .sort()
                                .map((resource, idy) => {
                                    const handleCountChange = (updatedCount: number) => {
                                        const updatedResources = { ...campaignData.resources };
                                        updatedResources[resourceCategory][resource] = updatedCount;
                                        console.log(updatedResources);
                                        executePatch({
                                            data: { resources: updatedResources },
                                        })
                                            .then(() => dbRefetch())
                                            .catch((err) => console.error(err));
                                    };
                                    return (
                                        <TwilightEditCountDialog
                                            key={idy}
                                            labelText={resource}
                                            count={campaignData.resources[resourceCategory][resource]}
                                            onSubmit={(updatedCount) => handleCountChange(updatedCount)}
                                        />
                                    );
                                })}
                        </Flex>
                    );
                })}
        </Flex>
    );
};

export default ResourceTab;
