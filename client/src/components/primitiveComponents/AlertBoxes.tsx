import * as Label from '@radix-ui/react-label';
import { AlertDialog, Button, Flex, Text, TextField } from '@radix-ui/themes';
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
        onSubmit(displayedText, objectKey);
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
                        {textInput && onDelete && (
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
    buttonText: string;
    title: string;
    label: string;
    onSubmit: (newValue: string) => void;
}

const TwilightAddEventAlert = ({ buttonText, title, label, onSubmit }: TwilightAddTimelineAlertProps) => {
    const [storyEvent, setStoryEvent] = useState('');

    const handleSubmitEntry = () => {
        onSubmit(storyEvent);
        setStoryEvent('');
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button>{buttonText}</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: 450 }}>
                <AlertDialog.Title>{title}</AlertDialog.Title>
                <Flex direction="row" justify="center" align="center" gap="3">
                    <Label.Root htmlFor="event">{label}</Label.Root>
                    <TextField.Root>
                        <TextField.Input value={storyEvent} onChange={(e) => setStoryEvent(e.target.value)} />
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

interface TwilightEditCountAlertProps {
    labelText: string;
    count: number;
    onSubmit: (newValue: number) => void;
}

const TwilightEditCountAlert = ({ labelText, count, onSubmit }: TwilightEditCountAlertProps) => {
    const [currentCount, setCurrentCount] = useState(count);

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button variant="ghost">
                    {labelText} : {count}
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: 450 }}>
                <AlertDialog.Title>{labelText}</AlertDialog.Title>
                <Flex direction="column" justify="center" align="center" gap="3">
                    <Button onClick={() => setCurrentCount(currentCount + 1)}>+</Button>
                    <Text size="2">{currentCount}</Text>
                    <Button onClick={() => setCurrentCount(currentCount - 1)}>-</Button>
                </Flex>
                <AlertDialog.Action>
                    <Button onClick={() => onSubmit(currentCount)} variant="solid" color="green">
                        Update
                    </Button>
                </AlertDialog.Action>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export { TwilightAddEventAlert, TwilightEditTimelineAlert, TwilightEditTextAlert, TwilightEditCountAlert };
