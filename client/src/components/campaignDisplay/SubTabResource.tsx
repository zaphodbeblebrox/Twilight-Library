import { Flex } from '@radix-ui/themes';
import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../SettlementTypes';
import { TwilightEditCountDialog } from '../primitiveComponents/AlertBoxes';
import { TwilightNodeHeader } from '../primitiveComponents/Primitives';

interface SubTabResourceProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<any, any>;
    dbExecutePatch: RefetchFunction<any, any>;
}

const SubTabResource = ({ campaignData, dbRefetch, dbExecutePatch }: SubTabResourceProps) => {
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
                                        dbExecutePatch({
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

export default SubTabResource;
