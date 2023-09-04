import {
    BrowserRouter,
    Navigate,
    Route,
    RouterProvider,
    Routes,
    createBrowserRouter,
} from 'react-router-dom';
import CampaignCreator from './CampaignCreator';
import Dashboard from './Dashboard';
import TimelineCreator from './TimelineCreator';
import CampaignCreatorRoutes from './CampaignCreatorRoutes';

function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-campaign/*" element={<CampaignCreatorRoutes />} />
        </Routes>
    );
}

export default DashboardRoutes;
