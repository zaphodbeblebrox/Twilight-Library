import { Button, Flex, Heading, Separator } from '@radix-ui/themes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimelineTable from './TimelineTable';
import { TypeCampaignData } from '../../static_data_file_configs/PresetCampaignConfig';

interface TimelineCreatorProps {
    campaignSettings: TypeCampaignData;
    setCampaignSettings: React.Dispatch<React.SetStateAction<TypeCampaignData>>;
}

const TimelineCreator = ({ campaignSettings, setCampaignSettings }: TimelineCreatorProps) => {
    const [timeline, setTimeline] = useState(campaignSettings.timeline);
    const navigate = useNavigate();

    console.log('in progress timeline', timeline);

    return (
        <Flex direction="column" gap="3">
            <Heading size="7"> Timeline Editor</Heading>
            <Separator my="3" size="4" />

            <TimelineTable timeline={timeline} onChange={(updatedTimeline) => setTimeline(updatedTimeline)} />

            <Flex justify="center" align="center" gap="5">
                <Button onClick={() => navigate('/twilight-library/dashboard/create-campaign')}>Back</Button>
                <Button
                    onClick={() => {
                        setCampaignSettings({ ...campaignSettings, timeline: { ...timeline } });
                        navigate('/twilight-library/dashboard/create-campaign/final-settings');
                    }}
                >
                    Triggered Events
                </Button>
            </Flex>
        </Flex>
    );
};

export default TimelineCreator;
