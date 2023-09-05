import { BrowserRouter, Navigate, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import CampaignCreator from './campaignCreatorComponents/CampaignCreator';
import Dashboard from './Dashboard';
import TimelineCreator from './campaignCreatorComponents/TimelineCreator';
import CampaignCreatorRoutes from './campaignCreatorComponents/CampaignCreatorRoutes';

function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-campaign/*" element={<CampaignCreatorRoutes />} />
        </Routes>
    );
}

export default DashboardRoutes;
