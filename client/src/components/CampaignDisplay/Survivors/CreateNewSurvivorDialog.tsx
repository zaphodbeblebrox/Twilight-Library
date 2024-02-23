import { Button, Dialog, Flex, IconButton, TextField } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';

interface CreateNewSurvivorDialogProps {
    onSubmit: (newSurvivor: string) => void;
}

const CreateNewSurvivorDialog = ({ onSubmit }: CreateNewSurvivorDialogProps) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [creator, setCreator] = useState('tester');
    const [father, setFather] = useState('');
    const [mother, setMother] = useState('');
    // TODO: Only ask for Character Card if proper innovation is held
    // TODO: Add Character Card Data and give ability to select card drawn and auto apply stats.
    // TODO: Only ask for Last Name if proper innovation is held
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>New Survivor</Button>
            </Dialog.Trigger>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">Create New Survivor</Dialog.Title>
                <Flex direction="column" gap="3">
                    <Flex direction={'row'}>
                        <Label>Creator: </Label>
                        <TextField.Input
                            value={creator}
                            onChange={(e) => {
                                setCreator(e.currentTarget.value);
                            }}
                        />
                    </Flex>
                    <Flex direction={'row'}>
                        <Label>First Name: </Label>
                        <TextField.Input
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.currentTarget.value);
                            }}
                        />
                    </Flex>
                    <Flex direction={'row'}>
                        <Label>Last Name: </Label>
                        <TextField.Input
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.currentTarget.value);
                            }}
                        />
                    </Flex>
                    <Flex direction={'row'}>
                        <Label>Father: </Label>
                        <TextField.Input
                            value={father}
                            onChange={(e) => {
                                setFather(e.currentTarget.value);
                            }}
                        />
                    </Flex>
                    <Flex direction={'row'}>
                        <Label>Mother: </Label>
                        <TextField.Input
                            value={mother}
                            onChange={(e) => {
                                setMother(e.currentTarget.value);
                            }}
                        />
                    </Flex>
                </Flex>

                <Dialog.Close>
                    <Button variant="solid" color="red">
                        Cancel
                    </Button>
                </Dialog.Close>
                <Dialog.Close>
                    <Button variant="solid" color="green">
                        Create
                    </Button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default CreateNewSurvivorDialog;
