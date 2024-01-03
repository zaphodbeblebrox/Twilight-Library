import * as Label from '@radix-ui/react-label';
import { Button, Dialog, Flex, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { TypeStoryEvent } from '../../../../../SettlementTypes';

interface AddEventDialogProps {
    buttonText: string;
    title: string;
    label: string;
    onSubmit: (newEvent: TypeStoryEvent) => void;
}

const AddEventDialog = ({ buttonText, title, label, onSubmit }: AddEventDialogProps) => {
    const [storyEvent, setStoryEvent] = useState('');

    const handleSubmitEntry = () => {
        onSubmit(storyEvent);
        setStoryEvent('');
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>{buttonText}</Button>
            </Dialog.Trigger>
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>{title}</Dialog.Title>
                <Flex direction="row" justify="center" align="center" gap="3">
                    <Label.Root htmlFor="event">{label}</Label.Root>
                    <TextField.Root>
                        <TextField.Input value={storyEvent} onChange={(e) => setStoryEvent(e.target.value)} />
                    </TextField.Root>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={handleSubmitEntry} variant="solid" color="green">
                            Add
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default AddEventDialog;
