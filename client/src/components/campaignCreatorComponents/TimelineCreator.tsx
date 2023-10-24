import ccData from '../../static_data/campaign_creator.json';

import { Button, Flex, Heading, Separator } from '@radix-ui/themes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimelineTable from '../primitiveComponents/TimelineTable';
import { TypeCampaignData } from './CampaignTypeConfig';

interface TimelineCreatorProps {
    campaignSettings: TypeCampaignData;
    setCampaignSettings: React.Dispatch<React.SetStateAction<TypeCampaignData>>;
}

type campaignDataTypes = string | Record<number, string[]> | Record<string, Record<number, boolean>>;

const TimelineCreator = ({ campaignSettings, setCampaignSettings }: TimelineCreatorProps) => {
    const [timeline, setTimeline] = useState(campaignSettings.timeline);
    const navigate = useNavigate();

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate('/twilight-library/dashboard/create-campaign');
    };

    const handleNavigation = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const updatedCampaign: TypeCampaignData = { ...campaignSettings };
        updatedCampaign.timeline = { ...timeline };
        setCampaignSettings(updatedCampaign);
        navigate('/twilight-library/dashboard/create-campaign/final-settings');
    };
    // console.log('campaign settings', campaignSettings);
    // console.log('timeline', timeline);

    const handleUpdateTimeline = (updatedTimeline: Record<number, string[]>) => {
        setTimeline(updatedTimeline);
        // TODO: Save data to database
    };

    return (
        <Flex direction="column" gap="3">
            <Heading size="7"> Timeline Editor</Heading>
            <Separator my="3" size="4" />
            <TimelineTable
                timeline={timeline}
                onChange={(updatedTimeline: Record<number, string[]>) => handleUpdateTimeline(updatedTimeline)}
            />
            <Flex justify="center" align="center" gap="5">
                <Button
                    onClick={(e) => {
                        handleCancel(e);
                    }}
                >
                    Back
                </Button>
                <Button onClick={(e) => handleNavigation(e)}>Triggered Events</Button>
            </Flex>
        </Flex>
    );
};

export default TimelineCreator;
