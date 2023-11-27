import * as Label from '@radix-ui/react-label';
import { AlertDialog, Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { useEffect, useMemo, useState } from 'react';
import { TwilightSelect } from './Primitives';
import Fuse from 'fuse.js';

interface TwilightSearchPopup {
    buttonText: string;
    labelText: string;
    options: string[];
    onSubmit: (selectedValue: number) => void;
}

const TwilightSearchPopup = ({ buttonText, labelText, options, onSubmit }: TwilightSearchPopup) => {
    // TODO: Make this popup window a static size
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const settings = {
        includeScore: true,
        threshold: 0.1,
    };

    const fuse = useMemo(() => new Fuse(options, settings), []);
    // useEffect(() => console.log(results), [results]);

    return (
        <Dialog.Root onOpenChange={() => setSearchTerm('')}>
            <Dialog.Trigger>
                <Button>{buttonText}</Button>
            </Dialog.Trigger>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">{labelText}</Dialog.Title>

                <Dialog.Description className="DialogDescription">Search:</Dialog.Description>
                <Flex direction="column" gap="3">
                    <TextField.Input
                        placeholder="Find gear..."
                        value={searchTerm}
                        onChange={(e) => {
                            const nextSearchTerm = e.currentTarget.value;
                            setSearchTerm(nextSearchTerm);
                            setResults(
                                fuse
                                    .search(nextSearchTerm)
                                    .slice(0, 8) //Sets number of displayed results
                                    .map((searchResult) => searchResult.item)
                                    .sort(),
                            );
                        }}
                    />
                    {results.map((itemOption, idx) => {
                        return (
                            <Dialog.Close key={idx}>
                                <Button>{itemOption}</Button>
                            </Dialog.Close>
                        );
                    })}
                </Flex>

                <Dialog.Close>
                    <Button variant="solid" color="red">
                        Cancel
                    </Button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export { TwilightSearchPopup };
