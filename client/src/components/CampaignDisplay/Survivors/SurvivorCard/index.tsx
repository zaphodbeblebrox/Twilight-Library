import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../../../SettlementTypes';
import { Box, Flex, Heading, IconButton, Tabs, Text, Tooltip } from '@radix-ui/themes';
import Fuse from 'fuse.js';
import { TypeServerSurvivor } from '../../../../../../SurvivorTypes';
import { useState } from 'react';
import {
    ArrowDownIcon,
    ArrowTopRightIcon,
    Cross1Icon,
    CubeIcon,
    EyeNoneIcon,
    EyeOpenIcon,
    MinusIcon,
    PlusIcon,
} from '@radix-ui/react-icons';

interface SurvivorCardProps {
    survivorData: TypeServerSurvivor;
    onChange: (updatedSurvivor: TypeServerSurvivor) => void;
}

const SurvivorCard = ({ survivorData, onChange }: SurvivorCardProps) => {
    const [isCondensed, setIsCondensed] = useState(true);
    return (
        <Flex className="flex-1">
            <Flex className="nameline" direction={'row'} justify={'between'} align={'center'} gap={'3'}>
                <Tooltip content={survivorData.is_male ? 'Male' : 'Female'}>
                    <IconButton radius="full" color="bronze">
                        {survivorData.is_male ? <ArrowTopRightIcon /> : <ArrowDownIcon />}
                    </IconButton>
                </Tooltip>
                <Flex direction={'row'} gap={'2'} className="flex-1">
                    <p>{survivorData.first_name}</p>
                    <p>{survivorData.nickname}</p>
                    <p>{survivorData.last_name}</p>
                </Flex>
                <Tooltip content={survivorData.skip_next_hunt ? 'Cannot Depart' : 'Can Depart'}>
                    <IconButton
                        radius="full"
                        color="yellow"
                        onClick={() => onChange({ ...survivorData, skip_next_hunt: !survivorData.skip_next_hunt })}
                    >
                        {survivorData.skip_next_hunt ? <EyeNoneIcon /> : <EyeOpenIcon />}
                    </IconButton>
                </Tooltip>
                <Tooltip content={survivorData.has_lifetime_reroll ? 'Has Reroll' : 'No Reroll'}>
                    <IconButton
                        radius="full"
                        color="blue"
                        onClick={() =>
                            onChange({ ...survivorData, has_lifetime_reroll: !survivorData.has_lifetime_reroll })
                        }
                    >
                        {survivorData.has_lifetime_reroll ? <CubeIcon /> : <Cross1Icon />}
                    </IconButton>
                </Tooltip>
                <Tooltip content={isCondensed ? 'Expand' : 'Collapse'}>
                    <IconButton radius="small" color="gray" onClick={() => setIsCondensed(!isCondensed)}>
                        {isCondensed ? <PlusIcon /> : <MinusIcon />}
                    </IconButton>
                </Tooltip>
            </Flex>
        </Flex>
    );
};

export default SurvivorCard;
