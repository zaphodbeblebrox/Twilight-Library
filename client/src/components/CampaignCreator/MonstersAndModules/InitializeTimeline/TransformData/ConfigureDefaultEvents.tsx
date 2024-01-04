import { TypeYear } from '../../../../../../../SettlementTypes';
import { TypeCampaignData } from '../../../../static_data_file_configs/PresetCampaignConfig';

const ConfigureDefaultEvents = (campaignSettings: TypeCampaignData, timeline: Record<number, TypeYear>) => {
    return Object.keys(campaignSettings.default_timeline).reduce((updatedTimeline, yearKey) => {
        return {
            ...updatedTimeline,
            [Number(yearKey)]: {
                ...updatedTimeline[Number(yearKey)],
                story_event: [
                    ...updatedTimeline[Number(yearKey)].story_event,
                    ...campaignSettings.default_timeline[yearKey],
                ],
            },
        };
    }, timeline);
};

export default ConfigureDefaultEvents;
