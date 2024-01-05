import { Button, Dialog, Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { campaignCreatorData } from '../../static_data_file_configs/CampaignCreatorConfig';
import { TwilightSelect } from '../../primitiveComponents/Primitives';

interface AddMonsterDialogProps {
    currentMonster: string | null;
    currentMonsterLevel: number | null;
    currentVictory: boolean | null;
    onSubmit: ({
        monster,
        monster_level,
        victorious,
    }: {
        monster: string;
        monster_level: number;
        victorious: boolean | null;
    }) => void;
}

const AddMonsterDialog = ({ currentMonster, currentMonsterLevel, currentVictory, onSubmit }: AddMonsterDialogProps) => {
    const monsterOptions: string[] = [
        ...campaignCreatorData.node_quarry_1,
        ...campaignCreatorData.node_quarry_2,
        ...campaignCreatorData.node_quarry_3,
        ...campaignCreatorData.node_quarry_4,
        ...campaignCreatorData.node_nemesis_1,
        ...campaignCreatorData.node_nemesis_2,
        ...campaignCreatorData.node_nemesis_3,
        ...campaignCreatorData.node_core,
        ...campaignCreatorData.node_finale,
        ...campaignCreatorData.unique_monsters,
    ]
        .sort()
        .filter((monster) => monster !== 'None');

    const monsterLevelOptions = ['1', '2', '3', '4', '5'];
    const [monsterLevel, setMonsterLevel] = useState(
        currentMonsterLevel ? String(currentMonsterLevel) : monsterLevelOptions[0],
    );
    const [monster, setMonster] = useState(currentMonster ? currentMonster : monsterOptions[0]);

    return (
        <Dialog.Root
            onOpenChange={() => {
                setMonster(monsterOptions[0]);
                setMonsterLevel(monsterLevelOptions[0]);
            }}
        >
            <Dialog.Trigger>
                <Button
                    variant="ghost"
                    color={
                        currentVictory === null
                            ? currentMonster === null
                                ? 'blue'
                                : 'yellow'
                            : currentVictory === false
                            ? 'red'
                            : 'green'
                    }
                >
                    {currentMonster ? currentMonster : 'Hunt Quarry'}{' '}
                    {currentMonsterLevel && ` - Lvl ${currentMonsterLevel}`}
                </Button>
            </Dialog.Trigger>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">Monster Fought</Dialog.Title>

                <Dialog.Description className="DialogDescription">Hunt/Showdown</Dialog.Description>
                <Flex direction="column" gap="3">
                    <TwilightSelect
                        header="Monster Fought:"
                        defaultOption={monster}
                        options={monsterOptions}
                        onChange={(selectedNemesis) => setMonster(selectedNemesis)}
                    />
                    <TwilightSelect
                        header="Monster Lvl:"
                        defaultOption={monsterLevel}
                        options={monsterLevelOptions}
                        onChange={(selectedNemesisLevel) => setMonsterLevel(selectedNemesisLevel)}
                    />
                </Flex>

                <Flex>
                    <Dialog.Close>
                        <Button
                            variant="solid"
                            color="green"
                            onClick={() => {
                                onSubmit({
                                    monster: monster,
                                    monster_level: Number(monsterLevel),
                                    victorious: true,
                                });
                            }}
                        >
                            Victory
                        </Button>
                    </Dialog.Close>

                    <Dialog.Close>
                        <Button
                            variant="solid"
                            color="red"
                            onClick={() => {
                                onSubmit({
                                    monster: monster,
                                    monster_level: Number(monsterLevel),
                                    victorious: false,
                                });
                            }}
                        >
                            Defeat
                        </Button>
                    </Dialog.Close>

                    <Dialog.Close>
                        <Button
                            variant="solid"
                            color="gray"
                            onClick={() => {
                                onSubmit({
                                    monster: monster,
                                    monster_level: Number(monsterLevel),
                                    victorious: null,
                                });
                            }}
                        >
                            Undetermined
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default AddMonsterDialog;
