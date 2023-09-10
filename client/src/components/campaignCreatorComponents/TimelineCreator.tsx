import ccData from '../../static_data/campaign_creator.json';

import { Button, Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimelineTable from '../primitiveComponents/TimelineTable';

interface TimelineCreatorProps {
    campaignSettings: Record<string, boolean>;
    setCampaignSettings: React.Dispatch<React.SetStateAction<{}>>;
}

const TimelineCreator = ({ campaignSettings, setCampaignSettings }: TimelineCreatorProps) => {
    const maximumYears: number = 40;
    const setDefaultTimeline = () => {
        const newTimeline: Record<number, string[]> = {};
        for (let i: number = 1; i <= maximumYears; i++) {
            newTimeline[i] = [];
        }
        const trueKeys = Object.keys(campaignSettings).filter((key) => campaignSettings[key] === true);
        console.log(trueKeys);
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
        navigate('/twilight-library/dashboard');
    };

    const handleNavigation = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate('/twilight-library/dashboard');
    };
    console.log('timeline', campaignSettings);

    const handleUpdateTimeline = (updatedTimeline: Record<number, string[]>) => {
        setTimeline(updatedTimeline);
        // TODO: Save data to database
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
                    Cancel
                </Button>
                <Button onClick={(e) => handleNavigation(e)}>Dashboard</Button>
            </Flex>
        </Flex>
    );
};

export default TimelineCreator;
