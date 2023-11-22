import { Button, Flex, Heading, Separator, Text } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { TypeInitializedSettlement, TypeServerSettlement } from '../../../../SettlementTypes';
import {
    CourageUnderstandingLists,
    NodePillarLists,
    TypeCampaignData,
    TypeResourceListData,
    resourceListData,
    campaignCreatorData,
    TypeLocationsData,
    locationsData,
} from './CampaignTypeConfig';
import { TwilightAddEventAlert, TwilightEditTextAlert } from '../primitiveComponents/AlertBoxes';
import axios from 'axios';
import { settlementApi } from '../../service/api';
import useAxios from 'axios-hooks';

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

    const [{ data: postData, loading: postLoading, error: postError }, executePost] = useAxios(
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

    const setMilestones = () => {
        const formattedMilestones = campaignSettings.milestones.reduce(
            (currentMilestoneObject, milestone) => ({
                ...currentMilestoneObject,
                [milestone]: false,
            }),
            {},
        );
        return formattedMilestones;
    };

    const setBasicQuarries = () => {
        return ['node_quarry_1', 'node_quarry_2', 'node_quarry_3', 'node_quarry_4'].reduce(
            (currentQuarryObject, node) => {
                return {
                    ...currentQuarryObject,
                    ...campaignSettings[node as keyof NodePillarLists].reduce((currentNodeObject, quarry) => {
                        return { ...currentNodeObject, [quarry]: { 1: false, 2: false, 3: false } };
                    }, {}),
                };
            },
            {},
        );
    };

    const setBonusQuarries = () => {
        return ['node_quarry_1', 'node_quarry_2', 'node_quarry_3', 'node_quarry_4'].reduce(
            (currentQuarryObject, node) => {
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
                                                    (currentLevelObject: Record<number, boolean>, level: number) => {
                                                        return { ...currentLevelObject, [level]: false };
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
            },
            {},
        );
    };

    const setNemesis = () => {
        return ['node_nemesis_1', 'node_nemesis_2', 'node_nemesis_3'].reduce((currentNemesisObject, node) => {
            return {
                ...currentNemesisObject,
                ...campaignSettings[node as keyof NodePillarLists].reduce((currentNodeObject, nemesis) => {
                    return { ...currentNodeObject, [nemesis]: { 1: false, 2: false, 3: false } };
                }, {}),
            };
        }, {});
    };

    const createResourceGroup = (categoryKey: keyof TypeResourceListData) => {
        return resourceListData[categoryKey].reduce((currentResourceObject, resource) => {
            return {
                ...currentResourceObject,
                [resource]: 0,
            };
        }, {});
    };

    const createResourceList = () => {
        const monsterList = [
            ...campaignSettings.node_nemesis_1,
            ...campaignSettings.node_nemesis_2,
            ...campaignSettings.node_nemesis_3,
            ...campaignSettings.node_quarry_1,
            ...campaignSettings.node_quarry_2,
            ...campaignSettings.node_quarry_3,
            ...campaignSettings.node_quarry_4,
            campaignSettings.node_core,
            'Basic',
        ];
        return monsterList
            .filter((monster) => monster && Object.keys(resourceListData).includes(monster))
            .reduce((currentResourceObject, monster) => {
                return monster
                    ? {
                          ...currentResourceObject,
                          [monster]: createResourceGroup(monster as keyof TypeResourceListData),
                      }
                    : { ...currentResourceObject };
            }, {});
    };

    const createGearGroup = (categoryKey: keyof TypeLocationsData) => {
        console.log('cat key', categoryKey);
        return locationsData[categoryKey].gear.reduce((currentLocationObject, gear) => {
            return {
                ...currentLocationObject,
                [gear]: 0,
            };
        }, {});
    };

    const createLocationList = () => {
        return ['Starting Gear']
            .filter((location) => location && Object.keys(locationsData).includes(location))
            .reduce((currentLocationObject, location) => {
                console.log('location', location);
                return location
                    ? {
                          ...currentLocationObject,
                          [location]: createGearGroup(location as keyof TypeLocationsData),
                      }
                    : { ...currentLocationObject };
            }, {});
    };

    const handleSaveCampaignOnServer = () => {
        const campaignData: TypeInitializedSettlement = {
            name: settlementName,
            timeline: { ...campaignSettings.timeline },
            courage_event_1: campaignSettings.courage_event_1,
            courage_event_2: campaignSettings.courage_event_2,
            understanding_event_1: campaignSettings.understanding_event_1,
            understanding_event_2: campaignSettings.understanding_event_1,
            milestones: { ...setMilestones() },
            quarries: { ...setBasicQuarries(), ...setBonusQuarries() },
            nemesis: { ...setNemesis(), [campaignSettings.node_core as keyof NodePillarLists]: { 1: false } },
            constellations: campaignSettings.constellations,
            arc_survivors: campaignSettings.pillars.includes('Arc Survivors'),
            gear: { ...createResourceList() },
            gear: { ...createLocationList() },
        };

        //Save data to database
        console.log('gear', campaignData.gear);

        executePost({
            data: campaignData,
        })
            .then(() => navigate('/twilight-library/dashboard'))
            .catch((err) => console.error(err));
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
