import { TypeYear } from '../../../../../../../SettlementTypes';
import { NemesisFightYearLists, TypeCampaignData } from '../../../../static_data_file_configs/PresetCampaignConfig';

const ConfigureBossEvents = (
    campaignSettings: TypeCampaignData,
    timeline: Record<number, TypeYear>,
    nodeType: string,
) => {
    const fightYearKey: keyof NemesisFightYearLists = `${nodeType}_fight_year` as keyof NemesisFightYearLists;
    const nodeKey: keyof TypeCampaignData = `node_${nodeType}` as keyof TypeCampaignData;
    const fightYear = campaignSettings[fightYearKey];
    if (fightYear && campaignSettings[nodeKey]) {
        return {
            ...timeline,
            [fightYear]: {
                ...timeline[fightYear],
                story_event: [
                    ...timeline[fightYear].story_event,
                    { name: 'Nemesis Encounter', monster: String(campaignSettings[nodeKey]) },
                ],
            },
        };
    }

    return timeline;
};

export default ConfigureBossEvents;
