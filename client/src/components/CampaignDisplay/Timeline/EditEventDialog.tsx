import { Button, Dialog, Flex } from '@radix-ui/themes';
import { TwilightSelect } from '../../primitiveComponents/Primitives';
import { useState } from 'react';

interface EditEventDialogProps {
    year: number;
    maxYears: number;
    entry: string;
    moveEvent: (newYear: number) => void;
    deleteEvent: () => void;
}

const EditEventDialog = ({ year, maxYears, entry, moveEvent, deleteEvent }: EditEventDialogProps) => {
    const [newYear, setNewYear] = useState(year);

    const handleMove = () => {
        moveEvent(newYear);
    };

    const handleDelete = () => {
        deleteEvent();
    };

    return (
        <Dialog.Root onOpenChange={() => setNewYear(year)}>
            <Dialog.Trigger>
                <Button variant="ghost">{entry}</Button>
            </Dialog.Trigger>
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Edit Story Event</Dialog.Title>
                <Flex direction="row" justify="center" align="center" gap="3">
                    <TwilightSelect
                        header="Change Year:"
                        defaultOption={String(year)}
                        options={Array.from({ length: maxYears }, (_, index) => String(index + 1))}
                        onChange={(value: string) => setNewYear(Number(value))}
                    />
                    <Dialog.Close>
                        <Button onClick={handleMove}>&gt;</Button>
                    </Dialog.Close>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={handleDelete} variant="solid" color="green">
                            Delete
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default EditEventDialog;
