import { Button, Select, Flex, Text, Checkbox } from '@radix-ui/themes';

import * as Label from '@radix-ui/react-label';

interface TLSelectProps {
    header: string;
    options: string[];
    value: string;
    // setValue: React.Dispatch<React.SetStateAction<string>>;
    onChange:Function;
}
const TLSelect = ({ header, options, value, onChange }: TLSelectProps) => {
    return (
        <Flex direction="row" gap="1">
            <Label.Root htmlFor={header}>{header}</Label.Root>
            <Select.Root
                name={header}
                defaultValue={value}
                onValueChange={(value) => onChange(value)}
            >
                <Select.Trigger />
                <Select.Content >
                    {options.map((option, idx) => (
                        <Select.Item value={option} key={idx}>
                            {option}
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>
        </Flex>
    );
};

interface TLCheckboxProps {
    label: string;
    value: Record<string, boolean>;
    setValue: React.Dispatch<React.SetStateAction<{}>>;
}
const TLCheckbox = ({ label, value, setValue }: TLCheckboxProps) => {
    const checkHandler = (checked:boolean) => {
        const temp:Record<string, boolean> = {...value};
        temp[label]=checked;
        setValue(temp);
    }
    return (
        <Flex direction="row" gap="1">
            <Checkbox id={label} mr="1" checked={value[label]} onCheckedChange={(checked:boolean)=>checkHandler(checked)}/>
            <Label.Root htmlFor={label}>{label}</Label.Root>
            {/* <Text size="2">
                <label>
                <Checkbox mr="1" checked={value[label]} onCheckedChange={(checked:boolean)=>checkHandler(checked)}/> {label}
                </label>
                <Label.Root htmlFor={label}>{label}</Label.Root>
            </Text> */}
        </Flex>
    );
};

export { TLSelect,TLCheckbox };
