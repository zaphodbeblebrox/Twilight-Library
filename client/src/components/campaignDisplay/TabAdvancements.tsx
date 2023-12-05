import { Box, Flex, Tabs, Text } from '@radix-ui/themes';
import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../SettlementTypes';

interface AdvancementsTabProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<any, any>;
    dbExecutePatch: RefetchFunction<any, any>;
}

const TabAdvancements = ({ campaignData, dbRefetch, dbExecutePatch }: AdvancementsTabProps) => {
    return (
        <Tabs.Root
            defaultValue="innovations"
            style={{ display: 'flex', justifyContent: 'start', flexDirection: 'column', flex: 1, width: '100%' }}
        >
            <Tabs.List>
                <Tabs.Trigger style={{ flex: 1 }} value="innovations">
                    Innovations
                </Tabs.Trigger>
                <Tabs.Trigger style={{ flex: 1 }} value="principles">
                    Principles
                </Tabs.Trigger>
                <Tabs.Trigger style={{ flex: 1 }} value="milestones">
                    Milestones
                </Tabs.Trigger>
                <Tabs.Trigger style={{ flex: 1 }} value="bonuses">
                    Bonuses
                </Tabs.Trigger>
            </Tabs.List>

            <Box px="4" pt="3" pb="2">
                <Tabs.Content value="innovations">{campaignData && <Text>...Loading innovations</Text>}</Tabs.Content>
                <Tabs.Content value="principles">{campaignData && <Text>...Loading principles</Text>}</Tabs.Content>
                <Tabs.Content value="milestones">{campaignData && <Text>...Loading milestones</Text>}</Tabs.Content>
                <Tabs.Content value="bonuses">{campaignData && <Text>...Loading bonuses</Text>}</Tabs.Content>
            </Box>
        </Tabs.Root>
    );
};

export default TabAdvancements;
