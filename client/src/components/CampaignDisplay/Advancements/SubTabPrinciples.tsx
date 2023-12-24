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
    // const principleCatagories: (keyof PrinciplesDefaultLists)[] = [
    //     'principle_conviction',
    //     'principle_death',
    //     'principle_new_life',
    //     'principle_society',
    // ];

    const principleCatagories: Record<string, keyof PrinciplesDefaultLists> = {
        Conviction: 'principle_conviction',
        Death: 'principle_death',
        'New Life': 'principle_new_life',
        Society: 'principle_society',
    };

    // const principleCatagories: Record<(keyof PrinciplesDefaultLists), string> = {
    //   'principle_conviction':"Conviction",
    //   'principle_death':"Death",
    //   'principle_new_life':"New Life",
    //   'principle_society':"Society",
    // }

    return (
        <Flex direction="column">
            {Object.entries(principleCatagories).map((category, idx) => {
                const availableOptions = campaignData[category[1]].options;
                const selectedOption = campaignData[category[1]].selected;
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
                                        onChange={(val) => {
                                            console.log(val);
                                        }}
                                    />
                                    <Text>OR</Text>
                                    <PrincipleCard
                                        principleOption={availableOptions[1] as keyof PrincipleKeys}
                                        isSelected={!!selectedOption}
                                        onChange={(val) => {
                                            console.log(val);
                                        }}
                                    />
                                </>
                            ) : (
                                <PrincipleCard
                                    principleOption={selectedOption as keyof PrincipleKeys}
                                    isSelected={availableOptions.length < 2 ? null : !!selectedOption}
                                    onChange={(val) => {
                                        console.log(val);
                                    }}
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
