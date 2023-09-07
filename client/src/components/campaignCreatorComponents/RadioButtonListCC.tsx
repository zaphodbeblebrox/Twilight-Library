import { Checkbox, Flex, Heading } from '@radix-ui/themes';
import { TLCheckbox, TLRadioGroupItem } from '../primitiveComponents/Primitives';

interface OptionListCCProps {
    header: string;
    options: string[];
    data: Record<string, boolean>;
    setData: React.Dispatch<React.SetStateAction<{}>>;
}

const RadioButtonListCC = ({ header, options, data, setData }: OptionListCCProps) => {
    const updateDataHandler = (value: string) => {
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
                {header.length === 3 ? (
                    <Flex direction="row" align="end" justify="center">
                        <Heading size="5">{header[0]}</Heading>
                        <Heading size="3">{header[1]}</Heading>
                        <Heading size="2">{header[2]}</Heading>
                    </Flex>
                ) : (
                    <Heading size="5">{header}</Heading>
                )}
                <TLRadioGroupItem value={value} options={options} onChange={updateDataHandler} />
            </Flex>
        </div>
    );
};
export default RadioButtonListCC;
