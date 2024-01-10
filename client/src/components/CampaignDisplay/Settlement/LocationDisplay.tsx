import { Flex, Heading, Text } from '@radix-ui/themes';
import { TypeServerSettlement } from '../../../../../SettlementTypes';
import AddLocationDialog from './AddLocationDialog';

interface LocationDisplayProps {
    campaignData: TypeServerSettlement;
    onChange: (updatedLocations: string[]) => void;
}

const LocationDisplay = ({ campaignData, onChange }: LocationDisplayProps) => {
    return (
        <Flex direction={'column'} align={'center'} gap={'3'}>
            <Flex gap={'2'}>
                <Heading>Locations</Heading>
                <AddLocationDialog
                    buttonText="+"
                    onSubmit={(newLocation) => onChange([...campaignData.locations, newLocation])}
                />
            </Flex>
            <Flex direction={'column'} gap={'2'} align={'start'}>
                {campaignData.locations.map((location, idx) => (
                    <Text key={idx}>{location}</Text>
                ))}
            </Flex>
        </Flex>
    );
};

export default LocationDisplay;
