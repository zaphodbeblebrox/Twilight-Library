import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CampaignCreator from './components/CampaignCreator';
//import JsonStuff from "./static_data/card_database.json";

function App() {
    // console.log(
    //   JSON.stringify(
    //     Object.fromEntries(Object.entries(JsonStuff.knowledge).sort()),
    //   ),
    // );

    const router = createBrowserRouter([
        {
            path: '/',
            element: <CampaignCreator />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
