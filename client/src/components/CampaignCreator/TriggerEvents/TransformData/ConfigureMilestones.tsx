import { TypeCampaignData } from '../../../static_data_file_configs/PresetCampaignConfig';

const ConfigureMilestones = (campaignSettings: TypeCampaignData) => {
    const formattedMilestones = campaignSettings.milestones.reduce(
        (currentMilestoneObject, milestone) => ({
            ...currentMilestoneObject,
            [milestone]: false,
        }),
        {},
    );
    return formattedMilestones;
};

export default ConfigureMilestones;
