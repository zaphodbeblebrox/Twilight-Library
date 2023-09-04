import PillarOptions from './PillarOptions';
import OptionListCC from './OptionListCC';
import ccData from '../static_data/campaign_creator.json';
import RbListCC from './RbListCC';
import { Button, Heading, Flex, Separator } from '@radix-ui/themes';
import { TLSelect } from './primitive_components/primitives';
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
