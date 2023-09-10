import { Checkbox, Flex, Heading } from '@radix-ui/themes';
import { TwilightCheckbox, TwilightNodeHeader } from '../primitiveComponents/Primitives';

interface OptionListCampaignCreatorProps {
    header: string;
    options: string[];
    data: Record<string, boolean>;
    setData: React.Dispatch<React.SetStateAction<{}>>;
}

function OptionListCampaignCreator({ header, options, data, setData }: OptionListCampaignCreatorProps) {
    const handlCheckedAction = (label: string, checked: boolean) => {
        const temp: Record<string, boolean> = { ...data };
        temp[label] = checked;
        setData(temp);
    };

    return (
        <Flex direction="column" gap="1">
            <TwilightNodeHeader headerText={header} />
            {options.map((option, idx) => {
                return <TwilightCheckbox key={idx} label={option} value={data} onChange={handlCheckedAction} />;
            })}
        </Flex>
    );
}

export default OptionListCampaignCreator;
