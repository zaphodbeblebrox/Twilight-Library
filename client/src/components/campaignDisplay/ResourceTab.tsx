import { Flex, Heading, Separator, Button, Text, Tabs, Box } from '@radix-ui/themes';
import useAxios, { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../SettlementTypes';
import { settlementApi } from '../../service/api';
import TimelineTable from '../primitiveComponents/TimelineTable';

interface ResourceTabProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<any, any>;
}

const ResourceTab = ({ campaignData, dbRefetch }: ResourceTabProps) => {
    return (
        <Flex direction="row" wrap="wrap" gap="3">
            {Object.keys(campaignData.resources)
                .sort()
                .map((resourceCategory, idx) => {
                    return (
                        <Flex key={idx} direction="column" gap="1" justify="start" align="center">
                            <h3>{resourceCategory}</h3>
                            {Object.keys(campaignData.resources[resourceCategory])
                                .sort()
                                .map((resource, idy) => {
                                    return (
                                        <Flex key={idy} direction="row" justify="end">
                                            <p>{resource}:</p>
                                            <p>{campaignData.resources[resourceCategory][resource]}</p>
                                        </Flex>
                                    );
                                })}
                        </Flex>
                    );
                })}
        </Flex>
    );
};

export default ResourceTab;
