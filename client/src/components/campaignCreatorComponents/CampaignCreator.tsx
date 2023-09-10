import PillarOptions from './PillarOptions';
import OptionListCampaignCreator from './OptionListCampaignCreator';
import ccData from '../../static_data/campaign_creator.json';
import RadioButtonListCampaignCreator from './RadioButtonListCampaignCreator';
import { Button, Heading, Flex, Separator } from '@radix-ui/themes';
import { TwilightSelect } from '../primitiveComponents/Primitives';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CampaignCreatorProps {
    campaignSettings: Record<string, boolean>;
    setCampaignSettings: React.Dispatch<React.SetStateAction<{}>>;
}

const CampaignCreator = ({ campaignSettings, setCampaignSettings }: CampaignCreatorProps) => {
    const navigate = useNavigate();

    const handleLoadPresetCampaignSelection = (campaign: string) => {
        if (ccData.hasOwnProperty(campaign)) {
            const modCampaignSettings: Record<string, boolean> = {
                ...campaignSettings,
            };
            for (const key in modCampaignSettings) {
                modCampaignSettings[key] = false;
            }
            const settings = ccData[campaign as keyof typeof ccData];
            if (Array.isArray(settings)) {
                settings.forEach((key: string) => (modCampaignSettings[key] = true));
            }
            setCampaignSettings(modCampaignSettings);
        }
    };

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate('/twilight-library/dashboard');
    };

    const handleCreateTimeline = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate('/twilight-library/dashboard/create-campaign/timeline');
    };
    return (
        <form onSubmit={(e) => handleCreateTimeline(e)}>
            <Flex direction="column" justify="start" align="center" gap="3">
                <Heading size="7">Campaign Creator</Heading>
                <Flex justify="center">
                    <TwilightSelect
                        header={'Preset Campaign'}
                        defaultOption={ccData.campaigns[0]}
                        options={ccData.campaigns}
                        onChange={handleLoadPresetCampaignSelection}
                    />
                </Flex>
                <Separator my="3" size="4" />
                <Heading size="6">Campaign Pillars</Heading>
                <PillarOptions data={campaignSettings} setData={setCampaignSettings} />
                <Flex direction="column" justify="between" align="center" gap="3">
                    <Separator my="3" size="4" />
                    <Heading size="6">Node Quarries</Heading>
                    <Flex direction="row" justify="center" align="start" wrap="wrap" gap="5">
                        <OptionListCampaignCreator
                            header="NQ1"
                            options={ccData.node_quarry_1}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                        <OptionListCampaignCreator
                            header="NQ2"
                            options={ccData.node_quarry_2}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                        <OptionListCampaignCreator
                            header="NQ3"
                            options={ccData.node_quarry_3}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                        <OptionListCampaignCreator
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
                    <Flex direction="row" justify="center" align="start" wrap="wrap" gap="5">
                        <OptionListCampaignCreator
                            header="NN1"
                            options={ccData.node_nemesis_1}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                        <OptionListCampaignCreator
                            header="NN2"
                            options={ccData.node_nemesis_2}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                        <OptionListCampaignCreator
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
                    <Flex direction="row" justify="center" align="start" wrap="wrap" gap="5">
                        <RadioButtonListCampaignCreator
                            header="Core"
                            options={ccData.node_core}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                        <RadioButtonListCampaignCreator
                            header="Finale"
                            options={ccData.node_finale}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                        <OptionListCampaignCreator
                            header="Special"
                            options={ccData.node_special}
                            data={campaignSettings}
                            setData={setCampaignSettings}
                        />
                    </Flex>
                </Flex>
                <Flex justify="center" align="center" gap="5">
                    <Button
                        onClick={(e) => {
                            handleCancel(e);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button>Timeline</Button>
                </Flex>
            </Flex>
        </form>
    );
};

export default CampaignCreator;
