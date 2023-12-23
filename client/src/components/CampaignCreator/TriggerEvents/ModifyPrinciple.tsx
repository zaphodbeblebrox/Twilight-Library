import { Button, Dialog, Flex, TextField } from '@radix-ui/themes';
import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { PrinciplesDefaultLists } from '../../static_data_file_configs/PresetCampaignConfig';
import { innovationData } from '../../static_data_file_configs/InnovationsConfig';

interface ModifyPrincipleProps {
    buttonText: string;
    // targetKey: keyof typeof principleKey;
    targetKey: string;
    onSubmit: (selectedValue: string) => void;
}

const ModifyPrinciple = ({ buttonText, targetKey, onSubmit }: ModifyPrincipleProps) => {
    const innovationDataMemo = useMemo(() => Object.keys(innovationData), []);
    const fuse = useMemo(
        () =>
            new Fuse(innovationDataMemo, {
                includeScore: true,
                threshold: 0.1,
            }),
        [innovationDataMemo],
    );

    const searchResults = useMemo(
        () =>
            fuse
                .search(String(targetKey))
                .map((searchResult) => searchResult.item)
                .sort(),
        [fuse, targetKey],
    );

    // useEffect(() => console.log(results), [results]);

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="ghost">{buttonText}</Button>
            </Dialog.Trigger>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">Select Option for {String(targetKey)}:</Dialog.Title>

                <Dialog.Description className="DialogDescription">Search:</Dialog.Description>
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

export default ModifyPrinciple;
