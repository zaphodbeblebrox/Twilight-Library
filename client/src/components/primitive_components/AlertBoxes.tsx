import * as Label from '@radix-ui/react-label';
import * as Form from '@radix-ui/react-form';
import { AlertDialog, Button, Flex, TextField } from '@radix-ui/themes';

const TLAddTimelineAlert = () => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button>+</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: 450 }}>
                <AlertDialog.Title>Add Story Event</AlertDialog.Title>
                <Flex direction="row" justify="center" align="center" gap="3">
                    <Label.Root htmlFor="event">Event:</Label.Root>
                    <TextField.Root>
                        <TextField.Input />
                    </TextField.Root>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="green">
                            Add
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export { TLAddTimelineAlert };
