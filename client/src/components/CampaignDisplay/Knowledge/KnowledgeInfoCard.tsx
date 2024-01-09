import { Button, Dialog, Flex, Text } from '@radix-ui/themes';
import { TypeKnowledge } from '../../static_data_file_configs/KnowledgeConfig';

interface KnowledgeInfoCardProps {
    knowledge: string;
    knowledgeObj: TypeKnowledge;
    onDelete: () => void;
    onChange: (upgradedKnowledge: string) => void;
}

const KnowledgeInfoCard = ({ knowledge, knowledgeObj, onDelete, onChange }: KnowledgeInfoCardProps) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>{knowledge}</Button>
            </Dialog.Trigger>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">{knowledge}</Dialog.Title>
                <Flex direction={'column'} gap={'3'}>
                    <Text>{knowledgeObj.ability}</Text>
                    <Flex direction="row" gap="3">
                        {knowledgeObj.next_rank && (
                            <Dialog.Close>
                                <Button variant="solid" color="green" onClick={() => onChange(knowledgeObj.next_rank!)}>
                                    Upgrade
                                </Button>
                            </Dialog.Close>
                        )}
                        <Dialog.Close>
                            <Button variant="solid" color="red" onClick={onDelete}>
                                Delete
                            </Button>
                        </Dialog.Close>
                    </Flex>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default KnowledgeInfoCard;
