import PillarOptions from './PillarOptions';
import OptionListCC from './OptionListCC';
import ccData from '../static_data/campaign_creator.json';
import RbListCC from './RbListCC';
import { Button, Heading, Flex, Separator } from '@radix-ui/themes';
import { TLSelect } from './primitive_components/primitives';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TimelineCreatorProps {
    campaignSettings: Record<string, boolean>;
    setCampaignSettings: React.Dispatch<React.SetStateAction<{}>>;
}

const TimelineCreator = ({ campaignSettings, setCampaignSettings }: TimelineCreatorProps) => {
    const navigate = useNavigate();
    const NaviagationHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate('/twilight-library/dashboard');
    };
    console.log('timeline', campaignSettings);
    return (
        <Flex>
            <Button onClick={(e) => NaviagationHandler(e)}>Timeline Page!</Button>
        </Flex>
    );
};

export default TimelineCreator;
