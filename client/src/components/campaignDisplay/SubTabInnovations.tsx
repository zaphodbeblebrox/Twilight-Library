import { Flex } from '@radix-ui/themes';
import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../SettlementTypes';
import { TwilightEditCountDialog } from '../primitiveComponents/AlertBoxes';
import { TwilightNodeHeader } from '../primitiveComponents/Primitives';

interface SubTabInnovationsProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<any, any>;
    dbExecutePatch: RefetchFunction<any, any>;
}

const SubTabInnovations = ({ campaignData, dbRefetch, dbExecutePatch }: SubTabInnovationsProps) => {};

export default SubTabInnovations;
