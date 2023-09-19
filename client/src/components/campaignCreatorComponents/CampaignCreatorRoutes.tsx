import { Navigate, Route, Routes } from 'react-router-dom';
import CampaignCreator from './CampaignCreator';
import TimelineCreator from './TimelineCreator';
import ccData from '../../static_data/campaign_creator.json';
import presetCampaignData from '../../static_data/preset_campaigns.json';
import { useState } from 'react';

type TypeCampaignData = {
    node_quarry_1: string[];
    node_quarry_2: string[];
    node_quarry_3: string[];
    node_quarry_4: string[];
    node_nemesis_1: string[];
    node_nemesis_2: string[];
    node_nemesis_3: string[];
    node_core: string;
    node_finale: string | null;
    node_special: string[];
    encounters: string[];
    wanderers: string[];
    pillars: string[];
    milestones: { trigger: string; event: string }[];
    flexible_nemesis_encounters: boolean;
    nn1_lvl1_fight_year: number | null;
    nn1_lvl2_fight_year: number | null;
    nn1_lvl3_fight_year: number | null;
    nn2_lvl1_fight_year: number | null;
    nn2_lvl2_fight_year: number | null;
    nn2_lvl3_fight_year: number | null;
    nn3_lvl1_fight_year: number | null;
    nn3_lvl2_fight_year: number | null;
    nn3_lvl3_fight_year: number | null;
    core_fight_year: number;
    finale_fight_year: number | null;
    timeline: Record<string, string[]>;
    courage_event_1: string;
    courage_event_2: string;
    understanding_event_1: string;
    understanding_event_2: string;
    constellations: boolean;
};

function CampaignCreatorRoutes() {
    const intializeDefaultCampaign = () => {
        const presetCampaigns: Record<string, TypeCampaignData> = { ...presetCampaignData };
        const availableCampaigns: string[] = Object.keys(presetCampaigns).sort();
        const defaultCampaign: TypeCampaignData = presetCampaigns[availableCampaigns[0]];
        return defaultCampaign;
    };

    const initializeSettings = () => {
        const dataHolder: Record<string, boolean> = {};
        ccData.node_quarry_1.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_quarry_2.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_quarry_3.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_quarry_4.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_nemesis_1.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_nemesis_2.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_nemesis_3.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_core.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_finale.forEach((key: string) => (dataHolder[key] = false));
        ccData.node_special.forEach((key: string) => (dataHolder[key] = false));
        ccData.pillars.forEach((key: string) => (dataHolder[key] = false));
        ccData.encounters.forEach((key: string) => (dataHolder[key] = false));
        ccData.wanderers.forEach((key: string) => (dataHolder[key] = false));

        const defaultCampaign: TypeCampaignData = intializeDefaultCampaign();

        defaultCampaign.node_quarry_1.forEach((key: string) => (dataHolder[key] = true));
        defaultCampaign.node_quarry_2.forEach((key: string) => (dataHolder[key] = true));
        defaultCampaign.node_quarry_3.forEach((key: string) => (dataHolder[key] = true));
        defaultCampaign.node_quarry_4.forEach((key: string) => (dataHolder[key] = true));
        defaultCampaign.node_nemesis_1.forEach((key: string) => (dataHolder[key] = true));
        defaultCampaign.node_nemesis_2.forEach((key: string) => (dataHolder[key] = true));
        defaultCampaign.node_nemesis_3.forEach((key: string) => (dataHolder[key] = true));
        dataHolder[defaultCampaign.node_core] = true;
        if (defaultCampaign.node_finale !== null) {
            dataHolder[defaultCampaign.node_finale] = true;
        }
        defaultCampaign.node_special.forEach((key: string) => (dataHolder[key] = true));
        defaultCampaign.pillars.forEach((key: string) => (dataHolder[key] = true));
        defaultCampaign.encounters.forEach((key: string) => (dataHolder[key] = true));
        defaultCampaign.wanderers.forEach((key: string) => (dataHolder[key] = true));

        return dataHolder;
    };
    const [selectedCampaign, setSelectedCampaign] = useState(intializeDefaultCampaign);
    const [timeline, setTimeline] = useState([]);
    const [campaignSettings, setCampaignSettings] = useState(initializeSettings);
    const [settlementName, setSettlementName] = useState('');

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <CampaignCreator
                        settlementName={settlementName}
                        setSettlementName={setSettlementName}
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
                            settlementName={settlementName}
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
