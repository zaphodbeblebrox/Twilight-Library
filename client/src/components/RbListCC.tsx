import { Checkbox, Flex, Heading } from '@radix-ui/themes';
import {
    TLCheckbox,
    TLRadioGroupItem,
} from './primitive_components/primitives';

interface OptionListCCProps {
    header: string;
    options: string[];
    data: Record<string, boolean>;
    setData: React.Dispatch<React.SetStateAction<{}>>;
}

const RbListCC = ({ header, options, data, setData }: OptionListCCProps) => {
    const updateDataHandler = (value: string) => {
        console.log(value);
        const temp: Record<string, boolean> = { ...data };
        options.map((key) => (temp[key] = false));
        temp[value] = true;
        setData(temp);
    };
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
                <TLRadioGroupItem
                    options={options}
                    onChange={updateDataHandler}
                />
            </Flex>
        </div>
    );
};
export default RbListCC;
