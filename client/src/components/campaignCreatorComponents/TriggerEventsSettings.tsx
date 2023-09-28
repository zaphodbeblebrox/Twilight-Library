import { Button, Flex, Heading, Separator, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimelineTable from '../primitiveComponents/TimelineTable';
// import { SettlementInterface } from '../../../../server/src/models/Settlement';
import { TypeInitializedSettlement, TypeServerSettlement } from '../../../../SettlementTypes';
import { CourageUnderstandingLists, NodePillarLists, TypeCampaignData } from './CampaignTypeConfig';
import { TwilightAddEventAlert, TwilightEditTextAlert } from '../primitiveComponents/AlertBoxes';
import axios from 'axios';

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
    const handleBack = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate('/twilight-library/dashboard/create-campaign/timeline');
    };
    const handleCourageUnderstandingChange = (newValue: string, objectKey: string) => {
        const updatedCampaign: TypeCampaignData = { ...campaignSettings };
        updatedCampaign[objectKey as keyof CourageUnderstandingLists] = newValue;
        setCampaignSettings(updatedCampaign);
    };
    const handleSaveCampaignOnServer = () => {
        const campaignData: TypeInitializedSettlement = {
            name: settlementName,
            timeline: { ...campaignSettings.timeline },
            courage_event_1: campaignSettings.courage_event_1,
            courage_event_2: campaignSettings.courage_event_2,
            understanding_event_1: campaignSettings.understanding_event_1,
            understanding_event_2: campaignSettings.understanding_event_1,
            milestones: {},
            quarries: {},
            nemesis: {},
            constellations: campaignSettings.constellations,
            arc_survivors: campaignSettings.pillars.includes('Arc Survivors'),
        };
        // Loop through milestones to make data structure
        campaignSettings.milestones.forEach((milestone: string) => {
            campaignData.milestones[milestone] = false;
        });
        // Loop through quarries to make data structure
        const quarryList: string[] = ['node_quarry_1', 'node_quarry_2', 'node_quarry_3', 'node_quarry_4'];
        quarryList.forEach((node: string) => {
            campaignSettings[node as keyof NodePillarLists].forEach((quarry: string) => {
                campaignData.quarries[quarry] = { 1: false, 2: false, 3: false };
            });
        });
        // Check to add Legendary Monsters
        if (Object.keys(campaignData.quarries).includes('White Lion')) {
            campaignData.quarries['Beast of Sorrow'] = { 4: false };
            campaignData.quarries['Great Golden Cat'] = { 4: false };
        }
        if (Object.keys(campaignData.quarries).includes('Screaming Antelope')) {
            campaignData.quarries['Mad Steed'] = { 4: false };
        }
        if (Object.keys(campaignData.quarries).includes('White Lion')) {
            campaignData.quarries['Golden Eyed King 1000 Years'] = { 5: false };
        }
        // Loop through nemesis to make data structure
        const nemesisList: string[] = ['node_nemesis_1', 'node_nemesis_2', 'node_nemesis_3'];
        nemesisList.forEach((node: string) => {
            campaignSettings[node as keyof NodePillarLists].forEach((nemesis: string) => {
                campaignData.nemesis[nemesis] = { 1: false, 2: false, 3: false };
            });
        });
        // Add Core Monster
        campaignData.nemesis[campaignSettings.node_core as keyof NodePillarLists] = { 1: false };
        // TODO: Save data to database
        console.log(campaignData);

        // TODO: Navigate to dashboard
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
                        updatedCampaign.milestones.push(addedEvent);
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
                    onClick={(e) => {
                        handleBack(e);
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
