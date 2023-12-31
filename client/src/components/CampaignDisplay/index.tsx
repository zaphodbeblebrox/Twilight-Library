import { Tabs, Box, Text, Flex, Button, Heading } from '@radix-ui/themes';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { settlementApi } from '../../service/api';
import TabTimeline from './Timeline';
import TabStorage from './Storage';
import { useEffect } from 'react';
import TabAdvancements from './Advancements';
import TabCampaignSettings from './CampaignSettings';

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
                    <Tabs.Trigger style={{ flex: 1 }} value="arc">
                        Arc
                    </Tabs.Trigger>
                    <Tabs.Trigger style={{ flex: 1 }} value="patterns">
                        Patterns
                    </Tabs.Trigger>
                    <Tabs.Trigger style={{ flex: 1 }} value="campaignSettings">
                        Campaign Settings
                    </Tabs.Trigger>
                </Tabs.List>

                <Box px="4" pt="3" pb="2">
                    <Tabs.Content value="settlement">
                        {/* {getData && <Text size="2">{JSON.stringify(getData, null, 2)}</Text>} */}
                        {getData &&
                            Object.keys(getData.settlement)
                                .sort()
                                .map((objKey, idx) => {
                                    return (
                                        <Flex key={idx} direction="column">
                                            <Heading>{objKey}</Heading>
                                            <Text size="2">{JSON.stringify(getData.settlement[objKey], null, 2)}</Text>
                                        </Flex>
                                    );
                                })}
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
                        <Text size="2">survivors Info...</Text>
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
                    <Tabs.Content value="arc">
                        <Text size="2">arc Info...</Text>
                    </Tabs.Content>
                    <Tabs.Content value="patterns">
                        <Text size="2">patterns Info...</Text>
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
