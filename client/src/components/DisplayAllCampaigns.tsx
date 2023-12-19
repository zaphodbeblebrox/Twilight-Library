import { Button, Flex } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { settlementApi } from '../service/api';
import { TypeServerSettlement } from '../../../SettlementTypes';
import useAxios from 'axios-hooks';

const DisplayAllCampaigns = () => {
    const [{ data, loading, error }, refetch] = useAxios(`${settlementApi}/get`);
    const [allCampaigns, setAllCampaigns] = useState<TypeServerSettlement[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setAllCampaigns(data.settlements);
        }
    }, [data]);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        console.error('error:', error);
        return <p>Error!</p>;
    }

    return (
        <Flex direction="column" justify="between" align="center" gap="3">
            {data.settlements.map((campaign: Record<string, string>, idx: number) => {
                return (
                    <Button key={idx} onClick={() => navigate(`/twilight-library/campaign/${campaign._id}`)}>
                        {campaign.name}
                    </Button>
                );
            })}
        </Flex>
    );
};

export default DisplayAllCampaigns;
