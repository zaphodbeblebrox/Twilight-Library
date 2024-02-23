import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../../SettlementTypes';
import { Box, Flex, Heading, Tabs, Text } from '@radix-ui/themes';

interface TabSurvivorsProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<null, null>;
    dbExecutePatch: RefetchFunction<Partial<TypeServerSettlement>, null>;
}

const TabSurvivors = ({ campaignData, dbRefetch, dbExecutePatch }: TabSurvivorsProps) => {
    return (
        <Tabs.Root
            defaultValue="alive"
            style={{ display: 'flex', justifyContent: 'start', flexDirection: 'column', flex: 1, width: '100%' }}
        >
            <Tabs.List>
                <Tabs.Trigger style={{ flex: 1 }} value="alive">
                    Alive
                </Tabs.Trigger>
                <Tabs.Trigger style={{ flex: 1 }} value="dead">
                    Dead
                </Tabs.Trigger>
                <Tabs.Trigger style={{ flex: 1 }} value="departed">
                    Departed
                </Tabs.Trigger>
            </Tabs.List>

            <Box px="4" pt="3" pb="2">
                <Tabs.Content value="alive">{campaignData && <p>survivors - alive</p>}</Tabs.Content>
                <Tabs.Content value="dead">{campaignData && <p>survivors - dead</p>}</Tabs.Content>
                <Tabs.Content value="departed">{campaignData && <p>survivors - departed</p>}</Tabs.Content>
            </Box>
        </Tabs.Root>
    );
};

export default TabSurvivors;
