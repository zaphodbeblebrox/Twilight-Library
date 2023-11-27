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
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<{}[]>([]);

    const settings = {
        includeScore: true,
        threshold: 0.2,
    };

    const fuse = useMemo(() => new Fuse(options, settings), []);
    useEffect(() => console.log(results), [results]);

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
                                    .slice(0, 8)
                                    .map((searchResult) => searchResult.item),
                            );
                        }}
                    />
                    {/* {results.map((role) => (
                        <Dialog.Close key={role.id}>
                            <button
                                onClick={async () => {
                                    if (!script.find((r) => r.id === role.id)) {
                                        await setScript([...script, { id: role.id as Role }]);
                                    }
                                    if (!characterSelectState.selectedRoles.value[role.id]) {
                                        characterSelectState.selectedRoles.set((selectedRoles) => ({
                                            ...selectedRoles,
                                            [role.id]: 1,
                                        }));
                                    }
                                }}
                            >
                                <Flex justify="between" align="center">
                                    <Flex gap="2" align="center">
                                        <RoleIcon role={role.id} className="h-[60px]" />
                                        <Text size="5" autoCapitalize="true">
                                            {RoleName(role.id)}
                                        </Text>
                                    </Flex>
                                    <Text size="5" autoCapitalize="true">
                                        {role.team}
                                    </Text>
                                </Flex>
                            </button>
                        </Dialog.Close>
                    ))} */}
                </Flex>

                <Dialog.Close>
                    <Button variant="solid" color="green">
                        Add
                    </Button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export { TwilightSearchPopup };
