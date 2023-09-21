import ccData from '../../static_data/campaign_creator.json';

import { Button, Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimelineTable from '../primitiveComponents/TimelineTable';
import { TypeCampaignData } from './CampaignTypeConfig';

interface TimelineCreatorProps {
    settlementName: string;
    campaignSettings: TypeCampaignData;
    setCampaignSettings: React.Dispatch<React.SetStateAction<TypeCampaignData>>;
}

type campaignDataTypes = string | Record<number, string[]> | Record<string, Record<number, boolean>>;

const TimelineCreator = ({ settlementName, campaignSettings, setCampaignSettings }: TimelineCreatorProps) => {
    const [timeline, setTimeline] = useState(campaignSettings.timeline);
    console.log(timeline);

    const navigate = useNavigate();
    const handleCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate('/twilight-library/dashboard/create-campaign');
    };

    const handleNavigation = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate('/twilight-library/dashboard');
    };
    console.log('campaign settings', campaignSettings);
    console.log('timeline', timeline);

    const handleUpdateTimeline = (updatedTimeline: Record<number, string[]>) => {
        setTimeline(updatedTimeline);
        // TODO: Save data to database
    };

    const handleSaveCampaignOnServer = () => {
        const campaignData: Record<string, campaignDataTypes> = {};
        campaignData['timeline'] = { ...timeline };
        campaignData['name'] = settlementName;
        // TODO: Loop through quarries to make data structure

        // TODO: Loop through nemesis to make data structure

        // TODO: Save data to database

        // TODO: Navigate to dashboard
    };

    return (
        <Flex direction="column" gap="3">
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
                <Button onClick={(e) => handleNavigation(e)}>Create Campaign</Button>
            </Flex>
        </Flex>
    );
};

export default TimelineCreator;
