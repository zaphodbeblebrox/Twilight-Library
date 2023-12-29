import { Navigate, Route, Routes } from 'react-router-dom';
import MonstersAndModules from './MonstersAndModules';
import TimelineCreator from './TimelineCreator';
import presetCampaignData from '../../static_data/preset_campaigns.json';
import { useState } from 'react';
import CampaignFinalSettings from './TriggerEvents';
import { TypeCampaignData } from '../static_data_file_configs/PresetCampaignConfig';

function CampaignCreatorRoutes() {
    const intializeDefaultCampaign = () => {
        const presetCampaigns: Record<string, TypeCampaignData> = { ...presetCampaignData };
        const availableCampaigns: string[] = Object.keys(presetCampaigns).sort();
        const defaultCampaign: TypeCampaignData = presetCampaigns[availableCampaigns[0]];
        return defaultCampaign;
    };

    const [selectedCampaign, setSelectedCampaign] = useState(intializeDefaultCampaign);
    const [settlementName, setSettlementName] = useState('Gotham');

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <MonstersAndModules
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
                    Object.entries(selectedCampaign.timeline).length > 0 ? (
                        <TimelineCreator
                            campaignSettings={selectedCampaign}
                            setCampaignSettings={setSelectedCampaign}
                        />
                    ) : (
                        <Navigate to="/twilight-library/dashboard/create-campaign" />
                    )
                }
            />
            <Route
                path="/final-settings"
                element={
                    Object.entries(selectedCampaign.timeline).length > 0 ? (
                        <CampaignFinalSettings
                            settlementName={settlementName}
                            campaignSettings={selectedCampaign}
                            setCampaignSettings={setSelectedCampaign}
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
