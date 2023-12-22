import { TypeInitializedSettlement } from '../../../../../SettlementTypes';
import { NodePillarLists, TypeCampaignData } from '../../static_data_file_configs/PresetCampaignConfig';
import ConfigureMilestones from './ConfigureMilestones';
import ConfigureBasicQuarries from './ConfigureBasicQuarries';
import ConfigureBonusQuarries from './ConfigureBonusQuarries';
import ConfigureNemesis from './ConfigureNemesis';
import ConfigureResourceList from './ConfigureResourceList';
import ConfigureGear from './ConfigureGear';
import ConfigurePrinciple from './ConfigurePrinciple';

const InitializeCampaign = (settlementName: string, campaignSettings: TypeCampaignData): TypeInitializedSettlement => {
    return {
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
};

export default InitializeCampaign;
