import { TimelineOptionList } from '../../../../static_data_file_configs/CampaignCreatorConfig';
import {
    NemesisFightYearLists,
    NodePillarLists,
    TypeCampaignData,
} from '../../../../static_data_file_configs/PresetCampaignConfig';

const ConfigureMonsterEvents = (
    campaignSettings: TypeCampaignData,
    timeline: Record<number, string[]>,
    nodeKey: keyof NodePillarLists,
    typeKey: keyof TimelineOptionList,
) => {
    if (!campaignSettings.flexible_nemesis_encounters && typeKey === 'nemesis') {
        // Handle strict Nemesis timeline
        const nemesis_tier: string = nodeKey.slice(-1);
        campaignSettings[nodeKey].forEach((selection: string) => {
            [1, 2, 3].forEach((level: number) => {
                const fight_str = `nn${nemesis_tier}_lvl${level}_fight_year`;
                const fight_key: keyof NemesisFightYearLists = fight_str as keyof NemesisFightYearLists;
                const fight_year: number | null = campaignSettings[fight_key];
                if (fight_year !== null) {
                    timeline[fight_year].push(`NE - ${selection} lvl ${level}`);
                }
            });
        });
    } else {
        campaignSettings[nodeKey].forEach((selection: string) => {
            const query: Record<string, Record<string, string[]>> = campaignSettings.timeline[typeKey];
            if (query[selection]) {
                Object.keys(query[selection]).forEach((yearKey: string) => {
                    query[selection][Number(yearKey)].forEach((yearData: string) => {
                        timeline[Number(yearKey)].push(yearData);
                    });
                });
            }
        });
    }
    return timeline;
};

export default ConfigureMonsterEvents;
