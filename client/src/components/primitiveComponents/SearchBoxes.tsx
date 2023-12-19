import { Button, Dialog, Flex, TextField } from '@radix-ui/themes';
import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';

interface TwilightSearchPopupProps {
    buttonText: string;
    labelText: string;
    options: string[];
    onSubmit: (selectedValue: string) => void;
}

const TwilightSearchPopup = ({ buttonText, labelText, options, onSubmit }: TwilightSearchPopupProps) => {
    // TODO: Make this popup window a static size
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const settings = {
        includeScore: true,
        threshold: 0.1,
    };

    const fuse = useMemo(() => new Fuse(options, settings), [options]);
    // useEffect(() => console.log(results), [results]);

    return (
        <Dialog.Root
            onOpenChange={() => {
                setSearchTerm('');
                setResults([]);
            }}
        >
            <Dialog.Trigger>
                <Button>{buttonText}</Button>
            </Dialog.Trigger>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">{labelText}</Dialog.Title>

                <Dialog.Description className="DialogDescription">Search:</Dialog.Description>
                <Flex direction="column" gap="3">
                    <TextField.Input
                        placeholder="Find..."
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
                                <Button onClick={() => onSubmit(results[idx])}>{itemOption}</Button>
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
