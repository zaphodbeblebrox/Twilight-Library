// Popup that displays given information for passed in Innovation

import { Button, Dialog, Flex, Text } from '@radix-ui/themes';
import { PrincipleKeys, principleData } from '../../static_data_file_configs/PrincipleConfig';

interface PrincipleCardProps {
    principleOption: keyof PrincipleKeys;
    isSelected: boolean | null;
    onChange: (selectedValue: string) => void;
}

const PrincipleCard = ({ principleOption, isSelected, onChange }: PrincipleCardProps) => {
    console.log('prin', principleOption, isSelected);
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="ghost">{String(principleOption)}</Button>
            </Dialog.Trigger>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">{String(principleOption)}</Dialog.Title>

                <Flex direction="column" gap="2">
                    {principleData[principleOption].survival_limit_mod && (
                        <Text>
                            Survival Limit Increase: {String(principleData[principleOption].survival_limit_mod)}
                        </Text>
                    )}
                    {principleData[principleOption].departing_survival && (
                        <Text>Survival on departure: {String(principleData[principleOption].departing_survival)}</Text>
                    )}
                    {principleData[principleOption].departing_insanity && (
                        <Text>Insanity on departure: {String(principleData[principleOption].departing_insanity)}</Text>
                    )}
                    {principleData[principleOption].static_effect && (
                        <Flex direction="column" gap="2">
                            {principleData[principleOption].static_effect?.map((effect, idx) => (
                                <Text key={idx}>{effect}</Text>
                            ))}
                        </Flex>
                    )}

                    {/* Endeavors */}

                    {principleData[principleOption].endeavor && (
                        <Flex direction="column" gap="2">
                            {principleData[principleOption].endeavor?.map((endeavor, idx) => {
                                return (
                                    <Flex direction="column" gap="2" key={idx}>
                                        <Text>Cost: {endeavor.cost}</Text>
                                        {endeavor.effect && <Text>Effect: {endeavor.effect}</Text>}
                                        {endeavor.roll && <Text>Roll: {endeavor.roll}</Text>}
                                        {endeavor.table && (
                                            <Flex direction="column">
                                                {endeavor.table.map((row, idy) => {
                                                    return (
                                                        <Flex key={idy} direction="row" gap="2">
                                                            {row.limit_high === row.limit_low ? (
                                                                <Text>{row.limit_high}:</Text>
                                                            ) : (
                                                                <Text>
                                                                    {row.limit_low}-{row.limit_high}:
                                                                </Text>
                                                            )}
                                                            <Text>{row.effect}</Text>
                                                        </Flex>
                                                    );
                                                })}
                                            </Flex>
                                        )}
                                    </Flex>
                                );
                            })}
                        </Flex>
                    )}
                </Flex>

                <Dialog.Close>
                    {isSelected !== null && (
                        <Button variant="solid" color="red" onClick={() => onChange(String(principleOption))}>
                            {isSelected ? 'Deselect' : 'Select'}
                        </Button>
                    )}
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default PrincipleCard;
