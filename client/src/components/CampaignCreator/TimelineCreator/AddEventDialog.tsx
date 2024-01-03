import { Button, Dialog, Flex, TextField } from '@radix-ui/themes';
import { useEffect, useMemo, useState } from 'react';
import { TypeStoryEvent } from '../../../../../SettlementTypes';
import Fuse from 'fuse.js';
import { settlementEventsData } from '../../static_data_file_configs/SettlementEventsConfig';
import { storyEventsData } from '../../static_data_file_configs/StoryEventsConfig';

interface AddEventDialogProps {
    buttonText: string;
    title: string;
    label: string;
    onSubmit: (newEvent: TypeStoryEvent) => void;
}

const AddEventDialog = ({ buttonText, title, label, onSubmit }: AddEventDialogProps) => {
    const [nemesisEncounterSelected, setNemesisEncounterSelected] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const dataToSearch = useMemo(() => [...settlementEventsData, ...storyEventsData], []);

    const fuse = useMemo(
        () =>
            new Fuse(dataToSearch, {
                includeScore: true,
                keys: ['name'],
                threshold: 0.1,
            }),
        [dataToSearch],
    );
    useEffect(() => console.log(results), [results]);

    return (
        <Dialog.Root
            onOpenChange={() => {
                setSearchTerm('');
                setResults([]);
                setNemesisEncounterSelected(false);
            }}
        >
            <Dialog.Trigger>
                <Button>{buttonText}</Button>
            </Dialog.Trigger>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">{label}</Dialog.Title>

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
                                    .map((searchResult) => searchResult.item),
                            );
                        }}
                    />
                    {results.map((itemOption, idx) => {
                        return (
                            <Dialog.Close key={idx}>
                                <Button
                                    onClick={() => {
                                        results[idx] === 'Nemesis Encounter'
                                            ? setNemesisEncounterSelected(true)
                                            : onSubmit({ name: itemOption });
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

export default AddEventDialog;
