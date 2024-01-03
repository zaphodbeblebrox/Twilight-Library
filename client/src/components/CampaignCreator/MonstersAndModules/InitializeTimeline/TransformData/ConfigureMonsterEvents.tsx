import { TypeStoryEvent, TypeYear } from '../../../../../../../SettlementTypes';
import { TimelineOptionList, campaignCreatorData } from '../../../../static_data_file_configs/CampaignCreatorConfig';
import {
    NemesisFightYearLists,
    NodePillarLists,
    TypeCampaignData,
} from '../../../../static_data_file_configs/PresetCampaignConfig';

const ConfigureMonsterEvents = (
    campaignSettings: TypeCampaignData,
    timeline: Record<number, TypeYear>,
    nodeKey: keyof NodePillarLists,
    categoryKey: keyof TimelineOptionList,
) => {
    if (!campaignSettings.flexible_nemesis_encounters && categoryKey === 'nemesis') {
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
        return campaignSettings[nodeKey].reduce((tl, selection) => {
            const categoryTimelineData = campaignCreatorData.timeline[categoryKey];
            if (categoryTimelineData[selection]) {
                return Object.keys(categoryTimelineData[selection]).reduce((updatedTimeline, yearKey) => {
                    const storyEvents = categoryTimelineData[selection][Number(yearKey)].reduce(
                        (storyList: TypeStoryEvent[], yearData) => {
                            return [...storyList, yearData];
                        },
                        updatedTimeline[Number(yearKey)].story_event,
                    );
                    return {
                        ...updatedTimeline,
                        [Number(yearKey)]: { ...updatedTimeline[Number(yearKey)], story_event: storyEvents },
                    };
                }, tl);
            }
            return tl;
        }, timeline);
    }
    return timeline;
};

export default ConfigureMonsterEvents;
