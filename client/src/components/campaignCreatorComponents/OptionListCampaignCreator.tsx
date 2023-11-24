import { Flex } from '@radix-ui/themes';
import { TwilightCheckbox, TwilightNodeHeader } from '../primitiveComponents/Primitives';
import { NodePillarLists, TypeCampaignData } from '../static_data_file_configs/CampaignTypeConfig';
import campaignOptionsData from '../../static_data/campaign_creator.json';

interface OptionListCampaignCreatorProps {
    header: string;
    optionKey: keyof NodePillarLists;
    data: TypeCampaignData;
    setData: React.Dispatch<React.SetStateAction<TypeCampaignData>>;
}

function OptionListCampaignCreator({ header, optionKey, data, setData }: OptionListCampaignCreatorProps) {
    const handlCheckedAction = (label: string, checked: boolean) => {
        const updatedData: TypeCampaignData = { ...data };

        if (checked && !updatedData[optionKey].includes(label)) {
            updatedData[optionKey] = [...updatedData[optionKey], label];
        } else if (!checked && updatedData[optionKey].includes(label)) {
            updatedData[optionKey] = updatedData[optionKey].filter((item) => item !== label);
        }
        // console.log(updatedData);
        setData(updatedData);
    };
    return (
        <Flex direction="column" gap="1">
            <TwilightNodeHeader headerText={header} />
            {campaignOptionsData[optionKey].map((option, idx) => {
                return (
                    <TwilightCheckbox
                        key={idx}
                        label={option}
                        checked={data[optionKey].includes(option) ? true : false}
                        onChange={handlCheckedAction}
                    />
                );
            })}
        </Flex>
    );
}

export default OptionListCampaignCreator;
