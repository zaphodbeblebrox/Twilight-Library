import { Button, Dialog, Flex } from '@radix-ui/themes';
import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { campaignCreatorData } from '../../static_data_file_configs/CampaignCreatorConfig';

interface ModifyIntimacyProps {
    buttonText: string;
    onSubmit: (selectedValue: string) => void;
}

const ModifyIntimacy = ({ buttonText, onSubmit }: ModifyIntimacyProps) => {
    const intimacyMemo = useMemo(() => campaignCreatorData.intimacy, []);
    const targetKey = 'Intimacy';
    const fuse = useMemo(
        () =>
            new Fuse(intimacyMemo, {
                includeScore: true,
                threshold: 0.1,
            }),
        [intimacyMemo],
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
                <Dialog.Title className="DialogTitle">Select Option for Intimacy:</Dialog.Title>

                <Flex direction="column" gap="3">
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

export default ModifyIntimacy;
