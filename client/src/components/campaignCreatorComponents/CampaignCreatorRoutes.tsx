import { Navigate, Route, Routes } from 'react-router-dom';
import CampaignCreator from './CampaignCreator';
import TimelineCreator from './TimelineCreator';
import presetCampaignData from '../../static_data/preset_campaigns.json';
import { useState } from 'react';
import { TypeCampaignData } from './CampaignTypeConfig';

function CampaignCreatorRoutes() {
    const intializeDefaultCampaign = () => {
        const presetCampaigns: Record<string, TypeCampaignData> = { ...presetCampaignData };
        const availableCampaigns: string[] = Object.keys(presetCampaigns).sort();
        const defaultCampaign: TypeCampaignData = presetCampaigns[availableCampaigns[0]];
        return defaultCampaign;
    };

    const [selectedCampaign, setSelectedCampaign] = useState(intializeDefaultCampaign);
    const [timeline, setTimeline] = useState({});
    const [settlementName, setSettlementName] = useState('');

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <CampaignCreator
                        settlementName={settlementName}
                        setSettlementName={setSettlementName}
                        selectedCampaign={selectedCampaign}
                        setSelectedCampaign={setSelectedCampaign}
                    />
                }
            />

            <Route
                path="/timeline"
                element={
                    <TimelineCreator
                        settlementName={settlementName}
                        campaignSettings={selectedCampaign}
                        timeline={timeline}
                        setTimeline={setTimeline}
                    />
                }
            />
        </Routes>
    );
}

export default CampaignCreatorRoutes;
