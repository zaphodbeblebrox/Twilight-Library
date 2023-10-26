import './App.css';
import { BrowserRouter, Navigate, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import CampaignCreator from './components/campaignCreatorComponents/CampaignCreator';
import DashboardRoutes from './components/DashboardRoutes';
import CampaignTabs from './components/campaignDisplay/campaignTabs';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to="/twilight-library/dashboard" />} />
                    <Route path="/twilight-library/dashboard/*" element={<DashboardRoutes />} />
                    <Route path="/twilight-library/campaign/:id" element={<CampaignTabs />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
