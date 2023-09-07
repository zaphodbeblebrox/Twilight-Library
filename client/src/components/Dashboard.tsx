import PillarOptions from './campaignCreatorComponents/PillarOptions';
import OptionListCC from './campaignCreatorComponents/OptionListCC';
import ccData from '../static_data/campaign_creator.json';
import RadioButtonListCC from './campaignCreatorComponents/RadioButtonListCC';
import { Button, Heading, Flex, Separator } from '@radix-ui/themes';
import { TLSelect } from './primitiveComponents/Primitives';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { Label } from '@radix-ui/react-label';

const Dashboard = () => {
    const navigate = useNavigate();
    const NaviagationHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate('/twilight-library/dashboard/create-campaign');
    };
    return (
        <Flex>
            <Button onClick={(e) => NaviagationHandler(e)}>New Campaign</Button>
        </Flex>
    );
};

export default Dashboard;
