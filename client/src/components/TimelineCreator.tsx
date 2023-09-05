import ccData from '../static_data/campaign_creator.json';

import { Button, Heading, Flex, Separator } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Timeline from './primitive_components/TimelineRow';

interface TimelineCreatorProps {
    campaignSettings: Record<string, boolean>;
    setCampaignSettings: React.Dispatch<React.SetStateAction<{}>>;
}

const TimelineCreator = ({ campaignSettings, setCampaignSettings }: TimelineCreatorProps) => {
    const maximumYears: number = 40;
    const SetDefaultTimeline = () => {
        const newTimeline: Record<number, string[]> = {};
        for (let i: number = 1; i <= maximumYears; i++) {
            newTimeline[i] = [];
        }
        const trueKeys = Object.keys(campaignSettings).filter(
            (key) => campaignSettings[key] === true,
        );
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
    const [timeline, setTimeline] = useState(SetDefaultTimeline);

    const navigate = useNavigate();

    const NaviagationHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate('/twilight-library/dashboard');
    };
    console.log('timeline', campaignSettings);
    return (
        <Flex direction="column">
            <Button onClick={(e) => NaviagationHandler(e)}>Timeline Page!</Button>
            <Timeline timeline={timeline} setTimeline={setTimeline} />
        </Flex>
    );
};

export default TimelineCreator;
