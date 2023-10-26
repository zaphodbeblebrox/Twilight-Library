import { Button, Flex, Tabs, Box, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';

const CampaignTabs = () => {
    const { id } = useParams();

    return (
        <Flex direction="column" justify="between" align="center" gap="3">
            <Tabs.Root defaultValue="account">
                <Tabs.List>
                    <Tabs.Trigger value="account">Account</Tabs.Trigger>
                    <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
                    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                </Tabs.List>

                <Box px="4" pt="3" pb="2">
                    <Tabs.Content value="account">
                        <Text size="2">Make changes to your account.</Text>
                    </Tabs.Content>

                    <Tabs.Content value="documents">
                        <Text size="2">Access and update your documents.</Text>
                    </Tabs.Content>

                    <Tabs.Content value="settings">
                        <Text size="2">Edit your profile or update contact information.</Text>
                    </Tabs.Content>
                </Box>
            </Tabs.Root>
        </Flex>
    );
};

export default CampaignTabs;
