import * as Label from '@radix-ui/react-label';
import { AlertDialog, Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { TwilightSelect } from './Primitives';

interface TwilightSearchPopup {
    buttonText: string;
    labelText: string;
    options: string[];
    onSubmit: (selectedValue: number) => void;
}

const TwilightSearchPopup = ({ buttonText, labelText, options, onSubmit }: TwilightSearchPopup) => {
    const [selection, setSelection] = useState('');

    return (
        <Dialog.Root onOpenChange={() => setSelection('')}>
            <Dialog.Trigger>
                <Button>{buttonText}</Button>
            </Dialog.Trigger>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">{labelText}</Dialog.Title>

                <Dialog.Description className="DialogDescription">Search:</Dialog.Description>

                <Flex direction="column" justify="center" align="center" gap="3">
                    <Button onClick={() => setCurrentCount((newCount) => newCount + 1)}>+</Button>
                    <Text size="2">{currentCount}</Text>
                    <Button onClick={() => currentCount > 0 && setCurrentCount((newCount) => newCount - 1)}>-</Button>
                </Flex>
                <Dialog.Close>
                    <Button onClick={() => onSubmit(currentCount)} variant="solid" color="green">
                        Update
                    </Button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export { TwilightSearchPopup };
