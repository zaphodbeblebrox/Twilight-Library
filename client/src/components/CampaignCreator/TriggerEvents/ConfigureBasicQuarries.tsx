import { NodePillarLists, TypeCampaignData } from '../../static_data_file_configs/PresetCampaignConfig';

const ConfigureBasicQuarries = (campaignSettings: TypeCampaignData) => {
    return ['node_quarry_1', 'node_quarry_2', 'node_quarry_3', 'node_quarry_4'].reduce((currentQuarryObject, node) => {
        return {
            ...currentQuarryObject,
            ...campaignSettings[node as keyof NodePillarLists].reduce((currentNodeObject, quarry) => {
                return { ...currentNodeObject, [quarry]: { 1: false, 2: false, 3: false } };
            }, {}),
        };
    }, {});
};

export default ConfigureBasicQuarries;
