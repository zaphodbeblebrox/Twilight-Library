import * as Label from '@radix-ui/react-label';
import { AlertDialog, Button, Flex, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { TwilightSelect } from './Primitives';

interface TLAddTimelineAlertProps {
    year: number;
    onSubmit: (year: number, timelineEvent: string) => void;
}

const TLAddTimelineAlert = ({ year, onSubmit }: TLAddTimelineAlertProps) => {
    const [timelineEvent, setTimelineEvent] = useState('');

    const handleSubmitEntry = () => {
        onSubmit(year, timelineEvent);
        setTimelineEvent('');
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button>+</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: 450 }}>
                <AlertDialog.Title>Add Story Event</AlertDialog.Title>
                <Flex direction="row" justify="center" align="center" gap="3">
                    <Label.Root htmlFor="event">Event:</Label.Root>
                    <TextField.Root>
                        <TextField.Input value={timelineEvent} onChange={(e) => setTimelineEvent(e.target.value)} />
                    </TextField.Root>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button onClick={handleSubmitEntry} variant="solid" color="green">
                            Add
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

interface TLEditTimelineAlertProps {
    year: number;
    maxYears: number;
    entry: string;
    moveEvent: (year: number, newYear: number, entry: string) => void;
    deleteEvent: (year: number, entry: string) => void;
}

const TLEditTimelineAlert = ({ year, maxYears, entry, moveEvent, deleteEvent }: TLEditTimelineAlertProps) => {
    const [newYear, setNewYear] = useState(year);

    const handleMove = () => {
        moveEvent(year, newYear, entry);
        setNewYear(year);
    };

    const handleDelete = () => {
        deleteEvent(year, entry);
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button variant="ghost">{entry}</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: 450 }}>
                <AlertDialog.Title>Edit Story Event</AlertDialog.Title>
                <Flex direction="row" justify="center" align="center" gap="3">
                    <TwilightSelect
                        header="Change Year:"
                        defaultOption={String(year)}
                        options={Array.from({ length: maxYears }, (_, index) => String(index + 1))}
                        onChange={(value: string) => setNewYear(Number(value))}
                    />
                    <AlertDialog.Action>
                        <Button onClick={handleMove}>&gt;</Button>
                    </AlertDialog.Action>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button onClick={handleDelete} variant="solid" color="green">
                            Delete
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export { TLAddTimelineAlert, TLEditTimelineAlert };
