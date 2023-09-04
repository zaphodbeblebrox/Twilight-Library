import PillarOptions from './PillarOptions';
import OptionListCC from './OptionListCC';
import ccData from '../static_data/campaign_creator.json';
import RbListCC from './RbListCC';
import { Button, Heading, Flex, Separator } from '@radix-ui/themes';
import { TLSelect } from './primitive_components/primitives';
import { useEffect, useState } from 'react';

// import { Label } from '@radix-ui/react-label';

const CampaignCreator = () => {
    const [presetCampaign, setPresetCampaign] = useState(ccData.campaigns[0]);
    const [campaignSettings, setCampaignSettings] = useState({});

    useEffect(
        () => console.log('checkbox status', campaignSettings),
        [campaignSettings],
    );
    useEffect(() => console.log('campaign', presetCampaign), [presetCampaign]);

    const LoadPresetCampaignSelectionHandler = (campaign: string) => {
        if (ccData.hasOwnProperty(campaign)) {
            const modCampaignSettings: Record<string, boolean> = {
                ...campaignSettings,
            };
            for (const key in modCampaignSettings) {
                modCampaignSettings[key] = false;
            }
            const settings = ccData[campaign as keyof typeof ccData];
            if (Array.isArray(settings)) {
                settings.map(
                    (key: string) => (modCampaignSettings[key] = true),
                );
            }
            setCampaignSettings(modCampaignSettings);
        }
    };

    const CreateTimelineHandler = (e) => {
        e.preventDefault();
    };
    return (
        <form onSubmit={CreateTimelineHandler}>
            <Flex direction="column" justify="start" align="center" gap="3">
                <Heading size="7">Campaign Creator</Heading>
                <Flex justify="center">
                    <TLSelect
                        header={'Preset Campaign'}
                        options={ccData.campaigns}
                        onChange={LoadPresetCampaignSelectionHandler}
                        value={presetCampaign}
                        // setValue={setPresetCampaign}
                    />
                </Flex>
                <Separator my="3" size="4" />
                <Heading size="6">Campaign Pillars</Heading>
                <PillarOptions
                    data={campaignSettings}
                    setData={setCampaignSettings}
                />
                <Flex
                    direction="column"
                    justify="between"
                    align="center"
                    gap="3"
                >
                    <Separator my="3" size="4" />
                    <Heading size="6">Node Quarries</Heading>
                    <Flex
                        direction="row"
                        justify="center"
                        align="start"
                        wrap="wrap"
                        gap="5"
                    >
                        <OptionListCC
                            header="NQ1"
                            options={ccData.node_quarry_1}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                        <OptionListCC
                            header="NQ2"
                            options={ccData.node_quarry_2}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                        <OptionListCC
                            header="NQ3"
                            options={ccData.node_quarry_3}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                        <OptionListCC
                            header={'NQ4'}
                            options={ccData.node_quarry_4}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                    </Flex>
                </Flex>
                <Flex direction="column" justify="start" align="center" gap="3">
                    <Separator my="3" size="4" />
                    <Heading size="6">Node Nemesis</Heading>
                    <Flex
                        direction="row"
                        justify="center"
                        align="start"
                        wrap="wrap"
                        gap="5"
                    >
                        <OptionListCC
                            header="NN1"
                            options={ccData.node_nemesis_1}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                        <OptionListCC
                            header="NN2"
                            options={ccData.node_nemesis_2}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                        <OptionListCC
                            header="NN3"
                            options={ccData.node_nemesis_3}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                    </Flex>
                </Flex>
                <Flex direction="column" justify="start" align="center" gap="3">
                    <Separator my="3" size="4" />
                    <Heading size="6">Node Critical</Heading>
                    <Flex
                        direction="row"
                        justify="center"
                        align="start"
                        wrap="wrap"
                        gap="5"
                    >
                        <RbListCC
                            header="Core"
                            options={ccData.node_core}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                        <RbListCC
                            header="Finale"
                            options={ccData.node_finale}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                        <OptionListCC
                            header="Special"
                            options={ccData.node_special}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                    </Flex>
                </Flex>
                <Flex justify="center" align="center" gap="5">
                    <Button>Cancel</Button>
                    <Button>Timeline</Button>
                </Flex>
            </Flex>
        </form>
    );
};

export default CampaignCreator;
