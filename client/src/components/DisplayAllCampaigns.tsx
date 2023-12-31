import { Button, Flex } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { settlementApi } from '../service/api';
import useAxios, { configure } from 'axios-hooks';

const DisplayAllCampaigns = () => {
    const [{ data, loading, error }, refetch] = useAxios(`${settlementApi}/get`, { useCache: false });
    configure;

    const navigate = useNavigate();

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
