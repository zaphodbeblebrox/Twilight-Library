import { Button, Select } from '@radix-ui/themes';

// import { Select } from '@radix-ui/react-select';
import PropTypes from 'prop-types';
import * as Label from '@radix-ui/react-label';

const TLSelect = ({ header, options, value, setValue }) => {
    return (
        <div>
            <Label.Root htmlFor={header}>{header}</Label.Root>
            <Select.Root
                id={header}
                defaultValue={value}
                onValueChange={(value) => setValue(value)}
            >
                <Select.Trigger />
                <Select.Content value={value}>
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

TLSelect.propTypes = {
    header: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
};

export { TLSelect };
