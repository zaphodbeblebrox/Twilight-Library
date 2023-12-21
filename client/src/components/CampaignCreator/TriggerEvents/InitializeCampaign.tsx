import useAxios from 'axios-hooks';
import { TypeInitializedSettlement } from '../../../../../SettlementTypes';
import { settlementApi } from '../../../service/api';
import { NodePillarLists, TypeCampaignData } from '../../static_data_file_configs/PresetCampaignConfig';
import { useNavigate } from 'react-router-dom';
import ConfigureMilestones from './ConfigureMilestones';
import ConfigureBasicQuarries from './ConfigureBasicQuarries';
import ConfigureBonusQuarries from './ConfigureBonusQuarries';
import ConfigureNemesis from './ConfigureNemesis';
import ConfigureResourceList from './ConfigureResourceList';
import ConfigureGear from './ConfigureGear';
import ConfigurePrinciple from './ConfigurePrinciple';

interface InitializeCampaignProps {
    settlementName: string;
    campaignSettings: TypeCampaignData;
}

const InitializeCampaign = ({ settlementName, campaignSettings }: InitializeCampaignProps) => {
    const navigate = useNavigate();
    const [, executePost] = useAxios(
        {
            url: `${settlementApi}/create`,
            method: 'POST',
        },
        { manual: true },
    );

    const campaignData: TypeInitializedSettlement = {
        name: settlementName,
        timeline: { ...campaignSettings.timeline },
        courage_event_1: campaignSettings.courage_event_1,
        courage_event_2: campaignSettings.courage_event_2,
        understanding_event_1: campaignSettings.understanding_event_1,
        understanding_event_2: campaignSettings.understanding_event_1,
        milestones: { ...ConfigureMilestones(campaignSettings) },
        quarries: { ...ConfigureBasicQuarries(campaignSettings), ...ConfigureBonusQuarries(campaignSettings) },
        nemesis: {
            ...ConfigureNemesis(campaignSettings),
            [campaignSettings.node_core as keyof NodePillarLists]: { 1: false },
        },
        constellations: campaignSettings.constellations,
        arc_survivors: campaignSettings.pillars.includes('Arc Survivors'),
        resources: { ...ConfigureResourceList(campaignSettings) },
        gear: { ...ConfigureGear() },
        intimacy: campaignSettings.intimacy,
        principle_conviction: { ...ConfigurePrinciple(campaignSettings, 'principle_conviction') },
        principle_death: { ...ConfigurePrinciple(campaignSettings, 'principle_death') },
        principle_new_life: { ...ConfigurePrinciple(campaignSettings, 'principle_new_life') },
        principle_society: { ...ConfigurePrinciple(campaignSettings, 'principle_society') },
    };

    //Save data to database
    console.log('data', campaignData);

    executePost({
        data: campaignData,
    })
        .then(() => navigate('/twilight-library/dashboard'))
        .catch((err) => console.error(err));
};

export default InitializeCampaign;
