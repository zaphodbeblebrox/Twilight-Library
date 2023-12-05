import { Tabs, Box, Text, Flex, Button } from '@radix-ui/themes';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { settlementApi } from '../../service/api';
import TimelineTab from './TimelineTab';
import StorageTab from './StorageTab';
import { useEffect, useMemo } from 'react';
import AdvancementsTab from './AdvancementsTab';

const CampaignTabs = () => {
    const { id } = useParams();
    const [{ data: getData, loading: getLoading, error: getError }, refetch] = useAxios(`${settlementApi}/get/${id}`);

    const [{ data: patchData, loading: patchLoading, error: patchError }, executePatch] = useAxios(
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
                </Tabs.List>

                <Box px="4" pt="3" pb="2">
                    <Tabs.Content value="settlement">
                        <Text size="2">Settlement Info...</Text>
                        {getData && <Text size="2">{JSON.stringify(getData, null, 2)}</Text>}
                    </Tabs.Content>

                    <Tabs.Content value="timeline">
                        {getData && (
                            <TimelineTab
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
                            <StorageTab
                                campaignData={getData.settlement}
                                dbRefetch={refetch}
                                dbExecutePatch={executePatch}
                            />
                        )}
                    </Tabs.Content>

                    <Tabs.Content value="advancements">
                        {getData && (
                            <AdvancementsTab
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
                </Box>
            </Tabs.Root>
        </Flex>
    );
};

export default CampaignTabs;
