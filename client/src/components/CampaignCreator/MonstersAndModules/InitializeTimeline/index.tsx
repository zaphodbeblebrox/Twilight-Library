import { TypeYear } from '../../../../../../SettlementTypes';
import { TypeCampaignData } from '../../../static_data_file_configs/PresetCampaignConfig';
import { TransformData } from './TransformData';

const InitializeTimeline = (campaignSettings: TypeCampaignData) => {
    // Initialize timeline, empty of story events
    const timeline: Record<number, TypeYear> = Array.from(
        { length: campaignSettings.max_years },
        (_, index) => index + 1,
    ).reduce(
        (obj, year) => ({
            ...obj,
            [year]: { story_event: [], settlement_event: null, monster: null, monster_level: null, victorious: null },
        }),
        {},
    );

    // Populate Timeline
    const monsterTimelineFunctionArray = [
        (tl: Record<number, TypeYear>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'node_quarry_1', 'quarries'),
        (tl: Record<number, TypeYear>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'node_quarry_2', 'quarries'),
        (tl: Record<number, TypeYear>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'node_quarry_3', 'quarries'),
        (tl: Record<number, TypeYear>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'node_quarry_4', 'quarries'),
        (tl: Record<number, TypeYear>) => TransformData.AddMonsterEvents(campaignSettings, tl, 'pillars', 'pillars'),
        (tl: Record<number, TypeYear>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'encounters', 'encounters'),
        (tl: Record<number, TypeYear>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'wanderers', 'wanderers'),
        (tl: Record<number, TypeYear>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'node_nemesis_1', 'nemesis'),
        (tl: Record<number, TypeYear>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'node_nemesis_2', 'nemesis'),
        (tl: Record<number, TypeYear>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'node_nemesis_3', 'nemesis'),
        (tl: Record<number, TypeYear>) => TransformData.AddBossEvents(campaignSettings, tl, 'core'),
        (tl: Record<number, TypeYear>) => TransformData.AddBossEvents(campaignSettings, tl, 'finale'),
        (tl: Record<number, TypeYear>) => TransformData.AddDefaultEvents(campaignSettings, tl),
    ];
    const updatedTimeline: Record<number, TypeYear> = monsterTimelineFunctionArray.reduce(
        (currentTimeline, monsterEventFunction) => {
            return monsterEventFunction(currentTimeline);
        },
        timeline,
    );
    console.log('converted timeline:', updatedTimeline);
    return updatedTimeline;
};

export default InitializeTimeline;
