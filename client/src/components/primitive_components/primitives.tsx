import { Button, Select } from '@radix-ui/themes';

// import { Select } from '@radix-ui/react-select';
import * as Label from '@radix-ui/react-label';

interface TLSelectProps {
    header: string;
    options: string[];
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}
const TLSelect = ({ header, options, value, setValue }: TLSelectProps) => {
    return (
        <div>
            <Label.Root htmlFor={header}>{header}</Label.Root>
            <Select.Root
                name={header}
                defaultValue={value}
                onValueChange={(value) => setValue(value)}
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
        </div>
    );
};

export { TLSelect };
