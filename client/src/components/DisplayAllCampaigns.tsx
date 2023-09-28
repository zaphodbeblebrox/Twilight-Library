import { Button, Flex } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { settlementApi } from '../service/api';
import { TypeServerSettlement } from '../../../SettlementTypes';

const DisplayAllCampaigns = () => {
    const navigate = useNavigate();
    const [allCampaigns, setAllCampaigns] = useState<TypeServerSettlement[]>([]);

    useEffect(() => {
        axios
            .get(`${settlementApi}/get`)
            .then((res) => {
                console.log(res.data);
                setAllCampaigns(res.data.settlements);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleNavigation = () => {
        navigate('/twilight-library/dashboard/create-campaign');
    };
    return (
        <Flex direction="column" justify="between" align="center" gap="3">
            {allCampaigns.map((campaign, idx) => {
                return <Button key={idx}>{campaign.name}</Button>;
            })}
        </Flex>
    );
};

export default DisplayAllCampaigns;
