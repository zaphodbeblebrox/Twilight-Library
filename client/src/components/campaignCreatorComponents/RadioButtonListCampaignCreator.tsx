import { Flex, Heading } from '@radix-ui/themes';
import { TwilightNodeHeader, TwilightRadioGroupItem } from '../primitiveComponents/Primitives';
import { NodeCoreFinaleLists, TypeCampaignData } from './CampaignTypeConfig';
import campaignOptionsData from '../../static_data/campaign_creator.json';

interface RadioButtonListCampaignCreatorProps {
    header: string;
    optionKey: keyof NodeCoreFinaleLists;
    data: TypeCampaignData;
    setData: React.Dispatch<React.SetStateAction<TypeCampaignData>>;
}

const RadioButtonListCampaignCreator = ({ header, optionKey, data, setData }: RadioButtonListCampaignCreatorProps) => {
    const handleUpdateData = (value: string) => {
        const updatedData: TypeCampaignData = { ...data };
        if (value !== 'None') {
            updatedData[optionKey] = value;
        } else {
            updatedData[optionKey] = null;
        }
        setData(updatedData);
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
