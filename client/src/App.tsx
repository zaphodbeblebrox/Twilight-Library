import './App.css';
import {
    BrowserRouter,
    Navigate,
    Route,
    RouterProvider,
    Routes,
    createBrowserRouter,
} from 'react-router-dom';
import CampaignCreator from './components/CampaignCreator';
import DashboardRoutes from './components/DashboardRoutes';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/twilight-library/dashboard" />}
                    />
                    <Route
                        path="/twilight-library/dashboard/*"
                        element={<DashboardRoutes />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
