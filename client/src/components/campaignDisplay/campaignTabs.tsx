import { Tabs, Box, Text } from '@radix-ui/themes';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { TypeServerSettlement } from '../../../../SettlementTypes';
import { settlementApi } from '../../service/api';
import TimelineTab from './TimelineTab';

const CampaignTabs = () => {
    const { id } = useParams();

    const [{ data, loading, error }, refetch] = useAxios(`${settlementApi}/get/${id}`);
    const navigate = useNavigate();

    return (
        <Tabs.Root defaultValue="settlement">
            <Tabs.List>
                <Tabs.Trigger value="settlement">Settlement</Tabs.Trigger>
                <Tabs.Trigger value="timeline">Timeline</Tabs.Trigger>
                <Tabs.Trigger value="survivors">Survivors</Tabs.Trigger>
                <Tabs.Trigger value="storage">Storage</Tabs.Trigger>
                <Tabs.Trigger value="innovations">Innovations</Tabs.Trigger>
                <Tabs.Trigger value="arc">Arc</Tabs.Trigger>
                <Tabs.Trigger value="patterns">Patterns</Tabs.Trigger>
            </Tabs.List>

            <Box px="4" pt="3" pb="2">
                <Tabs.Content value="settlement">
                    <Text size="2">Settlement Info...</Text>
                    {data && <Text size="2">{JSON.stringify(data, null, 2)}</Text>}
                </Tabs.Content>

                <Tabs.Content value="timeline">
                    {data && <TimelineTab campaignData={data.settlement} dbRefetch={refetch} />}
                </Tabs.Content>

                <Tabs.Content value="survivors">
                    <Text size="2">survivors Info...</Text>
                </Tabs.Content>

                <Tabs.Content value="storage">
                    <Text size="2">storage Info...</Text>
                </Tabs.Content>

                <Tabs.Content value="innovations">
                    <Text size="2">innovations Info...</Text>
                </Tabs.Content>
                <Tabs.Content value="arc">
                    <Text size="2">arc Info...</Text>
                </Tabs.Content>
                <Tabs.Content value="patterns">
                    <Text size="2">patterns Info...</Text>
                </Tabs.Content>
            </Box>
        </Tabs.Root>
    );
};

export default CampaignTabs;
