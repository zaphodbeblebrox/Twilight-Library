import './App.css';
import { BrowserRouter, Navigate, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import CampaignCreator from './components/campaignCreatorComponents/CampaignCreator';
import DashboardRoutes from './components/DashboardRoutes';
import CampaignTabs from './components/campaignDisplay/CampaignTabs';
import { Flex } from '@radix-ui/themes';

function App() {
    return (
        <BrowserRouter>
            <Flex className="App" direction="column" justify="start" align="center" style={{ width: '100%' }}>
                <Routes>
                    <Route path="/" element={<Navigate to="/twilight-library/dashboard" />} />
                    <Route path="/twilight-library/dashboard/*" element={<DashboardRoutes />} />
                    <Route path="/twilight-library/campaign/:id" element={<CampaignTabs />} />
                </Routes>
            </Flex>
        </BrowserRouter>
    );
}

export default App;
