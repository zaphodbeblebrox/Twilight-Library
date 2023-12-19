import { Tabs, Box } from '@radix-ui/themes';
import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../SettlementTypes';
import SubTabResource from './SubTabResource';
import SubTabGear from './SubTabGear';

interface TabStorageProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<null, null>;
    dbExecutePatch: RefetchFunction<Partial<TypeServerSettlement>, null>;
}

const TabStorage = ({ campaignData, dbRefetch, dbExecutePatch }: TabStorageProps) => {
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
                    {campaignData && (
                        <SubTabResource
                            campaignData={campaignData}
                            dbRefetch={dbRefetch}
                            dbExecutePatch={dbExecutePatch}
                        />
                    )}
                </Tabs.Content>

                <Tabs.Content value="gear">
                    {campaignData && (
                        <SubTabGear campaignData={campaignData} dbRefetch={dbRefetch} dbExecutePatch={dbExecutePatch} />
                    )}
                </Tabs.Content>
            </Box>
        </Tabs.Root>
    );
};

export default TabStorage;
