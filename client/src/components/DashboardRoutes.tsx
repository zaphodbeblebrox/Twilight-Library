import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import CampaignCreatorRoutes from './CampaignCreator';

function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-campaign/*" element={<CampaignCreatorRoutes />} />
        </Routes>
    );
}

export default DashboardRoutes;
