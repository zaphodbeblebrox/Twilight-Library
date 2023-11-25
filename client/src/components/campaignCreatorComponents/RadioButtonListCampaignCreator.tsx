import { Flex, Heading } from '@radix-ui/themes';
import { TwilightNodeHeader, TwilightRadioGroupItem } from '../primitiveComponents/Primitives';
import { campaignCreatorData } from '../static_data_file_configs/CampaignCreatorConfig';
import { NodeCoreFinaleLists, TypeCampaignData } from '../static_data_file_configs/presetCampaignConfig';

interface RadioButtonListCampaignCreatorProps {
    header: string;
    optionKey: keyof NodeCoreFinaleLists;
    data: TypeCampaignData;
    setData: React.Dispatch<React.SetStateAction<TypeCampaignData>>;
}

const RadioButtonListCampaignCreator = ({ header, optionKey, data, setData }: RadioButtonListCampaignCreatorProps) => {
    const handleUpdateData = (value: string) => {
        setData({ ...data, [optionKey]: value === 'None' ? null : value });
    };
    const radioOptions = [...campaignCreatorData[optionKey]];

    return (
        <div>
            <Flex direction="column" gap="1">
                <TwilightNodeHeader headerText={header} />
                <TwilightRadioGroupItem
                    value={data[optionKey] ?? 'None'}
                    options={radioOptions}
                    onChange={handleUpdateData}
                />
            </Flex>
        </div>
    );
};
export default RadioButtonListCampaignCreator;
