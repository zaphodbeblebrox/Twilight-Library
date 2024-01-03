import { TypeYear } from '../../../../../../../SettlementTypes';
import { NemesisFightYearLists, TypeCampaignData } from '../../../../static_data_file_configs/PresetCampaignConfig';

const ConfigureBossEvents = (
    campaignSettings: TypeCampaignData,
    timeline: Record<number, TypeYear>,
    nodeType: string,
) => {
    const fightYearKey: keyof NemesisFightYearLists = `${nodeType}_fight_year` as keyof NemesisFightYearLists;
    const nodeKey: keyof TypeCampaignData = `node_${nodeType}` as keyof TypeCampaignData;
    if (campaignSettings[fightYearKey] && campaignSettings[nodeKey]) {
        timeline[campaignSettings[fightYearKey]!].push(`NE - ${campaignSettings[nodeKey]}`);
    }

    return timeline;
};

export default ConfigureBossEvents;
