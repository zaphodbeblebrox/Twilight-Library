import { Flex, Heading, Text } from '@radix-ui/themes';
import { TypeServerSettlement } from '../../../../../SettlementTypes';
import AddLocationDialog from './AddLocationDialog';
import { TypeLocationsData, locationsData } from '../../static_data_file_configs/LocationsConfig';

interface LocationDisplayProps {
    campaignData: TypeServerSettlement;
    onChange: (updatedData: { locations: string[]; gear: Record<string, Record<string, number>> }) => void;
}

const LocationDisplay = ({ campaignData, onChange }: LocationDisplayProps) => {
    return (
        <Flex direction={'column'} align={'center'} gap={'3'}>
            <Flex gap={'2'}>
                <Heading>Locations</Heading>
                {/* <AddLocationDialog onSubmit={(newLocation) => onChange([...campaignData.locations, newLocation])} /> */}
                <AddLocationDialog
                    onSubmit={(newLocation) => {
                        const createGearGroup = (categoryKey: keyof TypeLocationsData) => {
                            return locationsData[categoryKey].gear.reduce((currentLocationObject, gear) => {
                                if (campaignData.gear[newLocation] && campaignData.gear[newLocation][gear]) {
                                    return currentLocationObject;
                                }
                                return {
                                    ...currentLocationObject,
                                    [gear]: 0,
                                };
                            }, {});
                        };
                        onChange({
                            locations: [...campaignData.locations, newLocation],
                            gear: {
                                ...campaignData.gear,
                                [newLocation]: {
                                    ...(campaignData.gear[newLocation] ?? []),
                                    ...createGearGroup(newLocation as keyof TypeLocationsData),
                                },
                            },
                        });
                    }}
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
