import { Navigate, Route, Routes } from 'react-router-dom';
import CampaignCreator from './CampaignCreator';
import TimelineCreator from './TimelineCreator';
import ccData from '../../static_data/campaign_creator.json';
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

    const initializeSettings = () => {
        const dataHolder: Record<string, boolean> = {};
        ccData.node_quarry_1.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_quarry_2.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_quarry_3.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_quarry_4.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_nemesis_1.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_nemesis_2.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_nemesis_3.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_core.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_finale.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_special.forEach((key: string) => (dataHolder[key] = false));
        ccData.pillars.forEach((key: string) => (dataHolder[key] = false));
        ccData.encounters.forEach((key: string) => (dataHolder[key] = false));
        ccData.wanderers.forEach((key: string) => (dataHolder[key] = false));

        selectedCampaign.node_quarry_1.forEach((key: string) => (dataHolder[key] = true));
        selectedCampaign.node_quarry_2.forEach((key: string) => (dataHolder[key] = true));
        selectedCampaign.node_quarry_3.forEach((key: string) => (dataHolder[key] = true));
        selectedCampaign.node_quarry_4.forEach((key: string) => (dataHolder[key] = true));
        selectedCampaign.node_nemesis_1.forEach((key: string) => (dataHolder[key] = true));
        selectedCampaign.node_nemesis_2.forEach((key: string) => (dataHolder[key] = true));
        selectedCampaign.node_nemesis_3.forEach((key: string) => (dataHolder[key] = true));
        dataHolder[selectedCampaign.node_core] = true;
        if (selectedCampaign.node_finale !== null) {
            dataHolder[selectedCampaign.node_finale] = true;
        }
        selectedCampaign.node_special.forEach((key: string) => (dataHolder[key] = true));
        selectedCampaign.pillars.forEach((key: string) => (dataHolder[key] = true));
        selectedCampaign.encounters.forEach((key: string) => (dataHolder[key] = true));
        selectedCampaign.wanderers.forEach((key: string) => (dataHolder[key] = true));

        return dataHolder;
    };

    const [selectedCampaign, setSelectedCampaign] = useState(intializeDefaultCampaign);
    const [timeline, setTimeline] = useState({});
    const [campaignSettings, setCampaignSettings] = useState(initializeSettings);
    const [settlementName, setSettlementName] = useState('');

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <CampaignCreator
                        settlementName={settlementName}
                        setSettlementName={setSettlementName}
                        campaignSettings={campaignSettings}
                        setCampaignSettings={setCampaignSettings}
                        selectedCampaign={selectedCampaign}
                        setSelectedCampaign={setSelectedCampaign}
                        handleCampaignChange={initializeSettings}
                        timeline={timeline}
                        setTimeline={setTimeline}
                    />
                }
            />

            <Route
                path="/timeline"
                element={
                    Object.entries(campaignSettings).length > 0 ? (
                        <TimelineCreator
                            settlementName={settlementName}
                            campaignSettings={campaignSettings}
                            setCampaignSettings={setCampaignSettings}
                        />
                    ) : (
                        <Navigate to="/twilight-library/dashboard/create-campaign" />
                    )
                }
            />
        </Routes>
    );
}

export default CampaignCreatorRoutes;
