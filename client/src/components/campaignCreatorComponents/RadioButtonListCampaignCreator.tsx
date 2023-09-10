import { Flex, Heading } from '@radix-ui/themes';
import { TwilightNodeHeader, TwilightRadioGroupItem } from '../primitiveComponents/Primitives';

interface RadioButtonListCampaignCreatorProps {
    header: string;
    options: string[];
    data: Record<string, boolean>;
    setData: React.Dispatch<React.SetStateAction<{}>>;
}

const RadioButtonListCampaignCreator = ({ header, options, data, setData }: RadioButtonListCampaignCreatorProps) => {
    const handleUpdateData = (value: string) => {
        console.log(value);
        const temp: Record<string, boolean> = { ...data };
        options.forEach((key) => (temp[key] = false));
        temp[value] = true;
        setData(temp);
    };

    let value: string = options.find((option: string) => data[option]) ?? options[0];

    return (
        <div>
            <Flex direction="column" gap="1">
                <TwilightNodeHeader headerText={header} />
                <TwilightRadioGroupItem value={value} options={options} onChange={handleUpdateData} />
            </Flex>
        </div>
    );
};
export default RadioButtonListCampaignCreator;
