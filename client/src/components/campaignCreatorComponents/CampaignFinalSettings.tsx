import { Button, Flex, Heading, Separator } from '@radix-ui/themes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimelineTable from '../primitiveComponents/TimelineTable';
import { TypeCampaignData } from './CampaignTypeConfig';

interface CampaignFinalSettingsProps {
    settlementName: string;
    campaignSettings: TypeCampaignData;
    setCampaignSettings: React.Dispatch<React.SetStateAction<TypeCampaignData>>;
}

const CampaignFinalSettings = ({
    settlementName,
    campaignSettings,
    setCampaignSettings,
}: CampaignFinalSettingsProps) => {
    const handleSaveCampaignOnServer = () => {
        // const campaignData: Record<string, campaignDataTypes> = {};
        // campaignData['timeline'] = { ...timeline };
        // campaignData['name'] = settlementName;
        // TODO: Loop through quarries to make data structure
        // TODO: Loop through nemesis to make data structure
        // TODO: Save data to database
        // TODO: Navigate to dashboard
    };
    return (
        <Flex direction="column" gap="3">
            <Heading size="7"> Timeline Editor</Heading>
        </Flex>
    );
};

export default CampaignFinalSettings;
