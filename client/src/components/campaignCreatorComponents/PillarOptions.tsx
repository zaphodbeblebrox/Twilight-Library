import { Flex, Heading } from '@radix-ui/themes';
import ccData from '../../static_data/campaign_creator.json';
import { TwilightCheckbox } from '../primitiveComponents/Primitives';

interface PillarOptionsProps {
    data: {};
    setData: React.Dispatch<React.SetStateAction<{}>>;
}

const PillarOptions = ({ data, setData }: PillarOptionsProps) => {
    const handleCheckedAction = (label: string, checked: boolean) => {
        const temp: Record<string, boolean> = { ...data };
        temp[label] = checked;
        setData(temp);
    };
    return (
        <Flex direction="row" justify="center" align="start" wrap="wrap" gap="5">
            <Flex direction="column" justify="start" align="start">
                <Heading size="5">Assorted</Heading>
                <TwilightCheckbox label="Arc Survivors" value={data} onChange={handleCheckedAction} />
                <TwilightCheckbox label="Characters" value={data} onChange={handleCheckedAction} />
                <TwilightCheckbox label="Scouts" value={data} onChange={handleCheckedAction} />
                <TwilightCheckbox label="Seed Patterns" value={data} onChange={handleCheckedAction} />
            </Flex>

            <Flex direction="column" justify="start" align="start">
                <Heading size="5">Encounters</Heading>
                {ccData.encounters.map((option, idx) => {
                    return <TwilightCheckbox key={idx} label={option} value={data} onChange={handleCheckedAction} />;
                })}
            </Flex>

            <Flex direction="column" justify="start" align="start">
                <Heading size="5">Wanderers</Heading>
                {ccData.wanderers.map((option, idx) => {
                    return <TwilightCheckbox key={idx} label={option} value={data} onChange={handleCheckedAction} />;
                })}
            </Flex>
        </Flex>
    );
};

export default PillarOptions;
