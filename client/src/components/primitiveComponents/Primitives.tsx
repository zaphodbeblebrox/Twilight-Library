import { Button, Select, Flex, Text, Checkbox, RadioGroup } from '@radix-ui/themes';

import * as Label from '@radix-ui/react-label';

interface TLSelectProps {
    header: string;
    defaultOption: string;
    options: string[];
    onChange: Function;
}
const TLSelect = ({ header, defaultOption, options, onChange }: TLSelectProps) => {
    return (
        <Flex direction="row" gap="1" justify="start" align="center">
            <Label.Root htmlFor={header}>{header}</Label.Root>
            <Select.Root name={header} defaultValue={defaultOption} onValueChange={(value) => onChange(value)}>
                <Select.Trigger />
                <Select.Content>
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
    onChange: Function;
}
const TLCheckbox = ({ label, value, onChange }: TLCheckboxProps) => {
    return (
        <Flex direction="row" gap="1" justify="start" align="center">
            <Checkbox
                id={label}
                mr="1"
                checked={value[label]}
                onCheckedChange={(checked: boolean) => onChange(label, checked)}
            />
            <Label.Root htmlFor={label}>{label}</Label.Root>
        </Flex>
    );
};

interface TLRadioGroupItemProps {
    value: string;
    options: string[];
    onChange: Function;
}
const TLRadioGroupItem = ({ value, options, onChange }: TLRadioGroupItemProps) => {
    return (
        <Flex direction="row" gap="1" justify="start" align="center">
            <RadioGroup.Root value={value} onValueChange={(value: string) => onChange(value)}>
                {options.map((option, idx) => {
                    return (
                        <Flex key={idx} direction="row" gap="1" justify="start" align="center">
                            <RadioGroup.Item id={option} value={option} />
                            <Label.Root htmlFor={option}>{option}</Label.Root>
                        </Flex>
                    );
                })}
            </RadioGroup.Root>
        </Flex>
    );
};

export { TLSelect, TLCheckbox, TLRadioGroupItem };
