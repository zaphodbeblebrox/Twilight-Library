import { Button, Flex, Heading, Separator, Text } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { TwilightAddEventAlert, TwilightEditTextAlert } from '../../primitiveComponents/AlertBoxes';
import { settlementApi } from '../../../service/api';
import useAxios from 'axios-hooks';
import { CourageUnderstandingLists, TypeCampaignData } from '../../static_data_file_configs/PresetCampaignConfig';
import InitializeCampaign from './InitializeCampaign';

interface CampaignFinalSettingsProps {
    settlementName: string;
    campaignSettings: TypeCampaignData;
    setCampaignSettings: React.Dispatch<React.SetStateAction<TypeCampaignData>>;
}

const CampaignFinalSettings = ({
    settlementName,
    campaignSettings,
    setCampaignSettings,
}: CampaignFinalSettingsProps) => {
    const navigate = useNavigate();

    const [, executePost] = useAxios(
        {
            url: `${settlementApi}/create`,
            method: 'POST',
        },
        { manual: true },
    );

    const handleCourageUnderstandingChange = (newValue: string, objectKey: string) => {
        const updatedCampaign: TypeCampaignData = { ...campaignSettings };
        updatedCampaign[objectKey as keyof CourageUnderstandingLists] = newValue;
        setCampaignSettings(updatedCampaign);
    };

    const handleSaveCampaignOnServer = () => {
        const campaignData = InitializeCampaign(settlementName, campaignSettings);
        console.log('data', campaignData);
        // executePost({
        //     data: campaignData,
        // })
        //     .then(() => navigate('/twilight-library/dashboard'))
        //     .catch((err) => console.error(err));
    };

    return (
        <Flex direction="column" justify="start" align="center" gap="3">
            <Heading size="7">Triggered Events</Heading>
            <Separator my="3" size="4" />
            <Flex direction="column" justify="between" align="center" gap="3">
                <Heading size="6">Milestone Events</Heading>
                <Flex direction="column" justify="center" align="start" wrap="wrap" gap="5">
                    {campaignSettings.milestones.map((milestone, idy) => {
                        const handleMilestoneChange = (newValue: string) => {
                            const updatedCampaign: TypeCampaignData = { ...campaignSettings };
                            updatedCampaign.milestones[idy] = newValue;
                            setCampaignSettings(updatedCampaign);
                        };
                        const handleDelete = () => {
                            const updatedCampaign: TypeCampaignData = { ...campaignSettings };
                            const updatedMilestones = updatedCampaign.milestones.filter((event) => milestone !== event);
                            updatedCampaign.milestones = [...updatedMilestones];
                            setCampaignSettings(updatedCampaign);
                        };
                        return (
                            <TwilightEditTextAlert
                                key={idy}
                                labelText={'Edit Milestone'}
                                textInput={milestone}
                                onSubmit={handleMilestoneChange}
                                onDelete={handleDelete}
                            />
                        );
                    })}
                </Flex>
                <TwilightAddEventAlert
                    buttonText="Add Milestone"
                    title="Add Milestone Event"
                    label="Milestone:"
                    onSubmit={(addedEvent) => {
                        const updatedCampaign: TypeCampaignData = { ...campaignSettings };
                        updatedCampaign.milestones = [...updatedCampaign.milestones, addedEvent];
                        setCampaignSettings(updatedCampaign);
                    }}
                />
                <Separator my="3" size="4" />
                <Flex direction="column" justify="between" align="center" gap="3">
                    <Heading size="6">Courage Events</Heading>
                    <Flex direction="column" justify="between" align="start" gap="3">
                        <Flex direction="row" justify="between" align="center" gap="3">
                            <Text>Courage Event 1: </Text>
                            <TwilightEditTextAlert
                                labelText={'Edit Courage Event 1'}
                                textInput={campaignSettings.courage_event_1}
                                onSubmit={(newValue: string, objectKey?: string) =>
                                    handleCourageUnderstandingChange(newValue, objectKey!)
                                }
                                objectKey="courage_event_1"
                            />
                        </Flex>
                        <Flex direction="row" justify="between" align="center" gap="3">
                            <Text>Courage Event 2: </Text>
                            <TwilightEditTextAlert
                                labelText={'Edit Courage Event 2'}
                                textInput={campaignSettings.courage_event_2}
                                onSubmit={(newValue: string, objectKey?: string) =>
                                    handleCourageUnderstandingChange(newValue, objectKey!)
                                }
                                objectKey="courage_event_2"
                            />
                        </Flex>
                    </Flex>
                </Flex>
                <Separator my="3" size="4" />
                <Flex direction="column" justify="between" align="center" gap="3">
                    <Heading size="6">Understanding Events</Heading>
                    <Flex direction="column" justify="center" align="start" gap="3">
                        <Flex direction="row" justify="between" align="center" gap="3">
                            <Text>Understanding Event 1: </Text>
                            <TwilightEditTextAlert
                                labelText={'Edit Understanding Event 1'}
                                textInput={campaignSettings.understanding_event_1}
                                onSubmit={(newValue: string, objectKey?: string) =>
                                    handleCourageUnderstandingChange(newValue, objectKey!)
                                }
                                objectKey="understanding_event_1"
                            />
                        </Flex>
                        <Flex direction="row" justify="between" align="center" gap="3">
                            <Text>Understanding Event 2: </Text>
                            <TwilightEditTextAlert
                                labelText={'Edit Understanding Event 2'}
                                textInput={campaignSettings.understanding_event_2}
                                onSubmit={(newValue: string, objectKey?: string) =>
                                    handleCourageUnderstandingChange(newValue, objectKey!)
                                }
                                objectKey="understanding_event_2"
                            />
                        </Flex>
                    </Flex>
                </Flex>
                <Separator my="3" size="4" />
                <Flex>
                    <Heading size="6">Intimacy</Heading>
                    {/* TODO Add Initimacy */}
                </Flex>
                <Separator my="3" size="4" />
                <Flex>
                    <Heading size="6">Principles</Heading>
                    {/* TODO Add Principles */}
                </Flex>
            </Flex>
            <Flex justify="center" align="center" gap="5">
                <Button
                    onClick={() => {
                        navigate('/twilight-library/dashboard/create-campaign/timeline');
                    }}
                >
                    Back
                </Button>
                <Button onClick={handleSaveCampaignOnServer}>Create Campaign</Button>
            </Flex>
        </Flex>
    );
};

export default CampaignFinalSettings;
