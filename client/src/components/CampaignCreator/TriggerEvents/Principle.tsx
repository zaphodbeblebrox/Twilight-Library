import { Flex, Text } from '@radix-ui/themes';
import { PrinciplesDefaultLists, TypeCampaignData } from '../../static_data_file_configs/PresetCampaignConfig';
import ModifyPrinciple from './ModifyPrinciple';

interface PrincipleProps {
    principleLable: string;
    principlekey: keyof PrinciplesDefaultLists;
    campaignSettings: TypeCampaignData;
    setCampaignSettings: React.Dispatch<React.SetStateAction<TypeCampaignData>>;
}

const Principle = ({ principleLable, principlekey, campaignSettings, setCampaignSettings }: PrincipleProps) => {
    const principleObj = campaignSettings[principlekey];
    return (
        <Flex direction="row" gap="3" align="center">
            <Text>Principle - {principleLable}:</Text>
            {Object.keys(principleObj).map((option, idx) => {
                return (
                    <ModifyPrinciple
                        key={idx}
                        buttonText={principleObj[option as keyof typeof principleObj]}
                        targetKey={option}
                        onSubmit={(selectedOption) => {
                            setCampaignSettings({
                                ...campaignSettings,
                                [principlekey]: {
                                    ...principleObj,
                                    [option as keyof typeof principleObj]: selectedOption,
                                },
                            });
                        }}
                    />
                );
            })}
        </Flex>
    );
};

export default Principle;
