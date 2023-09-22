import * as Label from '@radix-ui/react-label';
import { AlertDialog, Button, Flex, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { TwilightSelect } from './Primitives';

interface TwilightEditTextAlertProps {
    labelText: string;
    textInput: string;
    objectKey?: string;
    onSubmit: (newValue: string, objectKey?: string) => void;
    onDelete?: () => void;
}

const TwilightEditTextAlert = ({ labelText, textInput, objectKey, onSubmit, onDelete }: TwilightEditTextAlertProps) => {
    const [displayedText, setDisplayedText] = useState(textInput);

    const handleSubmitEntry = () => {
        if (objectKey !== undefined) {
            onSubmit(displayedText, objectKey);
        } else {
            onSubmit(displayedText);
        }
    };
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button variant="ghost">{textInput}</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: 450 }}>
                <AlertDialog.Title>{labelText}</AlertDialog.Title>
                <Flex direction="row" justify="center" align="center" gap="3">
                    <TextField.Root>
                        <TextField.Input value={displayedText} onChange={(e) => setDisplayedText(e.target.value)} />
                    </TextField.Root>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        {textInput !== '' && onDelete !== undefined && (
                            <Button onClick={onDelete} variant="solid" color="red">
                                Delete
                            </Button>
                        )}
                    </AlertDialog.Action>
                    <AlertDialog.Action>
                        <Button onClick={handleSubmitEntry} variant="solid" color="green">
                            {textInput !== '' ? 'Modify' : 'Add'}
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

interface TwilightAddTimelineAlertProps {
    year: number;
    onSubmit: (year: number, timelineEvent: string) => void;
}

const TwilightAddTimelineAlert = ({ year, onSubmit }: TwilightAddTimelineAlertProps) => {
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

interface TwilightEditTimelineAlertProps {
    year: number;
    maxYears: number;
    entry: string;
    moveEvent: (year: number, newYear: number, entry: string) => void;
    deleteEvent: (year: number, entry: string) => void;
}

const TwilightEditTimelineAlert = ({
    year,
    maxYears,
    entry,
    moveEvent,
    deleteEvent,
}: TwilightEditTimelineAlertProps) => {
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

export { TwilightAddTimelineAlert, TwilightEditTimelineAlert, TwilightEditTextAlert };
