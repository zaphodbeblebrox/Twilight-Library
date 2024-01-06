import { TypeInitializedSettlement } from '../../../../../SettlementTypes';
import { NodePillarLists, TypeCampaignData } from '../../static_data_file_configs/PresetCampaignConfig';
import { TransformData } from './TransformData';

const InitializeCampaign = (settlementName: string, campaignSettings: TypeCampaignData): TypeInitializedSettlement => {
    return {
        name: settlementName,
        timeline: { ...campaignSettings.timeline },
        courage_event_1: campaignSettings.courage_event_1,
        courage_event_2: campaignSettings.courage_event_2,
        understanding_event_1: campaignSettings.understanding_event_1,
        understanding_event_2: campaignSettings.understanding_event_1,
        milestones: { ...TransformData.Milestones(campaignSettings) },
        quarries: {
            ...TransformData.BasicQuarries(campaignSettings),
            ...TransformData.BonusQuarries(campaignSettings),
        },
        nemesis: {
            ...TransformData.Nemesis(campaignSettings),
            [campaignSettings.node_core as keyof NodePillarLists]: { 1: 0 },
            [campaignSettings.node_finale as keyof NodePillarLists]: { 1: 0 },
        },
        constellations: campaignSettings.constellations,
        arc_survivors: campaignSettings.pillars.includes('Arc Survivors'),
        resources: { ...TransformData.ResourceList(campaignSettings) },
        gear: { ...TransformData.Gear() },
        intimacy: campaignSettings.intimacy,
        principle_conviction: { ...TransformData.Principle(campaignSettings, 'principle_conviction') },
        principle_death: { ...TransformData.Principle(campaignSettings, 'principle_death') },
        principle_new_life: { ...TransformData.Principle(campaignSettings, 'principle_new_life') },
        principle_society: { ...TransformData.Principle(campaignSettings, 'principle_society') },
    };
};

export default InitializeCampaign;
