import { Checkbox, Flex, Heading } from '@radix-ui/themes';
import ccData from '../../static_data/campaign_creator.json';
import { TLCheckbox } from '../primitiveComponents/Primitives';

interface PillarOptionsProps {
    data: {};
    setData: React.Dispatch<React.SetStateAction<{}>>;
}

const PillarOptions = ({ data, setData }: PillarOptionsProps) => {
    const checkedActionHandler = (label: string, checked: boolean) => {
        const temp: Record<string, boolean> = { ...data };
        temp[label] = checked;
        setData(temp);
    };
    return (
        <Flex direction="row" justify="center" align="start" wrap="wrap" gap="5">
            <Flex direction="column" justify="start" align="start">
                <Heading size="5">Assorted</Heading>
                <TLCheckbox label="Arc Survivors" value={data} onChange={checkedActionHandler} />
                <TLCheckbox label="Characters" value={data} onChange={checkedActionHandler} />
                <TLCheckbox label="Scouts" value={data} onChange={checkedActionHandler} />
                <TLCheckbox label="Seed Patterns" value={data} onChange={checkedActionHandler} />
            </Flex>

            <Flex direction="column" justify="start" align="start">
                <Heading size="5">Encounters</Heading>
                {ccData.encounters.map((option, idx) => {
                    return <TLCheckbox key={idx} label={option} value={data} onChange={checkedActionHandler} />;
                })}
            </Flex>

            <Flex direction="column" justify="start" align="start">
                <Heading size="5">Wanderers</Heading>
                {ccData.wanderers.map((option, idx) => {
                    return <TLCheckbox key={idx} label={option} value={data} onChange={checkedActionHandler} />;
                })}
            </Flex>
        </Flex>
    );
};

export default PillarOptions;
