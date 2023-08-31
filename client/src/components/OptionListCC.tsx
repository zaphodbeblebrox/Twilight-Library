import { Checkbox, Flex, Heading } from '@radix-ui/themes';
import PropTypes from 'prop-types';

function OptionListCC({ header, options }) {
    // console.log(options);
    return (
        <Flex direction="column" gap="1">
            <Heading as="h3">{header}</Heading>
            {options.map((opt, idx) => (
                <Flex key={idx}>
                    <Checkbox id={opt} />
                    <label htmlFor={opt}>{opt}</label>
                </Flex>
            ))}
        </Flex>
    );
}

OptionListCC.propTypes = {
    header: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    // selection: PropTypes.string.isRequired,
    // setSelection: PropTypes.func.isRequired,
};

export default OptionListCC;
