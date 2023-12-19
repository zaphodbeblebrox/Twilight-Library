import { Box, Tabs, Text } from '@radix-ui/themes';
import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../SettlementTypes';
import SubTabInnovations from './SubTabInnovations';

interface TabAdvancementsProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<null, null>;
    dbExecutePatch: RefetchFunction<Partial<TypeServerSettlement>, null>;
}

const TabAdvancements = ({ campaignData, dbRefetch, dbExecutePatch }: TabAdvancementsProps) => {
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
                <Tabs.Content value="innovations">
                    {campaignData && (
                        <SubTabInnovations
                            campaignData={campaignData}
                            dbRefetch={dbRefetch}
                            dbExecutePatch={dbExecutePatch}
                        />
                    )}
                </Tabs.Content>
                <Tabs.Content value="principles">{campaignData && <Text>...Loading principles</Text>}</Tabs.Content>
                <Tabs.Content value="milestones">{campaignData && <Text>...Loading milestones</Text>}</Tabs.Content>
                <Tabs.Content value="bonuses">{campaignData && <Text>...Loading bonuses</Text>}</Tabs.Content>
            </Box>
        </Tabs.Root>
    );
};

export default TabAdvancements;
