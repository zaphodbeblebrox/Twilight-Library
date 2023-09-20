import { Button, Select, Flex, Text, Checkbox, RadioGroup, Heading, TextField } from '@radix-ui/themes';

import * as Label from '@radix-ui/react-label';

interface TwilightSelectProps {
    header: string;
    defaultOption: string;
    options: string[];
    onChange: (value: string) => void;
}
const TwilightSelect = ({ header, defaultOption, options, onChange }: TwilightSelectProps) => {
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

interface TwilightCheckboxProps {
    label: string;
    checked: boolean;
    onChange: (value: string, checked: boolean) => void;
}
const TwilightCheckbox = ({ label, checked, onChange }: TwilightCheckboxProps) => {
    return (
        <Flex direction="row" gap="1" justify="start" align="center">
            <Checkbox
                id={label}
                mr="1"
                checked={checked}
                onCheckedChange={(checked: boolean) => onChange(label, checked)}
            />
            <Label.Root htmlFor={label}>{label}</Label.Root>
        </Flex>
    );
};

interface TwilightRadioGroupItemProps {
    value: string;
    options: string[];
    onChange: (value: string) => void;
}
const TwilightRadioGroupItem = ({ value, options, onChange }: TwilightRadioGroupItemProps) => {
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

interface TwilightNodeHeaderProps {
    headerText: string;
}

const TwilightNodeHeader = ({ headerText }: TwilightNodeHeaderProps) => {
    return (
        <>
            {headerText.length === 3 ? (
                <Flex direction="row" align="end" justify="center">
                    <Heading size="5">{headerText[0]}</Heading>
                    <Heading size="3">{headerText[1]}</Heading>
                    <Heading size="2">{headerText[2]}</Heading>
                </Flex>
            ) : (
                <Heading size="5">{headerText}</Heading>
            )}
        </>
    );
};

interface TwilightTextFieldProps {
    labelText: string;
    textString: string;
    onChange: (value: string) => void;
}

const TwilightTextField = ({ labelText, textString, onChange }: TwilightTextFieldProps) => {
    return (
        <Flex direction="row" align="center" justify="center" wrap="wrap" gap="3">
            <Label.Root htmlFor={labelText}>{labelText}</Label.Root>
            <TextField.Root id={labelText}>
                <TextField.Input value={textString} onChange={(e) => onChange(e.target.value)} />
            </TextField.Root>
        </Flex>
    );
};

export { TwilightSelect, TwilightCheckbox, TwilightRadioGroupItem, TwilightNodeHeader, TwilightTextField };
