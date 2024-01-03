import { TypeCampaignData } from '../../../../static_data_file_configs/PresetCampaignConfig';

const ConfigureDefaultEvents = (campaignSettings: TypeCampaignData, timeline: Record<number, string[]>) => {
    Object.keys(campaignSettings.default_timeline).forEach((yearKey: string) => {
        campaignSettings.default_timeline[Number(yearKey)].forEach((yearData: string) => {
            timeline[Number(yearKey)].push(yearData);
        });
    });

    return timeline;
};

export default ConfigureDefaultEvents;
