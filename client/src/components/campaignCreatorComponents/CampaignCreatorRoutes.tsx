import { Navigate, Route, Routes } from 'react-router-dom';
import CampaignCreator from './CampaignCreator';
import TimelineCreator from './TimelineCreator';
import ccData from '../../static_data/campaign_creator.json';
import { useState } from 'react';

function CampaignCreatorRoutes() {
    const initializeSettings = () => {
        const dataHolder: Record<string, boolean> = {};
        ccData.node_nemesis_1.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_nemesis_2.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_nemesis_3.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_core.forEach((key: string) => (dataHolder[key] = false));
        dataHolder[ccData.node_core[0]] = true;
        ccData.node_finale.forEach((key: string) => (dataHolder[key] = false));
        dataHolder[ccData.node_finale[0]] = true;
        return dataHolder;
    };
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
