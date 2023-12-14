// Popup that displays given information for passed in Innovation

import { Button, Dialog, Flex, Text } from '@radix-ui/themes';
import { InnovationKeys, innovationData } from '../static_data_file_configs/InnovationsConfig';

interface InnovationCardProps {
    innovation: keyof InnovationKeys;
}

const InnovationCard = ({ innovation }: InnovationCardProps) => {
    console.log('data', innovationData);
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>{String(innovation)}</Button>
            </Dialog.Trigger>
            <Flex gap="3" direction="column">
                {innovationData[innovation].survival_limit_mod && (
                    <Text>Survival Limit Increase: {String(innovationData[innovation].survival_limit_mod)}</Text>
                )}
                {/* {innovationData[innovation].departing_survival && (
                    <Text>Survival on departure: {String(innovationData[innovation].departing_survival)}</Text>
                )}
                {innovationData[innovation].departing_insanity && (
                    <Text>Insanity on departure: {String(innovationData[innovation].departing_insanity)}</Text>
                )}
                {Object.keys(innovationData[innovation]).some((key) => key.includes('mod_')) && (
                    <Text>Newborns gain:</Text>
                )}
                {innovationData[innovation].mod_strength && (
                    <Text>Strength: {String(innovationData[innovation].mod_strength)}</Text>
                )}
                {innovationData[innovation].mod_accuracy && (
                    <Text>Accuracy: {String(innovationData[innovation].mod_accuracy)}</Text>
                )}
                {innovationData[innovation].mod_luck && (
                    <Text>Luck: {String(innovationData[innovation].mod_luck)}</Text>
                )}
                {innovationData[innovation].mod_speed && (
                    <Text>Speed: {String(innovationData[innovation].mod_speed)}</Text>
                )}
                {innovationData[innovation].mod_evasion && (
                    <Text>Evasion: {String(innovationData[innovation].mod_evasion)}</Text>
                )}
                {innovationData[innovation].mod_movement && (
                    <Text>Movement: {String(innovationData[innovation].mod_movement)}</Text>
                )}
                {innovationData[innovation].mod_understanding && (
                    <Text>Understanding: {String(innovationData[innovation].mod_understanding)}</Text>
                )}
                {innovationData[innovation].mod_courage && (
                    <Text>Courage: {String(innovationData[innovation].mod_courage)}</Text>
                )}
                {innovationData[innovation].mod_hunt_xp && (
                    <Text>Hunt XP: {String(innovationData[innovation].mod_hunt_xp)}</Text>
                )} */}
            </Flex>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">{String(innovation)}</Dialog.Title>

                <Flex direction="column" gap="3"></Flex>

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
