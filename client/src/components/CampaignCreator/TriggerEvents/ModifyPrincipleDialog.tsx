import { Button, Dialog, Flex } from '@radix-ui/themes';
import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { principleData } from '../../static_data_file_configs/PrincipleConfig';

interface ModifyPrincipleProps {
    buttonText: string;
    targetKey: string;
    onSubmit: (selectedValue: string) => void;
}

const ModifyPrincipleDialog = ({ buttonText, targetKey, onSubmit }: ModifyPrincipleProps) => {
    const principleDataMemo = useMemo(() => Object.keys(principleData), []);
    const fuse = useMemo(
        () =>
            new Fuse(principleDataMemo, {
                includeScore: true,
                threshold: 0.1,
            }),
        [principleDataMemo],
    );

    const searchResults = useMemo(
        () =>
            fuse
                .search(String(targetKey))
                .map((searchResult) => searchResult.item)
                .sort(),
        [fuse, targetKey],
    );

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="ghost">{buttonText}</Button>
            </Dialog.Trigger>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">Select Option for {String(targetKey)}:</Dialog.Title>

                <Flex direction="column" gap="3">
                    <Dialog.Close>
                        <Button variant="ghost" onClick={() => onSubmit('None')}>
                            None
                        </Button>
                    </Dialog.Close>
                    {searchResults.map((resultOption, idx) => {
                        return (
                            <Dialog.Close key={idx}>
                                <Button variant="ghost" onClick={() => onSubmit(resultOption)}>
                                    {resultOption}
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

export default ModifyPrincipleDialog;
