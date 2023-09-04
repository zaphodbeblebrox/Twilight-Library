import { Navigate, Route, Routes } from 'react-router-dom';
import CampaignCreator from './CampaignCreator';
import TimelineCreator from './TimelineCreator';
import { useState } from 'react';

function CampaignCreatorRoutes() {
    const [campaignSettings, setCampaignSettings] = useState({});

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <CampaignCreator
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
