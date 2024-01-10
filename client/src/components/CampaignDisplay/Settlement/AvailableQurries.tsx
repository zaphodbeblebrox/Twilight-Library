import { TypeServerSettlement } from '../../../../../SettlementTypes';

interface AvailableQuarriesDisplayProps {
    campaignData: TypeServerSettlement;
    onChange: (updatedLocations: string[]) => void;
}

const AvailableQuarriesDisplay = ({ campaignData, onChange }: AvailableQuarriesDisplayProps) => {
    // TODO: may or may not include later
};

export default AvailableQuarriesDisplay;
