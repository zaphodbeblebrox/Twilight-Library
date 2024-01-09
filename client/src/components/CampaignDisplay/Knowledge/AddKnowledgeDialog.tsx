import { Button, Dialog, Flex, TextField } from '@radix-ui/themes';
import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { knowledgeData } from '../../static_data_file_configs/KnowledgeConfig';

interface AddKnowledgeDialog {
    buttonText: string;
    onSubmit: (newKnowledge: string) => void;
}

const AddKnowledgeDialog = ({ buttonText, onSubmit }: AddKnowledgeDialog) => {
    const knowledgeOptions: string[] = Object.keys(knowledgeData).sort();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const fuse = useMemo(
        () =>
            new Fuse(knowledgeOptions, {
                includeScore: true,
                threshold: 0.1,
            }),
        [knowledgeOptions],
    );

    return (
        <Dialog.Root
            onOpenChange={() => {
                setSearchTerm('');
                setResults(knowledgeOptions.slice(0, 8));
            }}
        >
            <Dialog.Trigger>
                <Button>{buttonText}</Button>
            </Dialog.Trigger>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">Search Knowledges</Dialog.Title>
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

export default AddKnowledgeDialog;
