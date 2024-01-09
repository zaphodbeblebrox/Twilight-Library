import { Button, Dialog, Flex, TextField } from '@radix-ui/themes';
import { useMemo, useState } from 'react';
import { TypeStoryEvent } from '../../../../../SettlementTypes';
import Fuse from 'fuse.js';
import { settlementEventsData } from '../../static_data_file_configs/SettlementEventsConfig';
import { storyEventsData } from '../../static_data_file_configs/StoryEventsConfig';
import { campaignCreatorData } from '../../static_data_file_configs/CampaignCreatorConfig';
import { TwilightSelect } from '../../primitiveComponents/Primitives';

interface AddEventDialogProps {
    buttonText: string;
    title: string;
    onSubmit: (newEvent: TypeStoryEvent) => void;
}

const AddEventDialog = ({ buttonText, title, onSubmit }: AddEventDialogProps) => {
    const [nemesisEncounterSelected, setNemesisEncounterSelected] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const nemesisOptions: string[] = [
        ...campaignCreatorData.node_nemesis_1,
        ...campaignCreatorData.node_nemesis_2,
        ...campaignCreatorData.node_nemesis_3,
        ...campaignCreatorData.node_core,
        ...campaignCreatorData.node_finale,
        ...campaignCreatorData.unique_monsters,
    ]
        .sort()
        .filter((monster) => monster !== 'None');

    const nemesisLevelOptions = ['-', '1', '2', '3'];
    const [nemesisLevel, setNemesisLevel] = useState(nemesisLevelOptions[0]);
    const [nemesis, setNemesis] = useState(nemesisOptions[0]);

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

    return (
        <Dialog.Root
            onOpenChange={() => {
                setSearchTerm('');
                setResults(dataToSearch.slice(0, 8));
                setNemesisEncounterSelected(false);
                setNemesis(nemesisOptions[0]);
                setNemesisLevel(nemesisLevelOptions[0]);
            }}
        >
            <Dialog.Trigger>
                <Button>{buttonText}</Button>
            </Dialog.Trigger>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
                {!nemesisEncounterSelected && (
                    <>
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
                                            onClick={(e) => {
                                                if (results[idx] === 'Nemesis Encounter') {
                                                    e.preventDefault();
                                                    setNemesisEncounterSelected(true);
                                                } else {
                                                    onSubmit({ name: itemOption });
                                                }
                                            }}
                                        >
                                            {itemOption}
                                        </Button>
                                    </Dialog.Close>
                                );
                            })}
                        </Flex>
                    </>
                )}
                {nemesisEncounterSelected && (
                    <>
                        <Dialog.Description className="DialogDescription">Nemesis Encounter</Dialog.Description>
                        <Flex direction="column" gap="3">
                            <TwilightSelect
                                header="Select Nemesis:"
                                defaultOption={nemesis}
                                options={nemesisOptions}
                                onChange={(selectedNemesis) => setNemesis(selectedNemesis)}
                            />
                            <TwilightSelect
                                header="Select Nemesis Level (optional):"
                                defaultOption={nemesisLevel}
                                options={nemesisLevelOptions}
                                onChange={(selectedNemesisLevel) => setNemesisLevel(selectedNemesisLevel)}
                            />
                        </Flex>
                        <Dialog.Close>
                            <Button
                                variant="solid"
                                color="green"
                                onClick={() => {
                                    onSubmit({
                                        name: 'Nemesis Encounter',
                                        monster: nemesis,
                                        monster_level:
                                            nemesisLevel === nemesisLevelOptions[0] ? undefined : Number(nemesisLevel),
                                    });
                                }}
                            >
                                Add
                            </Button>
                        </Dialog.Close>
                    </>
                )}

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
