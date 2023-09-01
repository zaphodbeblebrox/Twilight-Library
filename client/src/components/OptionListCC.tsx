import { Checkbox, Flex, Heading } from '@radix-ui/themes';
import { TLCheckbox } from './primitive_components/primitives';

interface OptionListCCProps {
    header: string;
    options: string[];
    data: Record<string, boolean>;
    setData: React.Dispatch<React.SetStateAction<{}>>;
}

function OptionListCC({ header, options, data, setData }: OptionListCCProps) {
    // console.log(options);
    return (
        <Flex direction="column" gap="1">
            {header.length === 3 ? (
                <Flex direction="row" align="end" justify="center">
                    <Heading size="5">{header[0]}</Heading>
                    <Heading size="3">{header[1]}</Heading>
                    <Heading size="2">{header[2]}</Heading>
                </Flex>
            ):(
                <Heading size="5">{header}</Heading>
            )}
            {options.map((option, idx)=> {
                return(
                    <TLCheckbox key={idx} label={option} value={data} setValue={setData}/>
                );
            })}
        </Flex>
    );
}

export default OptionListCC;
