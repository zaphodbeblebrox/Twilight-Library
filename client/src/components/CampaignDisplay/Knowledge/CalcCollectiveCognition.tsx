import { useState } from 'react';
import { TypeYear } from '../../../../../SettlementTypes';
import { campaignCreatorData } from '../../static_data_file_configs/CampaignCreatorConfig';

const CalcCollectiveCognition = (timeline: Record<number, TypeYear>) => {
    const [ccCounter, setCCCounter] = useState({});
    // base collective cognition amount
    const baseCC = 1;

    const quarryOptions = [
        ...campaignCreatorData.node_quarry_1,
        ...campaignCreatorData.node_quarry_2,
        ...campaignCreatorData.node_quarry_3,
        ...campaignCreatorData.node_quarry_4,
    ];

    const nemesisOptions = [
        ...campaignCreatorData.node_nemesis_1,
        ...campaignCreatorData.node_nemesis_2,
        ...campaignCreatorData.node_nemesis_3,
    ];

    const calcRules = {
        quarry_level1: { maxCount: 1, value: 1 },
        quarry_level2: { maxCount: 2, value: 2 },
        quarry_level3: { maxCount: 3, value: 3 },
        nemesis_level1: { maxCount: 1, value: 3 },
        nemesis_level2: { maxCount: 1, value: 3 },
        nemesis_level3: { maxCount: 1, value: 3 },
        unique: { maxCount: 1, value: 3 },
    };

    const collectiveCognition = Object.keys(timeline).reduce((yearData) => {}, baseCC);

    console.log('CC: ', collectiveCognition);
};

export default CalcCollectiveCognition;
