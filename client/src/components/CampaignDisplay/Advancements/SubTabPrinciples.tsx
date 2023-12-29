import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../../SettlementTypes';
import { Flex, Text } from '@radix-ui/themes';
import { PrinciplesDefaultLists } from '../../static_data_file_configs/PresetCampaignConfig';
import PrincipleCard from './PrincipleCard';
import { PrincipleKeys } from '../../static_data_file_configs/PrincipleConfig';

interface SubTabPrinciplesProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<null, null>;
    dbExecutePatch: RefetchFunction<Partial<TypeServerSettlement>, null>;
}

const SubTabPrinciples = ({ campaignData, dbRefetch, dbExecutePatch }: SubTabPrinciplesProps) => {
    const principleCatagories: Record<string, keyof PrinciplesDefaultLists> = {
        Conviction: 'principle_conviction',
        Death: 'principle_death',
        'New Life': 'principle_new_life',
        Society: 'principle_society',
    };

    return (
        <Flex direction="column">
            {Object.entries(principleCatagories).map((category, idx) => {
                const availableOptions = campaignData[category[1]].options;
                const selectedOption = campaignData[category[1]].selected;

                const SelectionHandler = (choice: string) => {
                    const updatedPrinciple =
                        selectedOption === null
                            ? { ...campaignData[category[1]], selected: choice }
                            : { ...campaignData[category[1]], selected: null };
                    console.log(updatedPrinciple);
                    dbExecutePatch({
                        data: { [category[1]]: { ...updatedPrinciple } },
                    })
                        .then(() => dbRefetch())
                        .catch((err) => console.error(err));
                };

                if ((selectedOption === null && availableOptions === null) || availableOptions === null) {
                    return <></>;
                } else {
                    return (
                        <Flex key={idx} direction="row" gap="3" align="center">
                            <Text>Principle - {category[0]}:</Text>
                            {selectedOption === null ? (
                                <>
                                    <PrincipleCard
                                        principleOption={availableOptions[0] as keyof PrincipleKeys}
                                        isSelected={!!selectedOption}
                                        onChange={SelectionHandler}
                                    />
                                    <Text>OR</Text>
                                    <PrincipleCard
                                        principleOption={availableOptions[1] as keyof PrincipleKeys}
                                        isSelected={!!selectedOption}
                                        onChange={SelectionHandler}
                                    />
                                </>
                            ) : (
                                <PrincipleCard
                                    principleOption={selectedOption as keyof PrincipleKeys}
                                    isSelected={availableOptions.length < 2 ? null : !!selectedOption}
                                    onChange={SelectionHandler}
                                />
                            )}
                        </Flex>
                    );
                }
            })}
        </Flex>
    );
};

export default SubTabPrinciples;
