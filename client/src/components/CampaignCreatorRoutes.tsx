import { Route, Routes } from 'react-router-dom';
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
                    <TimelineCreator
                        campaignSettings={campaignSettings}
                        setCampaignSettings={setCampaignSettings}
                    />
                }
            />
        </Routes>
    );
}

export default CampaignCreatorRoutes;
