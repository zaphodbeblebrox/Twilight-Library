import { Button, Dialog, Flex, Select, SelectContent, Switch, Text, TextField } from '@radix-ui/themes';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';
import { TypeServerSettlement } from '../../../../../SettlementTypes';
import BuildSurvivor from './BuildSurvivor';
import { TypeServerSurvivor } from '../../../../../SurvivorTypes';
import {
    CharacterCardKeys,
    TypeCharacterCardData,
    characterCardData,
} from '../../static_data_file_configs/CharacterCardsConfig';

interface CreateNewSurvivorDialogProps {
    campaignData: TypeServerSettlement;
    onSubmit: (newSurvivor: TypeServerSurvivor) => void;
}

const CreateNewSurvivorDialog = ({ campaignData, onSubmit }: CreateNewSurvivorDialogProps) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [creator, setCreator] = useState('tester');
    const [hasParents, setHasParents] = useState(false);
    const [isMale, setIsMale] = useState(false);

    const hasCharacterInnovation = campaignData.innovations.includes('Character');
    const characterCardOptions = Object.keys(characterCardData).sort();
    const [characterCard, setCharacterCard] = useState(characterCardOptions[0]);

    const survivorIdList = Object.keys(campaignData.survivors).map((survivorId) => Number(survivorId));
    const id = survivorIdList.reduce(
        (currentId, survivorId) =>
            currentId <= campaignData.survivors[survivorId].id ? campaignData.survivors[survivorId].id + 1 : currentId,
        0,
    );

    // Create filtered lists of male and females for potential father/mother
    const males = survivorIdList
        .filter((survivorId) => campaignData.survivors[survivorId].is_male === true)
        .filter((survivorId) => campaignData.survivors[survivorId].is_dead === false)
        .map(
            (survivorId) =>
                `${campaignData.survivors[survivorId].first_name} ${campaignData.survivors[survivorId].last_name}`,
        )
        .sort();
    const females = survivorIdList
        .filter((survivorId) => campaignData.survivors[survivorId].is_male === false)
        .filter((survivorId) => campaignData.survivors[survivorId].is_dead === false)
        .map(
            (survivorId) =>
                `${campaignData.survivors[survivorId].first_name} ${campaignData.survivors[survivorId].last_name}`,
        )
        .sort();

    const [father, setFather] = useState(males[0]);
    const [mother, setMother] = useState(females[0]);
    // TODO: Add Weapon Specialization selection from parents to be inherited.
    return (
        <Dialog.Root
            onOpenChange={() => {
                setFirstName('');
                setLastName('');
                setCreator('tester');
                setHasParents(false);
                setIsMale(false);
                setCharacterCard(characterCardOptions[0]);
                setFather(males[0]);
                setMother(females[0]);
            }}
        >
            <Dialog.Trigger>
                <Button>New Survivor</Button>
            </Dialog.Trigger>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">Create New Survivor</Dialog.Title>
                <Flex direction="column" gap="3" align={'center'}>
                    <Flex direction={'row'} justify={'between'}>
                        <Label>Creator: </Label>
                        <TextField.Input
                            value={creator}
                            onChange={(e) => {
                                setCreator(e.currentTarget.value);
                            }}
                        />
                    </Flex>
                    <Text size="2">
                        <Flex gap="2">
                            Female
                            <Switch defaultChecked={isMale} onCheckedChange={() => setIsMale(!isMale)} />
                            Male
                        </Flex>
                    </Text>
                    <Flex direction={'row'}>
                        <Label>First Name: </Label>
                        <TextField.Input
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.currentTarget.value);
                            }}
                        />
                    </Flex>
                    {campaignData.innovations.includes('Family') && (
                        <Flex direction={'row'}>
                            <Label>Last Name: </Label>
                            <TextField.Input
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.currentTarget.value);
                                }}
                            />
                        </Flex>
                    )}
                    {hasCharacterInnovation && (
                        <Flex direction={'row'}>
                            <Label>Character Card: </Label>
                            <Select.Root
                                defaultValue={characterCard}
                                onValueChange={(value) => setCharacterCard(value)}
                            >
                                <Select.Trigger />
                                <Select.Content>
                                    <Select.Group>
                                        {characterCardOptions.map((card, idx) => {
                                            return (
                                                <Select.Item key={idx} value={card}>
                                                    {card}
                                                </Select.Item>
                                            );
                                        })}
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </Flex>
                    )}
                    <Text size="2">
                        <Flex gap="2">
                            <Switch
                                defaultChecked={hasParents}
                                disabled={males.length === 0 || females.length === 0 ? true : false}
                                onCheckedChange={() => setHasParents(!hasParents)}
                            />{' '}
                            Has Parents
                        </Flex>
                    </Text>
                    <Flex direction={'row'}>
                        <Label>Father: </Label>
                        <Select.Root
                            disabled={!hasParents}
                            defaultValue={father}
                            onValueChange={(value) => setFather(value)}
                        >
                            <Select.Trigger />
                            <Select.Content>
                                <Select.Group>
                                    {males.map((name, idx) => {
                                        return (
                                            <Select.Item key={idx} value={name}>
                                                {name}
                                            </Select.Item>
                                        );
                                    })}
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    </Flex>
                    <Flex direction={'row'}>
                        <Label>Mother: </Label>
                        <Select.Root
                            disabled={!hasParents}
                            defaultValue={mother}
                            onValueChange={(value) => setMother(value)}
                        >
                            <Select.Trigger />
                            <Select.Content>
                                <Select.Group>
                                    {females.map((name, idx) => {
                                        return (
                                            <Select.Item key={idx} value={name}>
                                                {name}
                                            </Select.Item>
                                        );
                                    })}
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    </Flex>
                </Flex>

                <Dialog.Close>
                    <Button variant="solid" color="red">
                        Cancel
                    </Button>
                </Dialog.Close>
                <Dialog.Close>
                    <Button
                        variant="solid"
                        color="green"
                        onClick={(e) => {
                            if (firstName.length === 0) {
                                e.preventDefault();
                                // TODO: Popup w/ error message
                                return;
                            }
                            onSubmit(
                                BuildSurvivor(campaignData, {
                                    id: id,
                                    first_name: firstName,
                                    last_name: lastName,
                                    player_creator: creator,
                                    father: hasParents ? father : '',
                                    mother: hasParents ? mother : '',
                                    is_male: isMale,
                                    character_card_selected: hasCharacterInnovation,
                                    character_card: characterCard as keyof CharacterCardKeys,
                                }),
                            );
                        }}
                    >
                        Create
                    </Button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default CreateNewSurvivorDialog;
