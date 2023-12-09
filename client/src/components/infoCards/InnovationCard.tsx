// Popup that displays given information for passed in Innovation

import { InnovationKeys } from '../static_data_file_configs/InnovationsConfig';

interface InnovationCardProps {
    innovation: InnovationKeys;
}

const InnovationCard = ({ innovation }: InnovationCardProps) => {
    return (
        <div>
            <p>{String(innovation)}</p>
        </div>
    );
};

export default InnovationCard;
