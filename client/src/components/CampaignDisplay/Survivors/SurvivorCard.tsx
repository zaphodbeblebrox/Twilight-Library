import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../../SettlementTypes';
import { Box, Flex, Heading, Tabs, Text } from '@radix-ui/themes';
import Fuse from 'fuse.js';
import { TypeServerSurvivor } from '../../../../../SurvivorTypes';

interface SurvivorCardProps {
    survivorData: TypeServerSurvivor;
}

const SurvivorCard = ({ survivorData }: SurvivorCardProps) => {
    return (
        <Flex>
            <p>placeholder</p>
        </Flex>
    );
};

export default SurvivorCard;
