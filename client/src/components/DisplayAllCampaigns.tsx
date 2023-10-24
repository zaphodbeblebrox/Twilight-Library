import { Button, Flex } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { settlementApi } from '../service/api';
import { TypeServerSettlement } from '../../../SettlementTypes';
import useAxios from 'axios-hooks';

const DisplayAllCampaigns = () => {
    const [{ data, loading, error }, refetch] = useAxios(`${settlementApi}/get`);
    const [allCampaigns, setAllCampaigns] = useState<TypeServerSettlement[]>([]);

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

    // useEffect(() => {
    //     try {
    //         (async () => {
    //             const res = await axios.get(`${settlementApi}/get`);
    //             console.log('res data', res.data);
    //             setAllCampaigns(res.data.settlements);
    //         })();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }, []);

    return (
        <Flex direction="column" justify="between" align="center" gap="3">
            {allCampaigns.map((campaign, idx) => {
                return <Button key={idx}>{campaign.name}</Button>;
            })}
        </Flex>
    );
};

export default DisplayAllCampaigns;
