import { campaignCreatorData } from '../../../static_data_file_configs/CampaignCreatorConfig';
import { NodePillarLists, TypeCampaignData } from '../../../static_data_file_configs/PresetCampaignConfig';

const ConfigureBonusQuarries = (campaignSettings: TypeCampaignData) => {
    return ['node_quarry_1', 'node_quarry_2', 'node_quarry_3', 'node_quarry_4'].reduce((currentQuarryObject, node) => {
        return {
            ...currentQuarryObject,
            ...campaignSettings[node as keyof NodePillarLists]
                .filter((quarry) => quarry in campaignCreatorData.bonus_quarries)
                .reduce((currentNodeObject, quarry: string) => {
                    return {
                        ...currentNodeObject,
                        ...Object.keys(campaignCreatorData.bonus_quarries[quarry]).reduce(
                            (currentBonusQuarry, bonusQuarry: string) => {
                                return {
                                    ...currentBonusQuarry,
                                    [bonusQuarry]: {
                                        ...campaignCreatorData.bonus_quarries[quarry][bonusQuarry].reduce(
                                            (currentLevelObject: Record<number, number>, level: number) => {
                                                return { ...currentLevelObject, [level]: 0 };
                                            },
                                            {},
                                        ),
                                    },
                                };
                            },
                            {},
                        ),
                    };
                }, {}),
        };
    }, {});
};

export default ConfigureBonusQuarries;
