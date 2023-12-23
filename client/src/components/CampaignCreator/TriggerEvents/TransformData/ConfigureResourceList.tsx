import { TypeCampaignData } from '../../../static_data_file_configs/PresetCampaignConfig';
import { TypeResourceListData, resourceListData } from '../../../static_data_file_configs/ResourceListConfig';

const createResourceGroup = (categoryKey: keyof TypeResourceListData) => {
    return resourceListData[categoryKey].reduce((currentResourceObject, resource) => {
        return {
            ...currentResourceObject,
            [resource]: 0,
        };
    }, {});
};

const ConfigureResourceList = (campaignSettings: TypeCampaignData) => {
    const monsterList = [
        ...campaignSettings.node_nemesis_1,
        ...campaignSettings.node_nemesis_2,
        ...campaignSettings.node_nemesis_3,
        ...campaignSettings.node_quarry_1,
        ...campaignSettings.node_quarry_2,
        ...campaignSettings.node_quarry_3,
        ...campaignSettings.node_quarry_4,
        campaignSettings.node_core,
        'Basic',
    ];

    return monsterList
        .filter((monster) => monster && Object.keys(resourceListData).includes(monster))
        .reduce((currentResourceObject, monster) => {
            return monster
                ? {
                      ...currentResourceObject,
                      [monster]: createResourceGroup(monster as keyof TypeResourceListData),
                  }
                : { ...currentResourceObject };
        }, {});
};

export default ConfigureResourceList;
