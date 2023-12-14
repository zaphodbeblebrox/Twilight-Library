// Popup that displays given information for passed in Innovation

import { Button, Dialog, Flex, Text } from '@radix-ui/themes';
import { InnovationKeys, innovationData } from '../static_data_file_configs/InnovationsConfig';

interface InnovationCardProps {
    innovation: keyof InnovationKeys;
}

const InnovationCard = ({ innovation }: InnovationCardProps) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="ghost">{String(innovation)}</Button>
            </Dialog.Trigger>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">{String(innovation)}</Dialog.Title>

                <Flex direction="column" gap="2">
                    {innovationData[innovation].survival_limit_mod && (
                        <Text>Survival Limit Increase: {String(innovationData[innovation].survival_limit_mod)}</Text>
                    )}
                    {innovationData[innovation].departing_survival && (
                        <Text>Survival on departure: {String(innovationData[innovation].departing_survival)}</Text>
                    )}
                    {innovationData[innovation].departing_insanity && (
                        <Text>Insanity on departure: {String(innovationData[innovation].departing_insanity)}</Text>
                    )}
                    {innovationData[innovation].static_effect && (
                        <Flex direction="column" gap="2">
                            {innovationData[innovation].static_effect?.map((effect, idx) => (
                                <Text key={idx}>{effect}</Text>
                            ))}
                        </Flex>
                    )}
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

export default InnovationCard;
