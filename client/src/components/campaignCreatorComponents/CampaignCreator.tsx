import OptionListCampaignCreator from './OptionListCampaignCreator';
import RadioButtonListCampaignCreator from './RadioButtonListCampaignCreator';
import { Button, Heading, Flex, Separator } from '@radix-ui/themes';
import { TwilightSelect, TwilightTextField } from '../primitiveComponents/Primitives';
import { useNavigate } from 'react-router-dom';
import { TypeCampaignData } from './CampaignTypeConfig';
import presetCampaignData from '../../static_data/preset_campaigns.json';

interface CampaignCreatorProps {
    settlementName: string;
    setSettlementName: React.Dispatch<React.SetStateAction<string>>;
    selectedCampaign: TypeCampaignData;
    setSelectedCampaign: React.Dispatch<React.SetStateAction<TypeCampaignData>>;
}

const CampaignCreator = ({
    settlementName,
    setSettlementName,
    selectedCampaign,
    setSelectedCampaign,
}: CampaignCreatorProps) => {
    const navigate = useNavigate();
    const selectCampaignOptions: string[] = Object.keys(presetCampaignData).sort();

    const handleSetPresetCampaign = (campaign: string) => {
        const presetCampaigns: Record<string, TypeCampaignData> = { ...presetCampaignData };
        if (presetCampaignData.hasOwnProperty(campaign)) {
            const newCampaign: TypeCampaignData = presetCampaigns[campaign];
            console.log(newCampaign);
            setSelectedCampaign(newCampaign);
        }
    };

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate('/twilight-library/dashboard');
    };

    const handleCreateTimeline = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (settlementName.length < 2) {
            // TODO: Add Toast popup with warning
            return;
        }
        navigate('/twilight-library/dashboard/create-campaign/timeline');
    };
    return (
        <form onSubmit={(e) => handleCreateTimeline(e)}>
            <Flex direction="column" justify="start" align="center" gap="3">
                <Heading size="7">Campaign Creator</Heading>
                <Flex justify="center">
                    <TwilightSelect
                        header={'Preset Campaign'}
                        defaultOption={selectCampaignOptions[0]}
                        options={selectCampaignOptions}
                        onChange={handleSetPresetCampaign}
                    />
                </Flex>
                <Separator my="3" size="4" />
                <TwilightTextField
                    labelText="Settlement Name"
                    textString={settlementName}
                    onChange={setSettlementName}
                />
                <Separator my="3" size="4" />
                <Flex direction="column" justify="between" align="center" gap="3">
                    <Heading size="6">Campaign Pillars</Heading>
                    <Flex direction="row" justify="center" align="start" wrap="wrap" gap="5">
                        <OptionListCampaignCreator
                            header="Assorted"
                            optionKey="pillars"
                            data={selectedCampaign}
                            setData={setSelectedCampaign}
                        />
                        <OptionListCampaignCreator
                            header="NQ2"
                            optionKey="encounters"
                            data={selectedCampaign}
                            setData={setSelectedCampaign}
                        />
                        <OptionListCampaignCreator
                            header="NQ3"
                            optionKey="wanderers"
                            data={selectedCampaign}
                            setData={setSelectedCampaign}
                        />
                    </Flex>
                </Flex>

                <Flex direction="column" justify="between" align="center" gap="3">
                    <Separator my="3" size="4" />
                    <Heading size="6">Node Quarries</Heading>
                    <Flex direction="row" justify="center" align="start" wrap="wrap" gap="5">
                        <OptionListCampaignCreator
                            header="NQ1"
                            optionKey="node_quarry_1"
                            data={selectedCampaign}
                            setData={setSelectedCampaign}
                        />
                        <OptionListCampaignCreator
                            header="NQ2"
                            optionKey="node_quarry_2"
                            data={selectedCampaign}
                            setData={setSelectedCampaign}
                        />
                        <OptionListCampaignCreator
                            header="NQ3"
                            optionKey="node_quarry_3"
                            data={selectedCampaign}
                            setData={setSelectedCampaign}
                        />
                        <OptionListCampaignCreator
                            header={'NQ4'}
                            optionKey="node_quarry_4"
                            data={selectedCampaign}
                            setData={setSelectedCampaign}
                        />
                    </Flex>
                </Flex>
                <Flex direction="column" justify="start" align="center" gap="3">
                    <Separator my="3" size="4" />
                    <Heading size="6">Node Nemesis</Heading>
                    <Flex direction="row" justify="center" align="start" wrap="wrap" gap="5">
                        <OptionListCampaignCreator
                            header="NN1"
                            optionKey="node_nemesis_1"
                            data={selectedCampaign}
                            setData={setSelectedCampaign}
                        />
                        <OptionListCampaignCreator
                            header="NN2"
                            optionKey="node_nemesis_2"
                            data={selectedCampaign}
                            setData={setSelectedCampaign}
                        />
                        <OptionListCampaignCreator
                            header="NN3"
                            optionKey="node_nemesis_3"
                            data={selectedCampaign}
                            setData={setSelectedCampaign}
                        />
                    </Flex>
                </Flex>
                <Flex direction="column" justify="start" align="center" gap="3">
                    <Separator my="3" size="4" />
                    <Heading size="6">Node Critical</Heading>
                    <Flex direction="row" justify="center" align="start" wrap="wrap" gap="5">
                        <RadioButtonListCampaignCreator
                            header="Core"
                            optionKey="node_core"
                            data={selectedCampaign}
                            setData={setSelectedCampaign}
                        />
                        <RadioButtonListCampaignCreator
                            header="Finale"
                            optionKey="node_finale"
                            data={selectedCampaign}
                            setData={setSelectedCampaign}
                        />
                        <OptionListCampaignCreator
                            header="Special"
                            optionKey="node_special"
                            data={selectedCampaign}
                            setData={setSelectedCampaign}
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
