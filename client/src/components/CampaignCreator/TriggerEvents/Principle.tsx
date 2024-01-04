import { Flex, Separator, Text } from '@radix-ui/themes';
import { PrinciplesDefaultLists, TypeCampaignData } from '../../static_data_file_configs/PresetCampaignConfig';
import ModifyPrincipleDialog from './ModifyPrincipleDialog';

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
                    <Flex key={idx} direction="row" gap="3" align="center">
                        <ModifyPrincipleDialog
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
                        {idx !== Object.keys(principleObj).length - 1 && (
                            <Separator orientation="vertical" color="purple" />
                        )}
                    </Flex>
                );
            })}
        </Flex>
    );
};

export default Principle;
