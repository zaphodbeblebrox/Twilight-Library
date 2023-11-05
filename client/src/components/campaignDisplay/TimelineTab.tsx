import { Tabs, Box, Text, Flex, Heading, Separator, Button } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { TypeServerSettlement } from '../../../../SettlementTypes';
import { settlementApi } from '../../service/api';
import TimelineTable from '../primitiveComponents/TimelineTable';

interface TimelineTabProps {
    campaignData: TypeServerSettlement;
}

const TimelineTab = ({ campaignData }: TimelineTabProps) => {
    const handleUpdateTimeline = (updatedTimeline: Record<number, string[]>) => {
        // setCampaignData({ ...campaignData, timeline: updatedTimeline });
        // TODO: Save data to database
    };
    console.log('all data:', campaignData);
    console.log('timeline:', campaignData.timeline);
    return (
        <Flex direction="column" gap="3">
            <Heading size="7"> Timeline Editor</Heading>
            <Separator my="3" size="4" />
            <TimelineTable
                timeline={campaignData.timeline}
                onChange={(updatedTimeline: Record<number, string[]>) => handleUpdateTimeline(updatedTimeline)}
            />
        </Flex>
    );
};

export default TimelineTab;
