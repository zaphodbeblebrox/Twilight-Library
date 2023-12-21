import { NodePillarLists, TypeCampaignData } from '../../static_data_file_configs/PresetCampaignConfig';

const ConfigureNemesis = (campaignSettings: TypeCampaignData) => {
    return ['node_nemesis_1', 'node_nemesis_2', 'node_nemesis_3'].reduce((currentNemesisObject, node) => {
        return {
            ...currentNemesisObject,
            ...campaignSettings[node as keyof NodePillarLists].reduce((currentNodeObject, nemesis) => {
                return { ...currentNodeObject, [nemesis]: { 1: false, 2: false, 3: false } };
            }, {}),
        };
    }, {});
};

export default ConfigureNemesis;
