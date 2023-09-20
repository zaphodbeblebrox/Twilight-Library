import ccData from '../../static_data/campaign_creator.json';

import { Button, Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimelineTable from '../primitiveComponents/TimelineTable';
import { TypeCampaignData } from './CampaignTypeConfig';

interface TimelineCreatorProps {
    settlementName: string;
    campaignSettings: TypeCampaignData;
    timeline: Record<number, string[]>;
    setTimeline: React.Dispatch<React.SetStateAction<{}>>;
}

type campaignDataTypes = string | Record<number, string[]> | Record<string, Record<number, boolean>>;

const TimelineCreator = ({ settlementName, campaignSettings, setCampaignSettings }: TimelineCreatorProps) => {
    const maximumYears: number = 40;
    const setDefaultTimeline = () => {
        const newTimeline: Record<number, string[]> = {};
        for (let i: number = 1; i <= maximumYears; i++) {
            newTimeline[i] = [];
        }
        const trueKeys = Object.keys(campaignSettings).filter((key) => campaignSettings[key] === true);
        const jsonData: Record<string, Record<string, string[]>> = ccData['timeline'];
        trueKeys.forEach((key: string) => {
            if (jsonData.hasOwnProperty(key)) {
                const jsonKeyData: Record<string, string[]> = jsonData[key];
                Object.keys(jsonKeyData).forEach((yearKey: string) => {
                    jsonKeyData[yearKey].forEach((yearData: string) => {
                        newTimeline[parseInt(yearKey, 10)].push(yearData);
                    });
                });
            }
        });
        console.log('timeline', newTimeline);
        return newTimeline;
    };
    const [timeline, setTimeline] = useState(setDefaultTimeline);

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
