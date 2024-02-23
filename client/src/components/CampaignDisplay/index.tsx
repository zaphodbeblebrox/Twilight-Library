import { Tabs, Box, Text, Flex, Button } from '@radix-ui/themes';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { settlementApi } from '../../service/api';
import TabTimeline from './Timeline';
import TabStorage from './Storage';
import { useEffect } from 'react';
import TabAdvancements from './Advancements';
import TabCampaignSettings from './CampaignSettings';
import TabKnowledge from './Knowledge';
import TabSettlement from './Settlement';
import TabSurvivors from './Survivors';

const CampaignTabs = () => {
    const { id } = useParams();
    const [{ data: getData }, refetch] = useAxios(`${settlementApi}/get/${id}`);

    const [, executePatch] = useAxios(
        {
            url: `${settlementApi}/update/${id}`,
            method: 'PATCH',
        },
        { manual: true },
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (getData) {
            console.log('Settlement Data', getData.settlement);
        }
    }, [getData]);

    return (
        <Flex direction="column" style={{ width: '100%' }}>
            <Button
                onClick={() => {
                    navigate('/twilight-library/dashboard');
                }}
            >
                Dashboard
            </Button>

            <Tabs.Root
                defaultValue="settlement"
                style={{ display: 'flex', justifyContent: 'start', flexDirection: 'column', flex: 1, width: '100%' }}
            >
                <Tabs.List>
                    <Tabs.Trigger style={{ flex: 1 }} value="settlement">
                        Settlement
                    </Tabs.Trigger>
                    <Tabs.Trigger style={{ flex: 1 }} value="timeline">
                        Timeline
                    </Tabs.Trigger>
                    <Tabs.Trigger style={{ flex: 1 }} value="survivors">
                        Survivors
                    </Tabs.Trigger>
                    <Tabs.Trigger style={{ flex: 1 }} value="storage">
                        Storage
                    </Tabs.Trigger>
                    <Tabs.Trigger style={{ flex: 1 }} value="advancements">
                        Advancements
                    </Tabs.Trigger>
                    <Tabs.Trigger style={{ flex: 1 }} value="knowledge">
                        Knowledge
                    </Tabs.Trigger>
                    <Tabs.Trigger style={{ flex: 1 }} value="campaignSettings">
                        Campaign Settings
                    </Tabs.Trigger>
                </Tabs.List>

                <Box px="4" pt="3" pb="2">
                    <Tabs.Content value="settlement">
                        {getData && (
                            <TabSettlement
                                campaignData={getData.settlement}
                                dbRefetch={refetch}
                                dbExecutePatch={executePatch}
                            />
                        )}
                    </Tabs.Content>

                    <Tabs.Content value="timeline">
                        {getData && (
                            <TabTimeline
                                campaignData={getData.settlement}
                                dbRefetch={refetch}
                                dbExecutePatch={executePatch}
                            />
                        )}
                    </Tabs.Content>

                    <Tabs.Content value="survivors">
                        {getData && (
                            <TabSurvivors
                                campaignData={getData.settlement}
                                dbRefetch={refetch}
                                dbExecutePatch={executePatch}
                            />
                        )}
                    </Tabs.Content>

                    <Tabs.Content value="storage">
                        {getData && (
                            <TabStorage
                                campaignData={getData.settlement}
                                dbRefetch={refetch}
                                dbExecutePatch={executePatch}
                            />
                        )}
                    </Tabs.Content>

                    <Tabs.Content value="advancements">
                        {getData && (
                            <TabAdvancements
                                campaignData={getData.settlement}
                                dbRefetch={refetch}
                                dbExecutePatch={executePatch}
                            />
                        )}
                    </Tabs.Content>
                    <Tabs.Content value="knowledge">
                        {getData && (
                            <TabKnowledge
                                campaignData={getData.settlement}
                                dbRefetch={refetch}
                                dbExecutePatch={executePatch}
                            />
                        )}
                    </Tabs.Content>
                    <Tabs.Content value="campaignSettings">
                        {getData && (
                            <TabCampaignSettings
                                campaignData={getData.settlement}
                                dbRefetch={refetch}
                                dbExecutePatch={executePatch}
                            />
                        )}
                    </Tabs.Content>
                </Box>
            </Tabs.Root>
        </Flex>
    );
};

export default CampaignTabs;
