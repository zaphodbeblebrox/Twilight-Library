import { Button, Dialog } from '@radix-ui/themes';
import { TypeStoryEvent } from '../../../../../SettlementTypes';

interface DeleteEventDialogProps {
    storyEvent: TypeStoryEvent;
    onSubmit: () => void;
}

const DeleteEventDialog = ({ storyEvent, onSubmit }: DeleteEventDialogProps) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>{storyEvent.name}</Button>
            </Dialog.Trigger>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">Delete {storyEvent.name}?</Dialog.Title>

                <Dialog.Close>
                    <Button
                        variant="solid"
                        color="red"
                        onClick={() => {
                            onSubmit();
                        }}
                    >
                        Delete
                    </Button>
                </Dialog.Close>

                <Dialog.Close>
                    <Button variant="solid">Cancel</Button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default DeleteEventDialog;
