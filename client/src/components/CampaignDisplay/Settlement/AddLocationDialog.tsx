import { Button, Dialog, Flex, TextField } from '@radix-ui/themes';
import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { locationsData } from '../../static_data_file_configs/LocationsConfig';

interface AddLocationDialogProps {
    buttonText: string;
    onSubmit: (newLocation: string) => void;
}

const AddLocationDialog = ({ buttonText, onSubmit }: AddLocationDialogProps) => {
    const locationOptions: string[] = Object.keys(locationsData).sort();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const fuse = useMemo(
        () =>
            new Fuse(locationOptions, {
                includeScore: true,
                threshold: 0.1,
            }),
        [locationOptions],
    );

    return (
        <Dialog.Root
            onOpenChange={() => {
                setSearchTerm('');
                setResults(locationOptions.slice(0, 8));
            }}
        >
            <Dialog.Trigger>
                <Button>{buttonText}</Button>
            </Dialog.Trigger>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">Search Locations</Dialog.Title>
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
                                    .map((searchResult) => searchResult.item),
                            );
                        }}
                    />
                    {results.map((itemOption, idx) => {
                        return (
                            <Dialog.Close key={idx}>
                                <Button
                                    onClick={() => {
                                        onSubmit(itemOption);
                                    }}
                                >
                                    {itemOption}
                                </Button>
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

export default AddLocationDialog;
