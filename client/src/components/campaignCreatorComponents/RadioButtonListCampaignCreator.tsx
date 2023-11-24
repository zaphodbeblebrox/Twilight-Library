import { Flex, Heading } from '@radix-ui/themes';
import { TwilightNodeHeader, TwilightRadioGroupItem } from '../primitiveComponents/Primitives';
import { NodeCoreFinaleLists, TypeCampaignData } from '../static_data_file_configs/CampaignTypeConfig';
import campaignOptionsData from '../../static_data/campaign_creator.json';

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
    const radioOptions = [...campaignOptionsData[optionKey]];

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
