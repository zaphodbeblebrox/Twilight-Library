import { Flex, Heading, Separator, Button, Text, Tabs, Box } from '@radix-ui/themes';
import useAxios, { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../SettlementTypes';
import { settlementApi } from '../../service/api';
import TimelineTable from '../primitiveComponents/TimelineTable';

interface StorageTabProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<any, any>;
}

const StorageTab = ({ campaignData, dbRefetch }: StorageTabProps) => {
    return (
        <Tabs.Root
            defaultValue="resources"
            style={{ display: 'flex', justifyContent: 'start', flexDirection: 'column', flex: 1, width: '100%' }}
        >
            <Tabs.List>
                <Tabs.Trigger style={{ flex: 1 }} value="resources">
                    Resources
                </Tabs.Trigger>
                <Tabs.Trigger style={{ flex: 1 }} value="gear">
                    Gear
                </Tabs.Trigger>
            </Tabs.List>

            <Box px="4" pt="3" pb="2">
                <Tabs.Content value="resources">
                    <Text size="2">Resource Info...</Text>
                </Tabs.Content>

                <Tabs.Content value="gear">
                    <Text size="2">Gear Info...</Text>
                </Tabs.Content>
            </Box>
        </Tabs.Root>
    );
};

export default StorageTab;
