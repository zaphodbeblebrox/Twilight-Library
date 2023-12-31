import { Button, Flex } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { settlementApi } from '../service/api';
import useAxios, { configure } from 'axios-hooks';
import { useEffect, useState } from 'react';
// import { useIsFocused } from '@react-navigation/native';

const DisplayAllCampaigns = () => {
    // const [axiosInitiated, setAxiosInitiated] = useState(false);
    const [{ data, loading, error }, refetch] = useAxios(`${settlementApi}/get`, { useCache: false });
    configure;

    const navigate = useNavigate();

    // const isFocused = useIsFocused();

    // useEffect(() => {
    //     if (isFocused) {
    //         refetch();
    //     }
    // }, [isFocused, refetch]);

    // TODO: Trigger refetch() when navigated to.

    useEffect(() => {
        console.log('Mounted!');
        console.log('Data: ', data);
        console.log('Loading: ', loading);
        console.log('Error: ', error);
        // console.log('DAC has Remounted!', axiosInitiated);
        // axiosInitiated ? refetch() : setAxiosInitiated(true);
    }, [loading]);

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
