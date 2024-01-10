import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../../SettlementTypes';
import { Flex, Heading, Text } from '@radix-ui/themes';
import {
    GetInsanityDepartureBonus,
    GetSurvivalDepartureBonus,
    GetSurvivalLimit,
} from '../../Helper/ModifierCalculator';
import LocationDisplay from './LocationDisplay';

interface TabSettlementProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<null, null>;
    dbExecutePatch: RefetchFunction<Partial<TypeServerSettlement>, null>;
}

const TabSettlement = ({ campaignData, dbRefetch, dbExecutePatch }: TabSettlementProps) => {
    /* 
  Settlement Name
  Population Count | Death Count
  Survival Limit | Survival on Departure | Insanity on Departure
  Locations
  Huntable Quarries
*/
    // TODO: Population + Death Counts => Implement Survivor data, then enable count here.
    return (
        <Flex direction={'column'}>
            <Heading>{campaignData.name}</Heading>
            <Flex direction={'row'} justify={'between'} align={'start'}>
                <Flex direction={'column'} gap={'2'} align={'start'}>
                    <Text>Survival Limit: {GetSurvivalLimit(campaignData)}</Text>
                    <Text>Population Count: {0}</Text>
                    <Text>Death Count: {0}</Text>
                </Flex>
                <Flex direction={'column'} gap={'2'} align={'end'}>
                    <Text>Departure Bonuses</Text>
                    <Text>Survival: +{GetSurvivalDepartureBonus(campaignData)}</Text>
                    <Text>Insanity: +{GetInsanityDepartureBonus(campaignData)}</Text>
                </Flex>
            </Flex>
            <LocationDisplay
                campaignData={campaignData}
                onChange={(updatedData) => {
                    dbExecutePatch({
                        data: {
                            locations: [...updatedData.locations],
                            gear: { ...updatedData.gear },
                        },
                    })
                        .then(() => dbRefetch())
                        .catch((err) => console.error(err));
                }}
            />
        </Flex>
    );
};

export default TabSettlement;
