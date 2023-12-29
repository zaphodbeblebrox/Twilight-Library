import { PrinciplesDefaultLists, TypeCampaignData } from '../../../static_data_file_configs/PresetCampaignConfig';

const ConfigurePrinciple = (campaignSettings: TypeCampaignData, principleKey: keyof PrinciplesDefaultLists) => {
    const options = Object.keys(campaignSettings[principleKey]).reduce((principleObj, principleOption) => {
        const principleSettings = campaignSettings[principleKey];
        if (principleSettings[principleOption as keyof typeof principleSettings] !== 'None') {
            return [...principleObj, principleSettings[principleOption as keyof typeof principleSettings]];
        }
        return principleObj;
    }, []);

    if (options.length === 0) {
        return { selected: null, options: null };
    } else if (options.length === 1) {
        return { selected: options[0], options: [...options] };
    } else {
        return { selected: null, options: [...options] };
    }
};

export default ConfigurePrinciple;
