import { TypeCampaignData } from '../../../static_data_file_configs/PresetCampaignConfig';
import { TransformData } from './TransformData';

const InitializeTimeline = (campaignSettings: TypeCampaignData) => {
    const maximumYears: number = 40;
    const timeline: Record<number, string[]> = Array.from({ length: maximumYears }, (_, index) => index + 1).reduce(
        (obj, key) => ({ ...obj, [key]: [] }),
        {},
    );
    // Populate Timeline
    const monsterTimelineFunctionArray = [
        (tl: Record<number, string[]>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'node_quarry_1', 'quarries'),
        (tl: Record<number, string[]>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'node_quarry_2', 'quarries'),
        (tl: Record<number, string[]>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'node_quarry_3', 'quarries'),
        (tl: Record<number, string[]>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'node_quarry_4', 'quarries'),
        (tl: Record<number, string[]>) => TransformData.AddMonsterEvents(campaignSettings, tl, 'pillars', 'pillars'),
        (tl: Record<number, string[]>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'encounters', 'encounters'),
        (tl: Record<number, string[]>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'wanderers', 'wanderers'),
        (tl: Record<number, string[]>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'node_nemesis_1', 'nemesis'),
        (tl: Record<number, string[]>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'node_nemesis_2', 'nemesis'),
        (tl: Record<number, string[]>) =>
            TransformData.AddMonsterEvents(campaignSettings, tl, 'node_nemesis_3', 'nemesis'),
        (tl: Record<number, string[]>) => TransformData.AddBossEvents(campaignSettings, tl, 'core'),
        (tl: Record<number, string[]>) => TransformData.AddBossEvents(campaignSettings, tl, 'finale'),
        (tl: Record<number, string[]>) => TransformData.AddDefaultEvents(campaignSettings, tl),
    ];
    const updatedTimeline: Record<number, string[]> = monsterTimelineFunctionArray.reduce(
        (currentTimeline, monsterEventFunction) => {
            return monsterEventFunction(currentTimeline);
        },
        timeline,
    );
    console.log('testing timeline:', updatedTimeline);
    return updatedTimeline;
};

export default InitializeTimeline;
